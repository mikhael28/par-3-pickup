/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import { useRouter } from 'next/router';
import Web3Utils from 'web3-utils';

export default function Stake(props) {
	const [ records, setRecords ] = useState([]);
	const [ usd, setUsd ] = useState(1);
	const router = useRouter();

	useEffect(() => {
		let recs = localStorage.getItem('activeRecord');
		console.log('Recs fetch: ', JSON.parse(recs));
		if (recs !== null) {
			setRecords([ JSON.parse(recs) ]);
			calculateWinnings([ JSON.parse(recs) ]);
			conversion();
			fetchGame(JSON.parse(recs).PK, JSON.parse(recs).SK);
		} else {
			let path = window.location.pathname.split('/');
			let newPath = path[3].split('_');

			fetchGame(newPath[0], newPath[1]);
		}
	}, []);

	async function fetchGame(PK, SK) {
		try {
			let game = await API.get('matches', `/sp3/object/${PK}/${SK}`);
			setRecords([ game ]);
			calculateWinnings([ game ]);
			conversion();
		} catch (e) {
			console.log('Error: ', e);
		}
	}

	async function conversion() {
		await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH')
			.then((res) => res.json())
			.then((data) => {
				setUsd(data.USD);
			});
	}

	function calculateWinnings(recs) {
		let paper = [];
		let newPlayers = [];

		try {
			for (let index = 0; index < 9; index++) {
				let player1 = recs[0].players[0].holes[index].score;
				let player2 = recs[0].players[1].holes[index].score;
				if (player1 > player2) {
					paper.push({
						winner: 1,
						amount: 5
					});
				} else if (player2 > player1) {
					paper.push({
						winner: 0,
						amount: 5
					});
				} else if (player1 === player2) {
					paper.push({
						winner: null,
						amount: 0
					});
				}
			}

			for (let finalIndex = 0; finalIndex < recs[0].players.length; finalIndex++) {
				let currentValue = 0;

				paper.forEach((item) => {
					if (item.winner === finalIndex) {
						currentValue = currentValue + item.amount;
					} else if (item.winner !== finalIndex && item.winner !== null) {
						currentValue = currentValue - item.amount;
					}
				});

				let tempPlayer = {
					...recs[0].players[finalIndex],
					winnings: currentValue
				};
				newPlayers.push(tempPlayer);
			}

			let tempRecords = {
				...recs[0],
				players: newPlayers
			};

			setRecords([ tempRecords ]);
		} catch (e) {
			console.log('A wild error has appeared: ', e);
		}
	}

	useEffect(() => {
		//Have to check the ethereum binding on the window object to see if it's installed
		if (Boolean(window.ethereum && window.ethereum.isMetaMask) === true) {
			openWallet();
		} else if (window.ethereum === true && window.ethereum.isMetaMask === false) {
			registerWallet();
		} else {
			console.log('No MetaMask Connection Detected!');
		}
	}, []);

	async function registerWallet() {
		// this will allow us to connect to MetaMask
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	async function openWallet() {
		// opens the wallet, to simply get our transaction history, check our Eth balance.
		await window.ethereum.request({ method: 'eth_accounts' });
	}

	async function payWinner(winnerAddress, winnings) {
		let stringValue = winnings.toFixed(14).toString();

		// this only happens if you are the loser, and are paying the winner
		const transactionParameters = {
			nonce: '0x00', // ignored by MetaMask
			// gasPrice: '0x001184e72a000', // customizable by user during MetaMask confirmation.
			// gas: '0x2710', // customizable by user during MetaMask confirmation.
			to: winnerAddress, // Required except during contract publications.
			// the from value is sad - it means that in order to send money, I must be logged in on my device.
			from: window.ethereum.selectedAddress, // must match user's active address.
			// may need to define this with BN.js ?
			// value: finalWinnings,
			value: `0x00${parseInt(Web3Utils.toWei(stringValue, 'ether')).toString(16)}`
			// Only required to send ether to the recipient from the initiating external account.
			// data:
			// 	'0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
			// Optional, but used for defining smart contract creation and interaction.
			// chainId: '0x3',
			// Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
		};

		// txHash is a hex string
		// As with any RPC call, it may throw an error
		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [ transactionParameters ]
		});

		console.log(txHash);
	}

	// the lobby itself may or may not contain the game details? That would be contained in each individuals record, and the game would just pull the records from the individual records?
	// pk - date
	// sk - gameId
	// lsi (second sort key): hostID

	// this is for each user record record
	// user pk - username
	// sk: gameId
	// lsi sk: course - to pull all courses through filter expression

	// I will need to treat the game record as a separate thing, and the lobby is it's own record - but it can store the record, at the end of the day.

	return (
		<div className="stakes-root" style={{ paddingTop: 80 }}>
			{records.map((rec, i) => {
				return (
					<div style={{ paddingLeft: 20 }} key={i}>
						<h1>Score Card</h1>
						<h2>Course: {rec.course}</h2>
						{rec.players.map((player, idx) => {
							return (
								<div key={idx}>
									<h2>{player.fName}</h2>
									<div style={{ display: 'flex' }}>
										<table style={{ flexWrap: 'wrap' }}>
											<tr style={{ width: '100%' }}>
												<td>Hole 1</td>
												<td>Hole 2</td>
												<td>Hole 3</td>
												<td>Hole 4</td>
												<td>Hole 5</td>
												<td>Hole 6</td>
												<td>Hole 7</td>
												<td>Hole 8</td>
												<td>Hole 9</td>
											</tr>
											<tr>
												{player.holes.map((hole, i) => {
													return (
														<td key={i} style={{}}>
															<b>{hole.score}</b>
														</td>
													);
												})}
											</tr>
										</table>
									</div>
								</div>
							);
						})}
						{rec.players.length > 1 ? (
							<React.Fragment>
								<h2>Winnings</h2>
								{rec.players.map((player, i) => {
									return (
										<h3 key={i}>
											{player.fName}'s Winnings: ${player.winnings} or {player.winnings / usd} ETH
										</h3>
									);
								})}
							</React.Fragment>
						) : null}
						{rec.players.map((player, index) => {
							if (player.winnings > 0) {
								return (
									<div style={{ display: 'flex' }}>
										<button
											className="pay-button"
											key={index}
											onClick={() => {
												payWinner(player.eth, player.winnings / usd);
											}}
										>
											<img
												src={
													'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/440px-Ethereum-icon-purple.svg.png'
												}
												height="30"
												width="30"
											/>{' '}
											<p style={{ marginBottom: 7, color: 'black', fontSize: 20 }}>
												Pay {player.fName}
											</p>
										</button>
										<button
											className="pay-button"
											key={index}
											style={{ marginLeft: 10, marginRight: 12 }}
											onClick={() => {
												localStorage.clear();
												router.push('/');
											}}
										>
											<img
												src={
													'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/440px-Ethereum-icon-purple.svg.png'
												}
												height="30"
												width="30"
											/>{' '}
											<p style={{ marginBottom: 7, color: 'black', fontSize: 20 }}>Clear Data</p>
										</button>
									</div>
								);
							}
						})}
					</div>
				);
			})}
		</div>
	);
}

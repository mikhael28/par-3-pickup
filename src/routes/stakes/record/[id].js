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
// import MetaMaskOnboarding from '@metamask/onboarding';

export default function Stake(props) {
	const [ records, setRecords ] = useState([]);
	const [ usd, setUsd ] = useState(1);
	const router = useRouter();

	useEffect(() => {
		let path = window.location.pathname.split('/');
		let newPath = path[3].split('_');

		fetchGame(newPath[0], newPath[1]);
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
		// Have to check the ethereum binding on the window object to see if it's installed
		if (Boolean(window.ethereum && window.ethereum.isMetaMask) === true) {
			registerWallet();
			openWallet();
		} else if (Boolean(window.ethereum && window.ethereum.isMetaMask) === false) {
			if (window.ethereum !== undefined) {
				registerWallet();
			}
		} else {
			console.log('No MetaMask Connection Detected!');
		}
	}, []);

	async function registerWallet() {
		// this will allow us to connect to MetaMask
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		// const onboarding = new MetaMaskOnboarding();
		// onboarding.startOnboarding();

		// function handleNewAccounts(newAccounts) {
		// 	setAccounts(newAccounts);
		// }

		// if (MetaMaskOnboarding.isMetaMaskInstalled()) {
		// 	window.ethereum.request({ method: 'eth_requestAccounts' }).then(handleNewAccounts);
		// 	window.ethereum.on('accountsChanged', handleNewAccounts);
		// 	return () => {
		// 		window.ethereum.off('accountsChanged', handleNewAccounts);
		// 	};
		// }
	}

	async function openWallet() {
		// opens the wallet, to simply get our transaction history, check our Eth balance.
		await window.ethereum.request({ method: 'eth_accounts' });
	}

	async function payWinner(winnerAddress, winnings) {
		if (window.ethereum === true && window.ethereum.isMetaMask === false) {
			registerWallet();
		} else {
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

			// @TODO: in the future, display details of transaction to user/update the game's record files to allow someone to view details on ether-scan
			console.log(txHash);
		}
	}

	return (
		<div className="stakes-root" style={{ paddingTop: 80 }}>
			{records.map((rec, i) => {
				return (
					<div style={{ paddingLeft: 20 }} key={i}>
						<h1>{rec.course} Score Card</h1>
						{rec.players.map((player, idx) => {
							let total = player.holes.reduce(
								(accumulator, hole) => accumulator + parseInt(hole.score, 10),
								0
							);
							return (
								<div key={idx}>
									<h2>{player.fName}</h2>
									<div style={{ display: 'flex' }}>
										<table style={{ flexWrap: 'wrap' }}>
											<tr style={{ width: '100%' }}>
												<td>Hole</td>
												<td>1</td>
												<td>2</td>
												<td>3</td>
												<td>4</td>
												<td>5</td>
												<td>6</td>
												<td>7</td>
												<td>8</td>
												<td>9</td>
												<td>Total</td>
											</tr>
											<tr>
												<td>Strokes</td>
												{player.holes.map((hole, i) => {
													return (
														<td key={i} style={{}}>
															<b>{hole.score}</b>
														</td>
													);
												})}
												<td>{total}</td>
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
												registerWallet();
												// localStorage.clear();
												// router.push('/');
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
												MetaMask Connect
											</p>
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

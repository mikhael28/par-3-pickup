/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

export default function Stake(props) {
	const [ records, setRecords ] = useState([]);
	const [ usd, setUsd ] = useState(1);

	useEffect(() => {
		let recs = localStorage.getItem('records');
		console.log('Recs fetch: ', JSON.parse(recs));
		if (recs !== null) {
			setRecords(JSON.parse(recs));
			calculateWinnings();
			conversion();
		}
	}, []);

	async function conversion() {
		await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH')
			.then((res) => res.json())
			.then((data) => {
				setUsd(data.USD);
			});
	}

	function calculateWinnings() {
		let paper = [];
		let newPlayers = [];

		try {
			for (let index = 0; index < 9; index++) {
				let player1 = records[0].players[0].holes[index].score;
				let player2 = records[0].players[1].holes[index].score;
				if (player1 > player2) {
					paper.push({
						winner: 0,
						amount: 5
					});
				} else if (player2 > player1) {
					paper.push({
						winner: 1,
						amount: 5
					});
				} else if (player1 === player2) {
					paper.push({
						winner: null,
						amount: 0
					});
				}
			}

			for (let finalIndex = 0; finalIndex < records[0].players.length; finalIndex++) {
				let currentValue = 0;

				paper.forEach((item) => {
					if (item.winner === finalIndex) {
						currentValue = currentValue + item.amount;
					} else if (item.winner !== finalIndex && item.winner !== null) {
						currentValue = currentValue - item.amount;
					}
				});

				let tempPlayer = {
					...records[0].players[finalIndex],
					winnings: currentValue
				};
				newPlayers.push(tempPlayer);
			}

			let tempRecords = {
				...records[0],
				players: newPlayers
			};

			setRecords([ tempRecords ]);
		} catch (e) {
			console.log('A wild error has appeared: ', e);
		}
	}

	console.log('Records: ', records);

	return (
		// this CSS class comes from '/styles/main.scss'
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
						<h2>Winnings</h2>
						{rec.players.map((player, i) => {
							return (
								<h3 key={i}>
									{player.fName}'s Winnings: ${player.winnings} or {player.winnings / usd} ETH
								</h3>
							);
						})}
						{rec.players.map((player, index) => {
							if (player.winnings > 0) {
								return (
									<button className="pay-button" key={index}>
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
								);
							}
						})}
					</div>
				);
			})}
		</div>
	);
}

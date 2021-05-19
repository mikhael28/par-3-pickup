/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from 'components/card';
import styles from './GameNav.module.scss';

const { gameNav, active } = styles;

export default function GameNav(props: any): JSX.Element {
	const router = useRouter();
	const [ activeHole, setActiveHole ] = useState<number>(0);
	const [ strokes, setActiveStrokes ] = useState<number>(0);

	console.log('More props');

	function increaseStroke(player: any) {
		const oldGame = { ...props.activeGame };
		oldGame.players.forEach((team: any, i: any) => {
			if (team.id === player.id) {
				team.holes[activeHole].score = team.holes[activeHole].score + 1;
			}
		});
		props.update(oldGame);
		localStorage.setItem('activeGame', JSON.stringify(oldGame));
		setActiveHole(activeHole);
	}

	function decreaseStroke(player: any) {
		const downGame = { ...props.activeGame };
		downGame.players.forEach((team: any, i: any) => {
			if (team.id === player.id) {
				team.holes[activeHole].score = team.holes[activeHole].score - 1;
			}
		});
		props.update(downGame);
		localStorage.setItem('activeGame', JSON.stringify(downGame));
		setActiveHole(activeHole);
	}

	useEffect(() => {
		const holeCheck = localStorage.getItem('activeHole');
		if (holeCheck !== null) {
			setActiveHole(parseInt(holeCheck));
		}
	}, []);

	console.log(props.activeGame);
	function saveRound() {
		let records = localStorage.getItem('records');
		if (records !== null) {
			let jsRecords = JSON.parse(records);
			jsRecords.push(props.activeGame);
			localStorage.setItem('records', JSON.stringify(jsRecords));

			localStorage.removeItem('activeCourse');
			localStorage.removeItem('activeGame');
			props.setActive(false);
		}
	}

	return (
		<div>
			<button
				onClick={() => {
					// localStorage.clear();
					window.location.reload();
				}}
			>
				Clear
			</button>
			<Card {...props.activeCourse} />
			<p>Per Hole Wager: ${props.activeGame.perHoleWager}</p>
			{props.activeGame.players.map((player: any, idx: number) => {
				return (
					<div key={idx} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<p>{player.fName}</p>
						<button onClick={() => decreaseStroke(player)}>-</button>
						<p>Strokes: {props.activeGame.players[idx].holes[activeHole].score}</p>

						<button onClick={() => increaseStroke(player)}>+</button>
					</div>
				);
			})}
			{activeHole === 8 ? <button onClick={saveRound}>Save and finish rounds</button> : null}
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<button
					style={{ backgroundColor: 'green', color: 'white', padding: 6 }}
					onClick={() => {
						if (activeHole !== 0) {
							const newHole = activeHole - 1;
							setActiveHole(newHole);
							localStorage.setItem('activeHole', newHole.toString());
						}
					}}
				>
					Previous
				</button>
				<h1>Hole {activeHole + 1}</h1>
				<button
					style={{ backgroundColor: 'green', color: 'white', padding: 6 }}
					onClick={() => {
						if (activeHole !== 8) {
							const newHole = activeHole + 1;
							setActiveHole(newHole);
							localStorage.setItem('activeHole', newHole.toString());
						}
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
}

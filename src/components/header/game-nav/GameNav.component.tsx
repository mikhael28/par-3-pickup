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
import { API } from '@aws-amplify/api';

const { gameNav, active, player } = styles;

export default function GameNav(props: any): JSX.Element {
	const router = useRouter();
	const [ activeHole, setActiveHole ] = useState<number>(0);
	const [ strokes, setActiveStrokes ] = useState<number>(0);

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

	async function saveRound() {
		const records = localStorage.getItem('records');
		if (records !== null) {
			const jsRecords = JSON.parse(records);
			jsRecords.push(props.activeGame);
			localStorage.setItem('records', JSON.stringify(jsRecords));

			await API.put('matches', '/sp3', {
				body: props.activeGame
			});

			localStorage.removeItem('activeCourse');
			localStorage.removeItem('activeGame');
			props.setActive(false);
		}
	}

	return (
		<div>
			<Card {...props.activeCourse} />
			<p>Per Hole Wager: ${props.activeGame.perHoleWager}</p>
			{props.activeGame.players.map((player: any, idx: number) => {
				return (
					<figure
						className={styles.player}
						key={idx}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							cursor: 'default',
							alignContent: 'center'
						}}
					>
						<div>
							<img
								src={player.picture}
								height="60"
								width="60"
								alt={player.fName}
								style={{ borderRadius: 15 }}
							/>
							<p>{player.fName}</p>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<button onClick={() => decreaseStroke(player)} style={{ fontSize: 46, marginRight: 14 }}>
								-
							</button>
							<p>Strokes: {props.activeGame.players[idx].holes[activeHole].score}</p>

							<button onClick={() => increaseStroke(player)} style={{ fontSize: 46, marginLeft: 14 }}>
								+
							</button>
						</div>
					</figure>
				);
			})}
			{activeHole === 8 ? (
				<button
					onClick={saveRound}
					className="pay-button"
					style={{ width: '90vw', marginRight: 20, marginBottom: 20 }}
				>
					Save and finish rounds
				</button>
			) : null}
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<button
					style={{ backgroundColor: 'green', color: 'white', padding: 6, borderRadius: 4 }}
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
				<div>
					<h1>Hole {activeHole + 1}</h1>
					<button
						onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}
						style={{ backgroundColor: 'red', color: 'white', borderRadius: 3, padding: 4 }}
					>
						Delete Data
					</button>
				</div>
				<button
					style={{ backgroundColor: 'green', color: 'white', padding: 6, borderRadius: 4 }}
					onClick={() => {
						if (activeHole !== 8) {
							const newHole = activeHole + 1;
							setActiveHole(newHole);
							localStorage.setItem('activeHole', newHole.toString());
						}
					}}
				>
					&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;
				</button>
			</div>
		</div>
	);
}

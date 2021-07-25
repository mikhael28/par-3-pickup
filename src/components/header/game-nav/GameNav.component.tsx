/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import styles from './GameNav.module.scss';
import { API } from '@aws-amplify/api';
import store from 'stores';
import { showNotification } from 'stores/notifications';
import { Golfer } from 'config';

export default function GameNav(props: any): JSX.Element {
	const [ activeHole, setActiveHole ] = useState<number>(0);
	const [ activeGolfers, setActiveGolfers] = useState<any>([]);

	useEffect(() => {
		// check for hole, fetch profiles
		const holeCheck = localStorage.getItem('activeHole');
		if (holeCheck !== null) {
			setActiveHole(parseInt(holeCheck));
		};

		fetchProfiles()

	}, []);

	async function fetchProfiles() {
		let emptyGolferArray: any[] = [];
		try {
			// fetch the profile information of the players, to not rely on props.golfer and have multiple profile updates.
			props.activeGame.players.forEach(async (player: any, idx: number) => {
				let profileInfo = await API.get('matches', `/sp3/object/member/${player.SK}`, {})
				emptyGolferArray.push(profileInfo);
			})

			setActiveGolfers(emptyGolferArray);

		} catch(e) {
			console.log(e);
		}
	}

	function cancelGame() {
		// function to go back to home 
		// @TODO: need to add API to edit the profile, and remove the latest record in a user's profile.
		localStorage.removeItem('activeCourse');
		localStorage.removeItem('activeGame');
		localStorage.removeItem('activeHole');
		props.setActive(false);
	}

	function increaseStroke(player: any) {
		const oldGame = { ...props.activeGame };
		oldGame.players.forEach((team: any, i: any) => {
			if (team.SK === player.SK) {
				// @TODO: Use the indexes, to make unique stroke modifications
				team.holes[activeHole].score = team.holes[activeHole].score + 1;
			}
		});
		console.log(oldGame)
		props.update(oldGame);
		localStorage.setItem('activeGame', JSON.stringify(oldGame));
		setActiveHole(activeHole);
	}

	function decreaseStroke(player: any) {
		const downGame = { ...props.activeGame };
		downGame.players.forEach((team: any, i: any) => {
			if (team.SK === player.SK) {
				team.holes[activeHole].score = team.holes[activeHole].score - 1;
			}
		});
		props.update(downGame);
		localStorage.setItem('activeGame', JSON.stringify(downGame));
		setActiveHole(activeHole);
	}

	console.log(activeGolfers)

	function checkForAchievement(hole: any) {
		let achievementArray: any;
		let achievementIndex: any;
		// @TODO loop through each of the golfers in this system.
		let strokeCount = props.activeGame.players[0].holes[hole].score;
		// this only works for one player
		props.golfer.achievements.forEach((ach: any, idx: number) => {
			if (ach.code === props.activeCourse.codeName) {
				achievementArray = ach;
				achievementIndex = idx;
			}
		});

		// check par
		if (achievementArray !== undefined) {
			let newGolfer = { ...props.golfer };

			// checking for par

			if (achievementArray[`par${hole + 1}`].completed === false && strokeCount === 3) {
				newGolfer.achievements[achievementIndex][`par${hole + 1}`].completed = true;
				newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex][`par${hole + 1}`].value;
				props.setGolfer(newGolfer);
				// alert(`You hit par on hole ${hole + 1}`);
				store.dispatch(
					showNotification({
						message: `You hit par on hole ${hole + 1} - you've earned ${newGolfer.achievements[
							achievementIndex
						][`par${hole + 1}`].value} GS!`,
						isExpirable: true
					})
				);
			}

			// checking for birdie
			if (achievementArray[`birdie${hole + 1}`].completed === false && strokeCount === 2) {
				newGolfer.achievements[achievementIndex][`birdie${hole + 1}`].completed = true;
				if ((newGolfer.achievements[achievementIndex][`par${hole + 1}`].completed = false)) {
					newGolfer.achievements[achievementIndex][`par${hole + 1}`].completed = true;
					newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex][`par${hole + 1}`].value;
				}
				newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex][`birdie${hole + 1}`].value;
				store.dispatch(
					showNotification({
						message: `You hit birdie on hole ${hole + 1} - you've earned ${newGolfer.achievements[
							achievementIndex
						][`birdie${hole + 1}`].value} GS!`,
						isExpirable: true
					})
				);
			}

			// check for record
			if (achievementArray.allTimeStrokes[hole] > strokeCount || achievementArray.allTimeStrokes[hole] === 0) {
				newGolfer.achievements[achievementIndex].allTimeStrokes[hole] = strokeCount;
				store.dispatch(
					showNotification({
						message: `You hit a new record on Hole ${hole + 1}!`,
						isExpirable: true
					})
				);
			}

			// check for hole in one
			if (strokeCount === 1 && props.golfer.achievements[achievementIndex].ace.completed === false) {
				newGolfer.achievements[achievementIndex].ace.completed = true;
				newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex].ace.value;
				store.dispatch(
					showNotification({
						message: `Course Achievement Unlocked - Ace (Hole in One)`,
						isExpirable: true
					})
				);
			}

			// perhaps only running if hole is on 8?

			if (activeHole === 8) {
				// check for less than all time record
				let allTimeStrokeCalculation = props.activeGame.players[0].holes.reduce(
					(accumulator: number, hole: any) => accumulator + hole.score,
					0
				);

				// check if finishing your first game
				if (
					props.golfer.achievements[achievementIndex].allTimeRecord === 0 &&
					props.golfer.achievements[achievementIndex].firstTee.completed === false
				) {
					newGolfer.achievements[achievementIndex].firstTee.completed = true;
					newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex].firstTee.value;
					store.dispatch(
						showNotification({
							message: `Achievement Unlocked - First Tee!`,
							isExpirable: true
						})
					);
				}

				// check if you beat your all-time record
				if (
					allTimeStrokeCalculation < props.golfer.achievements[achievementIndex].allTimeRecord ||
					props.golfer.achievements[achievementIndex].allTimeRecord === 0
				) {
					newGolfer.achievements[achievementIndex].allTimeRecord = allTimeStrokeCalculation;
					if (
						props.golfer.achievements[achievementIndex].personalBest1.completed === false &&
						props.golfer.achievements[achievementIndex].personalBest2.completed === false &&
						props.golfer.achievements[achievementIndex].personalBest3.completed === false
					) {
						newGolfer.achievements[achievementIndex].personalBest1.completed = true;
						newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex].personalBest1.value;
						store.dispatch(
							showNotification({
								message: `Achievement Unlocked - Personal Best I`,
								isExpirable: true
							})
						);
					} else if (
						props.golfer.achievements[achievementIndex].personalBest1.completed === true &&
						props.golfer.achievements[achievementIndex].personalBest2.completed === false &&
						props.golfer.achievements[achievementIndex].personalBest3.completed === false
					) {
						newGolfer.achievements[achievementIndex].personalBest2.completed = true;
						newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex].personalBest2.value;
						store.dispatch(
							showNotification({
								message: `Achievement Unlocked - Personal Best II`,
								isExpirable: true
							})
						);
					} else if (
						props.golfer.achievements[achievementIndex].personalBest1.completed === true &&
						props.golfer.achievements[achievementIndex].personalBest2.completed === true &&
						props.golfer.achievements[achievementIndex].personalBest3.completed === false
					) {
						newGolfer.achievements[achievementIndex].personalBest3.completed = true;
						newGolfer.xp = newGolfer.xp + newGolfer.achievements[achievementIndex].personalBest3.value;
						store.dispatch(
							showNotification({
								message: `Achievement Unlocked - Personal Best III`,
								isExpirable: true
							})
						);
					}
				}

				// check if you average junior par
				if (
					allTimeStrokeCalculation <= 36 &&
					props.golfer.achievements[achievementIndex].averageJuniorPar.completed === false
				) {
					newGolfer.achievements[achievementIndex].averageJuniorPar.completed === true;
				}

				// check if you average par
				if (
					allTimeStrokeCalculation <= 27 &&
					props.golfer.achievements[achievementIndex].averagePar.completed === false
				) {
					newGolfer.achievements[achievementIndex].averagePar.completed === true;
				}
			}

			props.setGolfer(newGolfer);
		}
	}

	let achIndex = 0;
	props.golfer.achievements.forEach((ach: any, idx: number) => {
		if (ach.code === props.activeCourse.codeName) {
			achIndex = idx;
		}
	});


	async function saveRound() {
		checkForAchievement(activeHole);
		const records = localStorage.getItem('records');
		if (records !== null) {
			const jsRecords = JSON.parse(records);
			jsRecords.push(props.activeGame);
			// @TODO: need to make this better, it will break with current JS in the records
			// localStorage.setItem('records', JSON.stringify(jsRecords));

			await API.put('matches', '/sp3', {
				body: props.activeGame
			});

			console.log('Golfer Profile to be saved: ', props.golfer);

			await API.put('matches', '/sp3', {
				body: props.golfer
			});

			localStorage.removeItem('activeCourse');
			localStorage.removeItem('activeGame');
			localStorage.removeItem('activeHole');
			props.setActive(false);
		}
	}

	return (
		<div>
			<h1>Par 3 at {props.activeCourse.name}</h1>
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
							cursor: 'default'
						}}
					>
						<div>
							<img
								src={player.profilePicture}
								height="80"
								width="80"
								alt={player.fName}
								style={{ borderRadius: 15 }}
							/>
							{/* <p>{player.fName}</p> */}
						</div>
						<div className="flex-down">
							<div>
								<p>
									Historical Best: {
										props.golfer.achievements[achIndex].allTimeStrokes[activeHole]
									}{' '}
									Strokes
								</p>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<button
									onClick={() => decreaseStroke(player)}
									style={{
										fontSize: 40,
										marginRight: 24,
										paddingRight: 12,
										paddingLeft: 12,
										borderRadius: '50%',
										backgroundColor: '#a946d0',
										color: 'white'
									}}
								>
									-
								</button>
								<p>Strokes: {props.activeGame.players[idx].holes[activeHole].score}</p>

								<button
									onClick={() => increaseStroke(player)}
									style={{
										fontSize: 40,
										marginLeft: 24,
										paddingRight: 12,
										paddingLeft: 12,
										borderRadius: '50%',
										backgroundColor: '#a946d0',
										color: 'white'
									}}
								>
									+
								</button>
							</div>
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
				<div
					style={{
						backgroundColor: '#a946d0',
						display: 'flex',
						alignItems: 'center',
						borderRadius: 4,
						margin: 12
					}}
				>
					<span class="material-icons" style={{ color: 'white' }}>
						chevron_left
					</span>
					<button
						style={{
							color: 'white',
							padding: 6,
							borderRadius: 4,
							alignItems: 'center'
						}}
						onClick={() => {
							if (activeHole !== 0) {
								const newHole = activeHole - 1;
								checkForAchievement(activeHole);
								setActiveHole(newHole);
								localStorage.setItem('activeHole', newHole.toString());
							}
						}}
					>
						Previous
					</button>
				</div>

				<div>
					<h1>Hole {activeHole + 1}</h1>
				</div>
				<div
					style={{
						backgroundColor: '#a946d0',
						display: 'flex',
						alignItems: 'center',
						borderRadius: 4,
						margin: 12
					}}
				>
					<button
						style={{
							color: 'white',
							padding: 6
						}}
						onClick={() => {
							if (activeHole !== 8) {
								const newHole = activeHole + 1;
								checkForAchievement(activeHole);

								setActiveHole(newHole);
								localStorage.setItem('activeHole', newHole.toString());
							}
						}}
					>
						&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;
					</button>
					<span class="material-icons" style={{ color: 'white' }}>
						chevron_right
					</span>
				</div>
			</div>
		</div>
	);
}

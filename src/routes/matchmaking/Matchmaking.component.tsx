/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Pages from 'components/pages';
import Placeholder from 'components/placeholder';
import Card from 'components/card';
import PlayerCard from 'components/player-card';
import styles from './Matchmaking.module.scss';
import { golfers, Course, Golfer } from '../../config';
import { useRouter } from 'next/router';
import short from 'short-uuid';
import { API } from 'aws-amplify';

const { matchMaking, matchMakingContainer } = styles;

export default function Matchmaking(): JSX.Element {
	const router = useRouter();
	const [ stake, setStake ] = useState<string>('0');
	const [ disabledButton, setDisabledButton ] = useState<boolean>(false);
	const [ chosenGolfers, setGolfers ] = useState<Golfer[]>([]);
	const [ course, setCourse ] = useState<Course>({
		id: '',
		name: '',
		codeName: '',
		par3: true,
		eighteen: false,
		street: '',
		city: '',
		zip: '',
		par: 27,
		putting: 0,
		picture: '',
		holes: []
	});

	useEffect(() => {
		// this is where we pull the course name from localStorage
		let activeCourse = localStorage.getItem('activeCourse');
		if (activeCourse !== null) {
			console.log('Active course: ', JSON.parse(activeCourse));
			setCourse(JSON.parse(activeCourse));
		}
	}, []);

	function handleSelectChange(event: any) {
		let newGolfers = chosenGolfers.slice();
		newGolfers.push(JSON.parse(event.target.value));
		setGolfers(newGolfers);
		if (newGolfers.length > 1) {
			setDisabledButton(true);
		}
	}

	function handleStake(event: any) {
		setStake(event.target.value);
	}

	// now, it's time to add the matchmaking, to add the players to the localStorage game, set the gambling amounts, and create.
	// from there, need to add the counters for the holes,
	// then need to mark 'complete' and have a screen to review.

	async function startGame() {
		let newDate = new Date();

		const body = {
			id: '123',
			course: course.name,
			perHoleWager: parseInt(stake, 10) || 0,
			ldWager: 5,
			players: chosenGolfers,
			holes: course.holes,
			PK: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
			SK: short.generate(),
			LSI1: 'userIdHere'
		};
		try {
			localStorage.setItem('activeGame', JSON.stringify(body));
			let createdGame = await API.post('matches', '/sp3', { body });
			console.log('Created Game: ', createdGame);
			// router.push('/');
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<React.Fragment>
			<Head>
				<title>Matchmaking</title>
			</Head>
			<main className={matchMaking}>
				<Card {...course} name={`Matchmaking at ${course.name}`} />
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<div>
						<p>Select Per Hole Stake</p>
						<input value={stake} onChange={handleStake} placeholder="0" />
					</div>
					<div>
						{chosenGolfers.length < 2 ? (
							<React.Fragment>
								{/* <p>Select the players.</p> */}
								<span className="custom-dropdown">
									<select onChange={handleSelectChange} className="custom-dropdown">
										<option value="none">Choose Your Players</option>
										{golfers.map((golfer, idx) => (
											<option value={JSON.stringify(golfer)} key={idx}>
												{golfer.fName}
											</option>
										))}
									</select>
								</span>
							</React.Fragment>
						) : null}
					</div>
				</div>
				<div className={matchMakingContainer}>
					{chosenGolfers.map((player, idx) => {
						return <PlayerCard {...player} key={idx} />;
					})}
				</div>
				{disabledButton === true ? (
					<button
						className="pay-button"
						onClick={startGame}
						style={{ backgroundColor: 'green', color: 'white', padding: 12 }}
					>
						Start game
					</button>
				) : null}
			</main>
		</React.Fragment>
	);
}

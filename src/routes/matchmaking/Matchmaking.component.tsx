import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Pages from 'components/pages';
import Placeholder from 'components/placeholder';
import Card from 'components/card';
import styles from './Matchmaking.module.scss';
import { golfers, Course, Golfer } from '../../config';
import { useRouter } from 'next/router';

const { matchMaking, matchMakingContainer } = styles;

export default function Matchmaking(): JSX.Element {
	const router = useRouter();
	const [ stake, setStake ] = useState<string>('');
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
	}

	function handleStake(event: any) {
		setStake(event.target.value);
	}

	// now, it's time to add the matchmaking, to add the players to the localStorage game, set the gambling amounts, and create.
	// from there, need to add the counters for the holes,
	// then need to mark 'complete' and have a screen to review.

	function startGame() {
		// here we start the game
		const newGame = {
			id: '123',
			course: course.name,
			perHoleWager: parseInt(stake, 10),
			ldWager: 5,
			// array for players?
			players: chosenGolfers,

			// or array for each hole, with each hole having an object.
			// how will the gambling fit in?
			holes: course.holes
		};
		try {
			console.log(newGame);
			localStorage.setItem('activeGame', JSON.stringify(newGame));
			router.push('/');
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
				<Card {...course} />
				<h1>Matchmaking</h1>
				<p>Select Per Hole Stake</p>
				<input value={stake} onChange={handleStake} />
				<p>Select the players.</p>
				<select onChange={handleSelectChange}>
					<option value="none">Choose Your Players</option>
					{golfers.map((golfer, idx) => (
						<option value={JSON.stringify(golfer)} key={idx}>
							{golfer.fName}
						</option>
					))}
				</select>
				<div className={matchMakingContainer}>
					{chosenGolfers.map((player, idx) => {
						return <div key={idx}>{player.fName}</div>;
					})}
				</div>
				<button onClick={startGame} style={{ backgroundColor: 'green', color: 'white', padding: 12 }}>
					Start game
				</button>
			</main>
		</React.Fragment>
	);
}

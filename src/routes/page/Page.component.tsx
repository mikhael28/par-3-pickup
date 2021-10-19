/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Landing from 'routes/page/landing';
import A2HS from 'components/a2hs';
import API from '@aws-amplify/api';
import Card from 'components/card';
import GameNav from 'components/header/game-nav';
// import RecordCard from 'components/record-card';
import { useRouter } from 'next/router';
import { courses, Course, Game } from '../../config';

export default function Page(props: any): JSX.Element {
	const router = useRouter();
	const [ active, setActive ] = useState<boolean>(false);
	// const [ games, setGames ] = useState<Game[]>([]);
	const [ activeCourse, setActiveCourse ] = useState<Course>({
		id: '',
		name: '',
		codeName: '',
		par3: false,
		eighteen: false,
		street: '',
		city: '',
		zip: '',
		par: 0,
		putting: 0,
		picture: '',
		holes: []
	});

	const [ activeGame, setActiveGame ] = useState<Game>({
		id: '',
		course: '',
		perHoleWager: 0,
		ldWager: 0,
		players: [],
		holes: []
	});

	useEffect(() => {
		// localStorage.clear();
		const gameCheck = localStorage.getItem('activeCourse');
		const activeCheck = localStorage.getItem('activeGame');
		const recordCheck = localStorage.getItem('records');

		if (gameCheck !== null) {
			setActiveCourse(JSON.parse(gameCheck));
		}
		if (activeCheck !== null) {
			setActiveGame(JSON.parse(activeCheck));
			setActive(true);
		}
		if (recordCheck === null) {
			// Setting an initial empty array, to avoid errors? Revisit
			localStorage.setItem('records', JSON.stringify([]));
		}
		// @TODO: Add online game matchmaking back in at some point
		// fetchOnlineGames();
	}, []);

	function update(game: any) {
		setActiveGame(game);
	}

	async function fetchOnlineGames() {
		// currently disabled
		const newDate = new Date();
		try {
			const onlineGames = await API.get(
				'matches',
				`/sp3/date/${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				{}
			);
			// setGames(onlineGames);
		} catch (e) {
			console.error('Problem fetching todays games: ', e);
		}
	}

	return (
		<React.Fragment>
			<Head>
				<title>Par 3 Pickup</title>
				<meta name="og:title" content="Seattle Pickup Golf" />
				<meta
					name="description"
					property="og:description"
					content="The beginners community for pickup golf in Seattle"
				/>
				<meta name="robots" content="INDEX,FOLLOW" />
			</Head>
			<main>
				{active === false ? <Landing /> : null}
				<section>
					{active === false ? <A2HS /> : null}
					{active === true ? (
						<GameNav
							activeGame={activeGame}
							activeCourse={activeCourse}
							update={update}
							setActive={setActive}
							golfer={props.golfer}
							setGolfer={props.setGolfer}
							fetchProfileData={props.fetchProfileData}
							setPictureLink={props.setPictureLink}
							setPictureModal={props.setPictureModal}
						/>
					) : (
						<div>
							<h1>Choose your course 🏌️‍♂️ ⛳</h1>
							<div className="cards">
								{courses.map((course, index) => {
									return (
										<Card
											{...course}
											handleClick={() => {
												localStorage.setItem('activeCourse', JSON.stringify(course));
												router.push(`/matchmaking`);
											}}
											key={index}
										/>
									);
								})}
							</div>
						</div>
					)}
				</section>
			</main>
		</React.Fragment>
	);
}

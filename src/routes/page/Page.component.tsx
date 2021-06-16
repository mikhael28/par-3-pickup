/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Landing from 'routes/page/landing';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import API from '@aws-amplify/api';
import Card from 'components/card';
import GameNav from 'components/header/game-nav';
import { usePageData, usePageDetails } from 'hooks/page';
import { injectClassNames } from 'utils/css';
import RecordCard from 'components/record-card';
import { useRouter } from 'next/router';
import { courses, Course, Game } from '../../config';
import styles from './Page.module.scss';

const { page, pageLanding, pageContent, placeholder } = styles;

export default function Page(props: any): JSX.Element {
	const { isLanding } = props;
	const { title = '', description = '' } = usePageDetails();
	const { content = '' } = usePageData();
	const router = useRouter();
	const [ active, setActive ] = useState<boolean>(false);
	const [ games, setGames ] = useState<Game[]>([]);
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

	console.log(props);

	const [ activeGame, setActiveGame ] = useState<Game>({
		id: '',
		course: '',
		perHoleWager: 0,
		ldWager: 0,
		players: [],
		holes: []
	});

	const classNames = injectClassNames(page, [ pageLanding, isLanding ]);

	useEffect(() => {
		// localStorage.clear();
		const gameCheck = localStorage.getItem('activeCourse');
		if (gameCheck !== null) {
			// console.log('Course Check: ', JSON.parse(gameCheck));
			setActiveCourse(JSON.parse(gameCheck));
		}
		const activeCheck = localStorage.getItem('activeGame');
		// console.log('Game? : ', activeCheck);
		if (activeCheck !== null) {
			// console.log('Game check: ', JSON.parse(activeCheck));
			setActiveGame(JSON.parse(activeCheck));
			setActive(true);
		}
		const recordCheck = localStorage.getItem('records');
		if (recordCheck === null) {
			localStorage.setItem('records', JSON.stringify([]));
		}
		fetchOnlineGames();
	}, []);

	function update(game: any) {
		setActiveGame(game);
	}

	async function fetchOnlineGames() {
		const newDate = new Date();
		try {
			const onlineGames = await API.get(
				'matches',
				`/sp3/date/${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
				{}
			);
			setGames(onlineGames);
		} catch (e) {
			console.error('Problem fetching todays games: ', e);
		}
	}

	return (
		<React.Fragment>
			<Head>
				<title>Seattle Par 3 Golf</title>
				<meta name="og:title" content="Seattle Pickup Golf" />
				<meta
					name="description"
					property="og:description"
					content="The beginners community for pickup golf in Seattle"
				/>
				<meta name="robots" content="INDEX,FOLLOW" />
			</Head>
			<main>
				{/* { isLanding && <Landing /> } */}
				<section>
					<A2HS />
					{active === false ? (
						<div>
							{/* {games.length > 0 ? <h1>Join a Game Today</h1> : null}
							{games.map((game, idx) => {
								return <RecordCard {...game} key={idx} />;
							})} */}
						</div>
					) : null}
					{active === true ? (
						<GameNav
							activeGame={activeGame}
							activeCourse={activeCourse}
							update={update}
							setActive={setActive}
							golfer={props.golfer}
							setGolfer={props.setGolfer}
						/>
					) : (
						<div>
							<h1>Choose your course 🏌️‍♂️ ⛳</h1>
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
					)}

					{/* <Card title="Fore!" description="Click or tap here to start a new game!" onClick={() => props.history.push('/course/jackson')} /> */}
					{/* <div className={pageContent}>
                            <>
                                <figure className={ placeholder } />
                                <figure className={ placeholder } />
                                <figure className={ placeholder } />
                            </>
                        </div> */}
					{/* <Sidebar /> */}
				</section>
			</main>
		</React.Fragment>
	);
}

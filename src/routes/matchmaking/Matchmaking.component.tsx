/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Pages from 'components/pages';
import Placeholder from 'components/placeholder';
import Card from 'components/card';
import PlayerCard from 'components/player-card';
import { API } from '@aws-amplify/api';
import { useRouter } from 'next/router';
import short from 'short-uuid';
import { golfers, Course, Golfer } from '../../config';
import styles from './Matchmaking.module.scss';

const { matchMaking, matchMakingContainer } = styles;

export default function Matchmaking(): JSX.Element {
	const router = useRouter();
	const [ stake, setStake ] = useState<string>('0');
	const [ time, setTime ] = useState<string>('AM');
	const [ hour, setHour ] = useState<string>('10');
	const [ description, setDescription ] = useState<string>('');
	const [ phone, setPhone ] = useState<string>('');
	const [ minute, setMinute ] = useState<string>('15');
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
		if (newGolfers.length >= 1) {
			setDisabledButton(true);
		}
	}

	function handleStake(event: any) {
		setStake(event.target.value);
	}

	function handlePhone(event: any) {
		if (phone.length <= 11) {
			setPhone(event.target.value);
		}
	}

	function handleDescription(event: any) {
		setDescription(event.target.value);
	}

	// now, it's time to add the matchmaking, to add the players to the localStorage game, set the gambling amounts, and create.
	// from there, need to add the counters for the holes,
	// then need to mark 'complete' and have a screen to review.

	async function startGame() {
		const newDate = new Date();

		const body = {
			id: '123',
			course: course.name,
			perHoleWager: parseInt(stake, 10) || 0,
			ldWager: 5,
			players: chosenGolfers,
			holes: course.holes,
			PK: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
			SK: short.generate(),
			LSI1: 'userIdHere',
			time: `${hour}:${minute} ${time}`,
			hostPhone: phone,
			description: description
		};
		try {
			localStorage.setItem('activeGame', JSON.stringify(body));
			await API.post('matches', '/sp3', { body });
			router.push('/');
		} catch (e) {
			console.error(e);
		}
	}

	const minuteItems = [];
	for (let i = 0; i < 60; i++) {
		let iStr = i.toString();
		if (iStr.length < 2) {
			iStr = `0${iStr}`;
		}
		minuteItems.push(<option value={`${iStr}`}>{iStr}</option>);
	}

	return (
		<React.Fragment>
			<Head>
				<title>Matchmaking</title>
			</Head>
			<main style={{ display: 'flex', flexDirection: 'column' }}>
				<Card {...course} name={`Matchmaking at ${course.name}`} />
				<div>
					<h2>$ Skin Per Hole</h2>
					<input value={stake} onChange={handleStake} placeholder="0" />
				</div>
				<div>
					<h2>Host Phone Number</h2>
					<input value={phone} onChange={handlePhone} placeholder="6508687480" />
				</div>
				<div>
					<h2>Meetup Notes</h2>
					<textarea
						onChange={handleDescription}
						rows={4}
						placeholder="Meet outside the pro-shop, by the benches close to the first tee."
					>
						{description}
					</textarea>
				</div>

				<div>
					<h1>
						Tee Time: {hour}:{minute} {time}
					</h1>
				</div>
				<div className="flex">
					<div className="flex-down-select">
						<label htmlFor="hour">Hour</label>
						<select
							name="hour"
							id="hours"
							onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => setHour(ev.target.value)}
							value={hour}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
					</div>
					<div className="flex-down-select">
						<label htmlFor="minute">Minute</label>
						<select
							name="minute"
							id="minute"
							value={minute}
							onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => setMinute(ev.target.value)}
						>
							{minuteItems}
						</select>
					</div>
					<div className="flex-down-select">
						<label htmlFor="time">AM/PM</label>
						<select
							name="time"
							id="time"
							value={time}
							onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => setTime(ev.target.value)}
						>
							<option value="AM">AM</option>
							<option value="PM">PM</option>
						</select>
					</div>
				</div>

				<br />
				<div>
					{chosenGolfers.length <= 1 ? (
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
					) : null}
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

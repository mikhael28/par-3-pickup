/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

export default function Stake(props) {
	// these three variables here are where I am storing React 'state';
	// these are official state objects, meaning when they are updated by the setBlahBlah function, the UI will be ordered to re-render as well. This is how we will keep our user interface updated.
	const [ exampleState, setExampleState ] = useState(0);
	const [ exampleStringState, setStringState ] = useState("Let's get it.");
	const [ exampleArrayOfObjects, setObjects ] = useState([]);
	const [ records, setRecords ] = useState([]);
	const [ player1Incoming, setPlayer1 ] = useState(0);
	const [ player2Incoming, setPlayer2 ] = useState(0);

	// You can console log values to assist in debugging.
	console.log('What are my props: ', props);

	useEffect(() => {
		// this useEffect function fires when the component/page loads. Very handy.
		// You can use this function to set up the business logic for a particular component. For example, perhaps you need to send an API request to your database to pre-populate the page with useful data. You can execute that here. In a React Class Component, this function would be called componentDidMount()
		let newGolfers = [
			{
				fName: 'Misha',
				cryptoBroke: true
			},
			{
				fName: 'Derek',
				cryptoBroke: false
			}
		];
		setObjects(newGolfers);
		setExampleState(88);
		let recs = localStorage.getItem('records');
		console.log('Recs fetch: ', JSON.parse(recs));
		if (recs !== null) {
			setRecords(JSON.parse(recs));
		}
	}, []);

	// useEffect(() => {
	// 	alert("state was updated")
	// },[exampleStringState])

	function handleClick(event) {
		event.preventDefault();
		// pretty self-evident, a simple demonstration of how to tie a function to a button through onClick
		// create object for each player that shows who owes who money,
		// loop thru records object to create object for each player
		// use results.push to push object we created into object array
		let paper = [];
		let newPlayers = [];

		try {
			for (let index = 0; index < 9; index++) {
				let player1 = records[0].players[0].holes[index].score;
				let player2 = records[0].players[1].holes[index].score;
				if (player1 > player2) {
					console.log('Player 1 wins hole', index + 1);
					paper.push({
						winner: 0,
						amount: 5
					});
				} else if (player2 > player1) {
					console.log('Player 2 wins hole', index + 1);
					paper.push({
						winner: 1,
						amount: 5
					});
				} else if (player1 === player2) {
					console.log('Tie Game at hole ', index + 1);
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
					}
				});
				// console.log(`Player ${finalIndex}`, currentValue);
				// console.log(records[0].players[finalIndex]);

				let tempPlayer = {
					...records[0].players[finalIndex],
					winnings: currentValue
				};
				// console.log('Temp record: ', tempPlayer);
				newPlayers.push(tempPlayer);
			}

			let tempRecords = {
				...records[0],
				players: newPlayers
			};

			// console.log('Paper: ', tempRecords);
			setRecords([ tempRecords ]);
		} catch (e) {
			console.log('A wild error has appeared: ', e);
		}
	}

	console.log('Records: ', records);

	return (
		// this CSS class comes from '/styles/main.scss'
		<div className="stakes-root" style={{ marginTop: 80 }}>
			<div>
				<h1>Derek's Sandbox</h1>
				{/* <p>The place where dev dreams come true.</p> */}
				{/* In React, you can display JavaScript values (especially state objects) inside of the HTML markdown (called JSX) by simply putting it in a bracket. */}
				{/* <p>{exampleState}</p>
				<p>{exampleStringState}</p> */}
			</div>

			{/* The mapping function is your best friend. It will loop over an array, and perform the same business logic on each element inside. Here, we are looping over the exampleArrayOfObjects and we are "returning" the piece of HTML/JS (JSX) for each object in the array. We have two golfers, you and I, and it is generating the JSX. If you look at line 8, where this object is first defined - you will notice the 'default value' is an empty array. This is totally legit - the map function will still operate, but it will see that it's an empty array - and just stop. No error. Later, on line 26 in the useEffect, when we mutate/replace the state object with the contents of the newGolfers object, we now have an array with two objects */}

			{/* Whenever a React state object is updated, AND it is displayed inside the return function in some way (like it is below) then the UI is commanded to re-render. */}

			{/* {exampleArrayOfObjects.map((golfer, index) => {
				return (
					<div key={index}>
						<h2>{golfer.fName}</h2>
						{golfer.cryptoBroke === true ? (
							<p>Put your hard hat on and get to mining</p>
						) : (
							<p>Make sure you pay your taxes on that crypto son</p>
						)}
					</div>
				);
			})} */}

			{records.map((rec, i) => {
				return (
					<div style={{ paddingLeft: 20 }} key={i}>
						<p>{rec.course}</p>
						<p>Players</p>
						{rec.players.map((player, idx) => {
							console.log(player);
							return (
								<div key={idx}>
									<p>{player.fName}</p>
									<p>{player.winnings}</p>
									<div style={{ display: 'flex' }}>
										{player.holes.map((hole, i) => {
											return (
												<div style={{ display: 'flex' }} key={i}>
													<p>score: {hole.score}</p>
													<p style={{ paddingLeft: 20 }}>par: {hole.par}</p>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				);
			})}

			{/* a simple button function for you */}

			<button onClick={handleClick} style={{ backgroundColor: 'red', color: 'white' }}>
				Calculate
			</button>
		</div>
	);
}

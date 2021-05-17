import React, { useEffect, useState } from 'react';

export default function Stake(props) {
	const [ exampleState, setExampleState ] = useState(0);
	const [ exampleStringState, setStringState ] = useState("Let's get it.");
	const [ exampleArrayOfObjects, setObjects ] = useState([]);

	console.log('What are my props: ', props);

	useEffect(() => {
		// this useEffect function fires when the component/page loads. Very handy.
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
	}, []);

	function handleClick(event) {
		event.preventDefault();

		try {
			setStringState('Persist and succeed');
		} catch(e) {
			console.log('A wild error has appeared: ', e);
		}
	}

	return (
		<div className="stakes-root">
			<div>
				<h1>Derek's Sandbox</h1>
				<p>The place where dev dreams come true.</p>
				<p>{exampleState}</p>
				<p>{exampleStringState}</p>
			</div>

			{exampleArrayOfObjects.map((golfer, index) => {
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
			})}

			<button onClick={handleClick} style={{backgroundColor: 'red', color: 'white'}}>Click me to change the string</button>
		</div>
	);
}

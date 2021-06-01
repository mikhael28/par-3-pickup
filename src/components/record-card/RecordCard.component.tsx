import React from 'react';
import Avatar from 'react-avatar';
import styles from './RecordCard.module.scss';

export default function RecordCard(props: any) {
	const { card } = styles;
	return (
		<figure
			className={card}
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
			onClick={props.handleClick}
		>
			<div>
				<h2>Course: {props.course}</h2>
				<p>{props.time} Tee Time</p>
			</div>
			<div>
				{props.players.map((player: any, index: any) => {
					return <Avatar name={`${player.fName} ${player.lName}`} size="60" round={true} key={index} />;
				})}
			</div>
		</figure>
	);
}

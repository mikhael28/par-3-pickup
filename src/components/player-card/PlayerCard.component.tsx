import React from 'react';
import styles from './PlayerCard.module.scss';

export default function Card(props: any) {
	const { card } = styles;
	return (
		<figure className={card} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<div>
				<img src={props.profilePicture} height="80" width="80" alt={props.fName} />
			</div>
			<div>
				<h3>
					{props.fName} {props.lName}
				</h3>
				<h4>Golfer Score: {props.xp}</h4>
			</div>
		</figure>
	);
}

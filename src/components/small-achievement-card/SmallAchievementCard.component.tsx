import React from 'react';
import styles from './SmallAchievementCard.module.scss';

export default function AchievementCard(props: any) {
	const { card } = styles;
	let completed;
	if (props.completed === true) {
		completed = 'Unlocked';
	} else {
		completed = 'Locked';
	}
	return (
		<figure
			className={card}
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
			onClick={props.handleClick}
		>
			<p>{props.name}</p>
			<div>
				<p>{completed}</p>
				<p>{props.value} GS</p>
			</div>
		</figure>
	);
}

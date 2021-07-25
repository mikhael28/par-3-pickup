import React from 'react';
import styles from './Card.module.scss';

export default function Card(props: any) {
	const { card } = styles;
	return (
		<figure
			className={card}
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
			onClick={props.handleClick}
		>
			<div>
				<img src={props.picture} height="60" width="60" alt={props.name} />
			</div>
			<div>
				<h2>{props.name}</h2>
				<p>{props.city}</p>
			</div>
		</figure>
	);
}

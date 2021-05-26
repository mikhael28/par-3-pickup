import React from 'react';
import { REPL_MODE_SLOPPY } from 'repl';
import styles from './PlayerCard.module.scss';

export default function Card(props: any) {
	const { card } = styles;
	return (
		<figure className={card} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<div>
				<img src={props.picture} height="60" width="60" alt={props.fName} />
			</div>
			<div>
				<h2>
					{props.fName} {props.lName}
				</h2>
				{/* <p>{props.city}</p> */}
			</div>
		</figure>
	);
}

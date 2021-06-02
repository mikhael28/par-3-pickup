/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecordCard from 'components/record-card';

export default function Stakes(props) {
	const [ records, setRecords ] = useState([]);
	const router = useRouter();

	useEffect(() => {
		let recs = localStorage.getItem('records');
		if (recs !== null) {
			setRecords(JSON.parse(recs));
		}
	}, []);

	return (
		<div className="stakes-root" style={{ paddingTop: 80 }}>
			{records.map((rec, i) => {
				return (
					<div style={{ paddingLeft: 20 }} key={i}>
						<RecordCard
							players={rec.players}
							course={rec.course}
							date={'2021-5-28'}
							handleClick={() => {
								localStorage.setItem('activeRecord', JSON.stringify(rec));
								router.push(`/stakes/stake/${rec.PK}_${rec.SK}`);
							}}
							picture={rec.picture}
						/>
					</div>
				);
			})}
		</div>
	);
}

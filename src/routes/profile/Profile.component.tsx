/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'components/image';
import Icon from 'components/icon';
import Placeholder from 'components/placeholder';
import { useUser } from 'hooks/user';
import { useRouter } from 'next/router';
import SmallRecordCard from 'components/small-record-card';
import styles from './Profile.module.scss';

const { profile, profileMain, profilePicture, profileContent, followersIcon, followersPlaceholder, about } = styles;

export default function Profile(props: any): JSX.Element {
	const { name, bio, avatar_url, followers } = useUser();
	const [ newName, setName ] = useState<string>('Panther Forest');
	const [ newBio, setBio ] = useState<string>('New to the tour.');
	const [ newPhone, setPhone ] = useState<string>('6508687480');
	const [ refresh, setRefresh ] = useState<boolean>(false);
	const [ records, setRecords ] = useState([]);
	const router = useRouter();

	useEffect(() => {
		let recs = localStorage.getItem('records');
		if (recs !== null) {
			setRecords(props.golfer.records);
		} else {
			// dynamo request to get all records records, then you can click in to get the real dookie
		}
	}, []);

	useEffect(() => {
		let localName = localStorage.getItem('name');
		let localBio = localStorage.getItem('bio');
		let localPhone = localStorage.getItem('phone');

		if (localName === null || localBio === null || localPhone === null) {
			setRefresh(!refresh);
		} else {
			setName(localName);
			setBio(localBio);
			setPhone(localPhone);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Profile</title>
				<meta name="robots" content="noindex" />
			</Head>
			<main className={profile}>
				<div className={profileMain}>
					<Image isPlaceholder={!avatar_url} src={props.golfer.profilePicture} className={profilePicture} />
					<div className={profileContent}>
						<h1>
							<Placeholder content={`${props.golfer.fName} ${props.golfer.lName}`} length="short" />
						</h1>
						<p>
							<Placeholder content={props.golfer.phone} length="short" />
						</p>
						<p>
							<Placeholder content={props.golfer.bio} length="long" />
						</p>
						{/* <h3>
                            <Icon
                              asset="People"
                              className={ followersIcon }
                            />
                            {
                                followers ?? <span className={ followersPlaceholder } />
                            } Followers
                        </h3> */}
						<h3
							style={{ cursor: 'pointer' }}
							onClick={() => {
								props.setModal(true);
								router.push('/');
							}}
						>
							<Icon asset="People" className={followersIcon} />
							Edit
						</h3>
						<br />
						<h3
							style={{ cursor: 'pointer' }}
							onClick={() => {
								localStorage.clear();
								router.push('/');
							}}
						>
							<Icon asset="People" className={followersIcon} />
							Logout
						</h3>
					</div>
				</div>
				<br />
				<h2>Previous Game Records</h2>
				{records.map((rec: any, i) => {
					return (
						<SmallRecordCard
							course={rec.course}
							gamePK={rec.gamePK}
							handleClick={() => {
								localStorage.setItem('activeRecord', JSON.stringify(rec));
								router.push(`/stakes/stake/${rec.PK}_${rec.SK}`);
							}}
						/>
					);
				})}
				{/* <div className={about}>
					<h2>About</h2>
					<p>
						{summary}
					</p>
				</div> */}
			</main>
		</React.Fragment>
	);
}

/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'components/image';
import Icon from 'components/icon';
import Placeholder from 'components/placeholder';
import { useUser } from 'hooks/user';
import { useRouter } from 'next/router';
import SmallRecordCard from 'components/small-record-card';
import Collapsible from 'react-collapsible';
import styles from './Profile.module.scss';
import SmallAchievementCard from 'components/small-achievement-card';

const { profile, profileMain, profilePicture, profileContent, followersIcon, followersPlaceholder, about } = styles;

export default function Profile(props: any): JSX.Element {
	const { name, bio, avatar_url, followers } = useUser();
	const [ newName, setName ] = useState<string>('Panther Forest');
	const [ newBio, setBio ] = useState<string>('New to the tour.');
	const [ newPhone, setPhone ] = useState<string>('6508687480');
	const [ refresh, setRefresh ] = useState<boolean>(false);
	const [ records, setRecords ] = useState([]);
	const [ achievements, setAchievements ] = useState([]);
	const router = useRouter();

	useEffect(
		() => {
			let recs = localStorage.getItem('records');
			if (recs !== null) {
				setRecords(props.golfer.records);
				console.log(props.golfer.achievements);
				setAchievements(props.golfer.achievements);
			} else {
				// dynamo request to get all records records, then you can click in to get the real dookie
			}
		},
		[ props.golfer ]
	);

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
							<Placeholder content={props.golfer.xp} length="short" /> Golfer Score
						</p>
						<p>
							Phone: <Placeholder content={props.golfer.phone} length="short" />
						</p>
						<p>
							Bio: <Placeholder content={props.golfer.bio} length="long" />
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
						<div className="flex-between">
							<h3
								style={{ cursor: 'pointer' }}
								// onClick={() => {
								// 	props.setModal(true);
								// 	router.push('/');
								// }}
							>
								<Icon asset="People" className={followersIcon} />
								Edit
							</h3>
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
				</div>

				<h2>View Achievements per Course</h2>
				{achievements.map((ach: any, i: any) => {
					return (
						<Collapsible trigger={`${ach.name}`} key={i}>
							<p>Personal Best: {ach.allTimeRecord}</p>
							<Collapsible trigger="Course Stroke Records">
								{ach.allTimeStrokes.map((stroke: any, idx: any) => {
									return (
										<h3>
											Hole {idx + 1}: {stroke}
										</h3>
									);
								})}
							</Collapsible>
							<br />
							<SmallAchievementCard {...ach.ace} />
							<SmallAchievementCard {...ach.firstTee} />
							<SmallAchievementCard {...ach.personalBest1} />
							<SmallAchievementCard {...ach.personalBest2} />
							<SmallAchievementCard {...ach.personalBest3} />
							{/* <SmallAchievementCard {...ach.victory} /> */}
							<SmallAchievementCard {...ach.averageJuniorPar} />
							<SmallAchievementCard {...ach.averagePar} />
							<SmallAchievementCard {...ach.par1} />
							<SmallAchievementCard {...ach.par2} />
							<SmallAchievementCard {...ach.par3} />
							<SmallAchievementCard {...ach.par4} />
							<SmallAchievementCard {...ach.par5} />
							<SmallAchievementCard {...ach.par6} />
							<SmallAchievementCard {...ach.par7} />
							<SmallAchievementCard {...ach.par8} />
							<SmallAchievementCard {...ach.par9} />
							<SmallAchievementCard {...ach.birdie1} />
							<SmallAchievementCard {...ach.birdie2} />
							<SmallAchievementCard {...ach.birdie3} />
							<SmallAchievementCard {...ach.birdie4} />
							<SmallAchievementCard {...ach.birdie5} />
							<SmallAchievementCard {...ach.birdie6} />
							<SmallAchievementCard {...ach.birdie7} />
							<SmallAchievementCard {...ach.birdie8} />
							<SmallAchievementCard {...ach.birdie9} />
						</Collapsible>
					);
				})}
				<h2>Review Previous Game Scores</h2>
				{records.map((rec: any, i) => {
					return (
						<SmallRecordCard
							course={rec.course}
							gamePK={rec.gamePK}
							handleClick={() => {
								localStorage.setItem('activeRecord', JSON.stringify(rec));
								router.push(`/stakes/stake/${rec.gamePK}_${rec.gameSK}`);
							}}
						/>
					);
				})}
			</main>
		</React.Fragment>
	);
}

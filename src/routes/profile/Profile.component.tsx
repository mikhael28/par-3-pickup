/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'components/image';
import Icon from 'components/icon';
import Placeholder from 'components/placeholder';
import { useUser } from 'hooks/user';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import RecordCard from 'components/record-card';
import ProfileModal from './ProfileModal';
import styles from './Profile.module.scss';

const { profile, profileMain, profilePicture, profileContent, followersIcon, followersPlaceholder, about } = styles;

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile(): JSX.Element {
	const { name, bio, avatar_url, followers } = useUser();
	const [ newName, setName ] = useState<string>('Panther Forest');
	const [ newBio, setBio ] = useState<string>('New to the tour.');
	const [ summary, setSummary ] = useState<string>('');
	const [ newPhone, setPhone ] = useState<string>('6508687480');
	const [ refresh, setRefresh ] = useState<boolean>(false);
	const [ modal, setModal ] = useState<boolean>(false);
	const [ records, setRecords ] = useState([]);
	const router = useRouter();

	useEffect(() => {
		let recs = localStorage.getItem('records');
		if (recs !== null) {
			setRecords(JSON.parse(recs));
		}
	}, []);

	useEffect(() => {
		let localName = localStorage.getItem('name');
		let localBio = localStorage.getItem('bio');
		let localSummary = localStorage.getItem('localSummary');
		let localPhone = localStorage.getItem('phone');

		if (localName === null || localBio === null || localPhone === null) {
			setRefresh(!refresh);
		} else {
			setName(localName);
			setBio(localBio);
			setSummary(localSummary);
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
					{/* <Image
                      isPlaceholder={ !avatar_url }
                      src={ avatar_url }
                      className={ profilePicture }
                    /> */}
					<div className={profileContent}>
						<h1>
							<Placeholder content={newName} length="short" />
						</h1>
						<p>
							<Placeholder content={newPhone} length="short" />
						</p>
						<p>
							<Placeholder content={newBio} length="long" />
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
						<h3 style={{ cursor: 'pointer' }} onClick={() => setModal(true)}>
							<Icon asset="People" className={followersIcon} />
							Edit
						</h3>
					</div>
				</div>
				<br />
				{records.map((rec, i) => {
					return (
						<div key={i}>
							<RecordCard
								players={rec.players}
								course={rec.course}
								handleClick={() => {
									localStorage.setItem('activeRecord', JSON.stringify(rec));
									router.push(`/stakes/stake/${rec.PK}_${rec.SK}`);
								}}
								picture={rec.picture}
							/>
						</div>
					);
				})}
				{/* <div className={about}>
					<h2>About</h2>
					<p>
						{summary}
					</p>
				</div> */}
				<Dialog
					style={{
						margin: 'auto',
						width: '50vw'
					}}
					open={modal}
					TransitionComponent={Transition}
					keepMounted
					// disableEscapeKeyDown={true}
					// fullScreen={true}
					// fullWidth={true}
					// disableBackdropClick={true}
					// hideBackdrop={false}
					aria-labelledby="edit-profile"
					aria-describedby="Edit the profile"
				>
					<ProfileModal
						closeModal={() => setModal(false)}
						name={newName}
						bio={newBio}
						phone={newPhone}
						setName={setName}
						setBio={setBio}
						setPhone={setPhone}
					/>
				</Dialog>
			</main>
		</React.Fragment>
	);
}

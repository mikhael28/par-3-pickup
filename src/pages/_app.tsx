/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'contexts/theme';
import Header from 'components/header';
import Footer from 'components/footer';
import NotificationList from 'components/notificationList';
import store from 'stores';
import { Provider } from 'react-redux';
import { statusBarStyle } from 'config';
import { AppProps } from 'next/app';
import { API } from '@aws-amplify/api';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ProfileModal from 'routes/profile/ProfileModal';
import 'styles/main.scss';
import 'styles/index.css';

const Transition = React.forwardRef<unknown, TransitionProps>((props: any, ref: any) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

function handleAchievement(acType: string, acName: string) {
	// let myPreviousAchievements = localStorage.getItem('myAchievements');
	// let prevAchieveJSON;
	// if (myPreviousAchievements !== null) {
	// 	prevAchieveJSON = JSON.parse(myPreviousAchievements);
	// } else {
	// 	prevAchieveJSON = courseGoals;
	// }
	// // this should log out the achievement
	// console.log(courseGoals[acName]);
	// prevAchieveJSON[acName].completed = true;
	// localStorage.setItem('myAchievements', JSON.stringify(prevAchieveJSON));
	// network request goes before the localStorage
	// now we need to add the total amount of the score to the profile, and save the profile
	// prevAchieveJSON[acName].value
	// now we need to check for achievements compared to records
}

// we would have a courseGoals object for each course, I imagine.

// would need to have comprehensive logic to update allTimeStrokes count

API.configure({
	endpoints: [
		{
			name: 'matches',
			endpoint: 'https://oti30m47rd.execute-api.us-east-1.amazonaws.com/dev',
			region: 'us-east-1'
		},
		{
			name: 'util',
			endpoint: 'https://a4ywglomug.execute-api.us-east-1.amazonaws.com/prod',
			region: 'us-east-1'
		}
	]
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [ code, setCode ] = useState<string>('');
	const [ errorMessage, setMessage ] = useState<string>('');
	const [ newName, setName ] = useState<string>('Panther Forest');
	const [ newBio, setBio ] = useState<string>('New to the tour.');
	const [ newPhone, setPhone ] = useState<string>('6508687480');
	const [ modal, setModal ] = useState<boolean>(false);
	const [ authenticated, setAuthenticated ] = useState<boolean>(false);

	const [ golfer, setGolfer ] = useState({
		fName: '',
		lName: '',
		profilePicture:
			'https://s.yimg.com/ny/api/res/1.2/d6CkB0jKWvG8XAV8G2Nvdw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2021-05/b381af10-bdab-11eb-bbcb-41db0ef49265',
		records: []
	});

	function handleSuccess(data: any) {
		setCode(data.code);
		setMessage('');
	}

	function handleFailure(error: any) {
		setCode('');
		setMessage(error.errorMessage);
	}

	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register(process.env.serviceWorkerUrl as string, { scope: '/' });
		}

		let storedAuth = localStorage.getItem('authenticated');
		console.log('Logged in? ', storedAuth);
		if (storedAuth !== null) {
			// get profile data if it's not already there
			let profileData = localStorage.getItem('golfer');
			if (profileData !== null) {
				console.log(JSON.parse(profileData));
				setGolfer(JSON.parse(profileData));
			}
			// @TODO: add async background profile grab to have latest data
		} else {
			setAuthenticated(false);
			setModal(true);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0, viewport-fit=cover"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content={statusBarStyle} />
				<link rel="apple-touch-startup-image" sizes="196x196" href="/android-chrome-196x196.png" />
				<link rel="apple-touch-icon" sizes="196x196" href="/android-chrome-196x196.png" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<Provider store={store}>
				<ThemeProvider>
					<NotificationList />
					<Header />
					<Component
						{...pageProps}
						handleSuccess={handleSuccess}
						authenticated={authenticated}
						setAuthenticated={setAuthenticated}
						modal={modal}
						setModal={setModal}
						golfer={golfer}
						setGolfer={setGolfer}
					/>
					<Footer />
					<Dialog
						style={{}}
						open={modal}
						TransitionComponent={Transition}
						keepMounted
						disableEscapeKeyDown={false}
						// fullScreen={true}
						// fullWidth={true}
						disableBackdropClick={false}
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
							authenticated={authenticated}
							setAuthenticated={setAuthenticated}
							golfer={golfer}
							setGolfer={setGolfer}
						/>
					</Dialog>
				</ThemeProvider>
			</Provider>
		</React.Fragment>
	);
}

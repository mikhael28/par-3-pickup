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
import 'styles/main.scss';
import 'styles/index.css';

API.configure({
	endpoints: [
		{
			name: 'matches',
			endpoint: 'https://oti30m47rd.execute-api.us-east-1.amazonaws.com/dev',
			region: 'us-east-1'
		}
	]
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [ code, setCode ] = useState<string>('');
	const [ errorMessage, setMessage ] = useState<string>('');

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
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</Provider>
		</React.Fragment>
	);
}

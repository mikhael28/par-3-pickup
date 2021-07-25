import React from 'react';
import Image from 'components/image';
import styles from './Landing.module.scss';

const { wrapper, landing, landingText, landingImage, landingNavigationWrapper } = styles;

export default function Landing(): JSX.Element {
	return (
		<div className={wrapper}>
			<div className={landing}>
				<div className={landingText}>
					<h1>Par 3 Pickup</h1>
					<li>Earn GolfCoins (GC) for your achievements on the links, show off your Golfer Score (GS).</li>
					<li>Bet those coins on skins with your friends, with our multiplayer scorecard.</li>
					<li>Track your all-time-best score, hole-by-hole, on each par 3 course in the Seattle area.</li>
				</div>
				<div className={landingNavigationWrapper}>
					<a href="https://github.com/mikhael28/seattle-par-3" target="_blank" rel="noreferrer">
						View source code on GitHub
					</a>
					<p>Available under GNU General Public License, Version 2 Only</p>
				</div>
				<Image
					className={landingImage}
					src="/android-chrome-384x384.png"
					alt="Par 3 Pickup Social Golf"
					width="400px"
					height="340px"
				/>
			</div>
		</div>
	);
}

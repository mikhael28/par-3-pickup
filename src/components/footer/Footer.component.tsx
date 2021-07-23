import React from 'react';
import styles from './Footer.module.scss';

const { footer } = styles;

export default function Footer(): JSX.Element {
	return (
		<footer className={footer}>
			<p>© Par 3 Pickup</p>
			<p>
				Source Code on{' '}
				<a
					href="https://github.com/mikhael28/seattle-par-3"
					target="_blank"
					rel="noreferrer"
					style={{ cursor: 'pointer' }}
				>
					GitHub
				</a>
			</p>
		</footer>
	);
}

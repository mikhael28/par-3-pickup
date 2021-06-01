/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { injectClassNames } from 'utils/css';
import styles from './Items.module.scss';

const { items, active } = styles;

const links = [
	{ name: 'Play', url: '/', alias: [] },
	// { name: 'Pages', url: '/pages', alias: ['/[page]'] },
	{ name: 'Records', url: '/stakes', alias: [] }
	// { name: 'Profile', url: '/profile', alias: [] }
];

export default function Items(): JSX.Element {
	const { pathname } = useRouter();

	return (
		<ul className={items}>
			{links.map(({ name, url, alias }) => (
				<li
					key={name}
					// eslint-disable-next-line react/jsx-indent-props
					className={injectClassNames([
						active,
						pathname === url
						// || alias.includes(pathname)
					])}
				>
					<Link href={url}>{name}</Link>
				</li>
			))}
		</ul>
	);
}

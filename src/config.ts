/* eslint-disable indent */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/*
 * Theme color values.
 *
 * These values are used only in the theme-color meta tag,
 * changing these values will not change any css.
 */
export const theme = {
	light: '#fff',
	dark: '#2c2c2c'
};

/*
 * IOS Status bar value.
 * Define which status bar style to use.
 *
 * You can read more about these here,
 * under the apple-mobile-web-app-status-bar-style:
 * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
 */
export const statusBarStyle = 'black-translucent';

export const simpleCourseData = [
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	},
	{
		par: 3,
		longestDrive: null,
		winner: null,
		score: 5
	}
];

export interface Game {
	id: string;
	course: string;
	perHoleWager: number;
	ldWager: number;
	players: any;
	holes: any;
}

export interface Golfer {
	fName: string;
	lName: string;
	handicap: number;
	id: number;
	picture: string;
	holes: any;
}

export interface Course {
	id: string;
	name: string;
	codeName: string;
	par3: boolean;
	eighteen: boolean;
	street: string;
	city: string;
	zip: string;
	par: number;
	putting: number;
	picture: string;
	holes: any;
}

export const courses = [
	{
		id: '1',
		name: 'Jackson Park',
		codeName: 'jackson',
		par3: true,
		eighteen: true,
		street: '',
		city: 'Seattle',
		zip: '',
		par: 27,
		putting: 0,
		picture: 'http://www.seattle.gov/Images/Council/Logos/City-of-Seattle-Logo_Color-on-Transparent.png',
		holes: simpleCourseData
	},
	{
		id: '2',
		name: 'Willow Run',
		codeName: 'willow',
		par3: true,
		eighteen: true,
		street: '',
		city: 'Redmond',
		zip: '',
		par: 27,
		putting: 18,
		picture: 'https://i2.wp.com/innovationtriangle.us/wp-content/uploads/2018/04/Logo-4.png?resize=500%2C500&ssl=1',
		holes: simpleCourseData
	},
	{
		id: '3',
		name: 'Crossroads',
		codeName: 'crossroads',
		par3: true,
		eighteen: true,
		street: '',
		city: 'Bellevue',
		zip: '',
		par: 27,
		putting: 0,
		picture: 'https://d3926qxcw0e1bh.cloudfront.net/pages_avatar_photos/64/0a/640ab7afec2c9468e9512fefbaca1223.jpg',
		holes: simpleCourseData
	},
	{
		id: '4',
		name: 'Green Lake',
		codeName: 'greenlake',
		par3: true,
		eighteen: false,
		street: '',
		city: 'Seattle',
		zip: '',
		par: 27,
		putting: 0,
		picture: 'http://www.seattle.gov/Images/Council/Logos/City-of-Seattle-Logo_Color-on-Transparent.png',
		holes: simpleCourseData
	},
	{
		id: '5',
		name: 'Jefferson Park',
		codeName: 'jefferson',
		par3: true,
		eighteen: true,
		street: '',
		city: 'Seattle',
		zip: '',
		par: 27,
		putting: 0,
		picture: 'http://www.seattle.gov/Images/Council/Logos/City-of-Seattle-Logo_Color-on-Transparent.png',
		holes: simpleCourseData
	},
	{
		id: '6',
		name: 'Interbay',
		codeName: 'interbay',
		par3: true,
		eighteen: false,
		street: '',
		city: 'Seattle',
		zip: '',
		par: 27,
		putting: 0,
		picture: 'https://cdn.cybergolf.com/images/2285/PremierGC_interbay_2021logo_r1.png',
		holes: simpleCourseData
	}
];

export const golfers = [
	{
		fName: 'Misha',
		lName: 'Da 56',
		handicap: 36,
		id: 1,
		holes: simpleCourseData,
		picture: 'https://avatars.githubusercontent.com/u/15205259?v=4',
		eth: '0x31C2f97f2c755D44Bcb9Ab07321155e5F7F0Df83'
	},
	{
		fName: 'Derek',
		lName: 'Silverhand',
		handicap: 36,
		id: 2,
		holes: simpleCourseData,
		picture: 'https://avatars.githubusercontent.com/u/59941613?v=4',
		eth: '0xF84c9a3eb77d6d51CEd0A5251bAEdEDF6F76921b'
	},
	{
		fName: 'Tiger',
		lName: 'Woods',
		handicap: 0,
		id: 3,
		holes: simpleCourseData,
		picture: 'https://static.onecms.io/wp-content/uploads/sites/20/-0001/11/30/tiger-woods-2000.jpg',
		eth: '0xF84c9a3eb77d6d51CEd0A5251bAEdEDF6F76921b'
	},
	{
		fName: 'Arnold',
		lName: 'Palmer',
		handicap: 36,
		id: 4,
		holes: simpleCourseData,
		picture: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/YN3ArnoldPalmer.jpg',
		eth: '0xF84c9a3eb77d6d51CEd0A5251bAEdEDF6F76921b'
	}
];

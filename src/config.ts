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

export const courses = [
    {
        name: 'Jackson Park',
        codeName: 'jackson',
        par3: true,
        eighteen: true,
        street: '',
        city: 'Seattle',
        zip: '',
        par: 27,
        putting: 0,
        picture: 'http://www.seattle.gov/Images/Council/Logos/City-of-Seattle-Logo_Color-on-Transparent.png'
    },
    {
        name: 'Willow Run',
        codeName: 'willow',
        par3: true,
        eighteen: true,
        street: '',
        city: 'Redmond',
        zip: '',
        par: 27,
        putting: 18,
        picture: 'https://i2.wp.com/innovationtriangle.us/wp-content/uploads/2018/04/Logo-4.png?resize=500%2C500&ssl=1'
    },
    {
        name: 'Crossroads',
        codeName: 'crossroads',
        par3: true,
        eighteen: true,
        street: '',
        city: 'Bellevue',
        zip: '',
        par: 27,
        putting: 0,
        picture: 'https://d3926qxcw0e1bh.cloudfront.net/pages_avatar_photos/64/0a/640ab7afec2c9468e9512fefbaca1223.jpg'
    }
]

export const golfers = [
    {
        fName: 'Misha',
        lName: 'Da 56',
        handicap: 36,
        id: 1,
    },
    {
        fName: 'Derek',
        lName: 'Silverhand',
        handicap: 36,
        id: 2
    }
]

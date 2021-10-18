/* eslint-disable indent */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/*
 * Theme color values.
 *
 * These values are used only in the theme-color meta tag,
 * changing these values will not change any css.
 */

// const cedar = require('assets/cedars.png');
// const greenlake = require('assets/greenlake.jpg');

export const theme = {
  light: "#fff",
  dark: "#2c2c2c",
};

/*
 * IOS Status bar value.
 * Define which status bar style to use.
 *
 * You can read more about these here,
 * under the apple-mobile-web-app-status-bar-style:
 * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
 */
export const statusBarStyle = "black-translucent";

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
  // handicap: number;
  // id: number;
  profilePicture: string;
  // holes: any;
  SK: string;
  achievements: any;
  LSI1: string;
  PK: string;
  // access_token: string;
  bio: string;
  phone: string;
  records: any;
  xp: number;
  // eth: string;
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

export interface Module {
  id: string;
  name: string;
  description: string;
  steps: Step;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  link: string;
  picture: string;
}

export const products = [
  {
    name: "Professional Ball Feeder / Shag Bag",
    description:
      "Work on your game with proper golf balls. Going to the range is fine and all, but you don't get the experience of hitting fully weighted, regulation balls. This new-age 'shag bag' carries up to 35 balls, so you can either wile out on the chipping green, or play 35 balls on each hole. Just make sure it's a sleepy day, with no one else on the course with you.",
    maker: "Callaway",
    price: "49.99",
    salePrice: "39.99",
    amazon:
      "https://www.amazon.com/gp/product/B0083A2YT4/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1",
    picture:
      "https://m.media-amazon.com/images/S/aplus-media/vc/34641dc7-5bc7-41d2-9736-4e76a13356e3.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    youtube: "https://www.youtube.com/watch?v=x0Jl27XZPxY",
  },
  {
    name: "Home Putting Green",
    description:
      "9 feet long, with 3 holes & a hazard behind the cup to catch errant balls - what more can you ask for, at $30 dollars? The only way that you are going to break 100 is by avoiding triple bogeys, and learning to putt.",
    maker: "Put-A-About",
    price: "49.99",
    salePrice: "29.99",
    amazon:
      "https://www.amazon.com/gp/product/B001B6CH0S/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1",
    picture:
      "https://i5.walmartimages.com/asr/449b2be0-091d-481a-8009-2fcea7a9a3b3.05729ec11f27cbd0e66a61bb7e02068b.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
    youtube: "https://www.youtube.com/watch?v=x0Jl27XZPxY",
  },
];

export const lessons = [
  {
    name: "The Grip",
    description: "The grip",
    picture:
      "https://golfworkoutprogram.com/wp-content/uploads/2017/08/IMG_0704-943x600.jpg",
    modules: [
      {
        id: "first",
        name: "Fundamentals",
        description:
          "The most important thing in golf is to have a good grip. When Tiger won his first Masters, he was in charge of hosting the next year's banquet. After hubbubing with the greats, reporters asked him 'what did you talk about with these all-time greats?'. Tiger responded 'all they wanted to do was talk about how they grip their clubs'. ",
        steps: [
          {
            id: 1,
            title: "Left Hand",
            description: "yo",
            link: "na",
            picture:
              "https://golfinsideruk.com/wp-content/uploads/2018/08/Proper-golf-grip.jpg",
          },
          {
            id: 2,
            title: "Right Hand",
            description: "yo",
            link: "na",
            picture: "https://i.ytimg.com/vi/qxDD8Dfthaw/maxresdefault.jpg",
          },
          {
            id: 3,
            title: "Finger grips",
            description: "yo",
            link: "na",
            picture:
              "https://free-online-golf-tips.com/wp-content/uploads/proper-golf-grip-types-overlap-interlock-baseball.png",
          },
        ],
      },
    ],
  },
  {
    name: "The Swing",
    description: "The swing",
    picture:
      "https://www.the-golf-experience.com/images/Balance-Tempo-Timing.png",
    modules: [],
  },
  {
    name: "The Stance",
    description: "The stance",
    picture:
      "https://thegratefulgolfer.files.wordpress.com/2015/04/ball-position-within-golf-stance1.jpg?w=640",
    modules: [],
  },
  {
    name: "The Clubs",
    description: "The clubs",
    picture:
      "https://www.tripsavvy.com/thmb/PId4H83rbL4JrooYvcti7sr9oYY=/1500x1000/filters:fill(auto,1)/meet-the-golf-clubs-1560507_FINAL1-96bcd811ce0d4863a05afca4096478c9.png",
    modules: [],
  },
  {
    name: "The Training",
    description: "The training",
    picture:
      "https://sportsperformanceadvantage.com/wp-content/uploads/2019/11/shutterstock_116852848-800x400.jpg",
    modules: [],
  },
];

export const simpleCourseData = [
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
  {
    par: 3,
    longestDrive: null,
    winner: null,
    score: 5,
  },
];

export const etiquette = [
  'All plays off the first tee only. Order of play is "first come, first served".',
  "Please play in groups of four whenever possible to improve pace of play.",
  "Play only one ball, unless you are either a) by yourself or b) no one is behind you.",
  "For the enjoyment and benefit of all, please keep up with the group in front of you.",
  "If need be, please allow faster players to play through.",
  "Please replace your divocts and repair your ball marks at all times.",
  "Please keep pull carts at least 15 feet from the greens.",
  "Each player should have their own set of clubs, at a minimum one putter and one other club.",
]

export const courses = [
  {
    id: "1",
    name: "Jackson Park",
    codeName: "jackson",
    par3: true,
    eighteen: true,
    street: "1000 NE 125th Street",
    city: "Seattle",
    zip: "98125",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(206) 363-4747',
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwNHVvgIzQ0fmnlQW7G71DAA2txyVQKe50A&usqp=CAU",
    holes: simpleCourseData,
    distances: [105, 81, 78, 136, 117, 138, 142, 81, 154],
    handicap: [7, 8, 9, 1, 5, 3, 2, 6, 4],
    junior: [3, 3, 3, 4, 3, 4, 4, 3, 4],
    
  },
  {
    id: "2",
    name: "Willows Run",
    codeName: "willow",
    par3: true,
    eighteen: true,
    street: "10402 Willows Road NE",
    city: "Redmond",
    zip: "98052",
    state: 'WA',
    par: 27,
    putting: 18,
    phone: '(425) 885-5476',
    photo: '',
    picture:
      "https://i2.wp.com/innovationtriangle.us/wp-content/uploads/2018/04/Logo-4.png?resize=500%2C500&ssl=1",
    holes: simpleCourseData,
    distances: [86, 125, 95, 147, 98, 158, 170, 127, 101],
    handicap: [9, 4, 8, 2, 7, 3, 1, 5, 6],
    junior: [3, 3, 3, 4, 3, 4, 4, 4, 3],
    

  },
  {
    id: "3",
    name: "Crossroads",
    codeName: "crossroads",
    par3: true,
    eighteen: true,
    street: "15801 NE 15th Street",
    city: "Bellevue",
    zip: "98008",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(425) 452-4873',
    picture:
      "https://d3926qxcw0e1bh.cloudfront.net/pages_avatar_photos/64/0a/640ab7afec2c9468e9512fefbaca1223.jpg",
    holes: simpleCourseData,
    distances: [93, 107, 98, 64, 69, 99, 78, 87, 102],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    

  },
  {
    id: "4",
    name: "Green Lake",
    codeName: "greenlake",
    par3: true,
    eighteen: false,
    street: "5701 East Greenlake Way N.",
    city: "Seattle",
    zip: "98103",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(206) 632-2280',
    picture:
      "http://www.seattle.gov/Images/Council/Logos/City-of-Seattle-Logo_Color-on-Transparent.png",
    holes: simpleCourseData,
    distances: [75, 60, 65, 80, 115, 80, 80, 75, 75],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    

  },
  {
    id: "5",
    name: "Jefferson Park",
    codeName: "jefferson",
    par3: true,
    eighteen: true,
    street: "4101 Beacon Ave S",
    city: "Seattle",
    zip: "98108",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(206) 762-4513',
    picture:
      "https://logos.bluegolf.com/jeffersonparkgc/profile.png",
    holes: simpleCourseData,
    distances: [153, 85, 43, 71, 128, 132, 140, 125, 150],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [2, 8, 3, 9, 6, 4, 7, 5, 1],
    

  },
  {
    id: "6",
    name: "Interbay",
    codeName: "interbay",
    par3: true,
    eighteen: false,
    street: "2501 15th Avenue West",
    city: "Seattle",
    zip: "98119",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(206) 285-2200',
    picture:
      "https://cdn.cybergolf.com/images/2285/PremierGC_interbay_2021logo_r1.png",
    holes: simpleCourseData,
    distances: [290, 150, 100, 108, 130, 175, 172, 111, 130],
    handicap: [2, 6, 9, 8, 4, 1, 3, 7, 5],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    
  },
  {
    id: "7",
    name: "Battle Creek",
    codeName: "battle",
    par3: true,
    eighteen: false,
    street: "6006 Meridian Ave N",
    city: "Tulalip",
    zip: "98271",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(360) 659-7931',
    picture:
      "https://images.squarespace-cdn.com/content/v1/57646734414fb55ecccf62e7/dba4dea9-ec35-47d3-ab06-e7fc4c306faa/BC+logo+trees+fot+ts.png?format=1500w",
    holes: simpleCourseData,
    distances: [78, 83, 130, 102, 102, 196, 106, 108, 150],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "8",
    name: "Highlands",
    codeName: "highlands",
    par3: true,
    eighteen: false,
    street: "1400 N Highlands Pkwy",
    city: "Tacoma",
    zip: "98406",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: 'https://www.highlandsgolf.net/wp-content/uploads/sites/3485/2014/11/course.jpg',
    phone: '(253) 759-3622',
    picture:
      "https://i.ytimg.com/vi/XwjMUu-Uwrg/maxresdefault.jpg",
    holes: simpleCourseData,
    distances: [100, 130, 170, 190, 110, 112, 180, 100, 135],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "9",
    name: "High Cedars",
    codeName: "cedars",
    par3: true,
    eighteen: false,
    street: "14604 149th St. Court East",
    city: "Orting",
    zip: "98360",
    par: 27,
    state: 'WA',
    putting: 0,
    photo: '',
    phone: '(360) 893-3171',
    picture:
      "https://highcedars.com/wp-content/uploads/2014/12/high-cedars-logo.png",
    holes: simpleCourseData,
    distances: [90, 194, 120, 160, 280, 134, 90, 295, 155],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

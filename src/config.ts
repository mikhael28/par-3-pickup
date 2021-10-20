/* eslint-disable indent */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/*
 * Theme color values.
 *
 * These values are used only in the theme-color meta tag,
 * changing these values will not change any css.
 */

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
  state: string;
  zip: string;
  par: number;
  putting: number;
  photo: any;
  phone: string;
  picture: string;
  holes: any;
  distances: any;
  handicap: any;
  junior: any;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  steps: Step;
}

export interface Step {
  content: string;
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
    name: "Grip & Swing",
    description:  "The most important thing in golf is to have a good grip. When Tiger won his first Masters, he was in charge of hosting the next year's banquet. After hubbubing with the greats, reporters asked him 'what did you talk about with these all-time greats?'. Tiger responded 'all they wanted to do was talk about how they grip their clubs'. ",
    picture:
      "https://golfworkoutprogram.com/wp-content/uploads/2017/08/IMG_0704-943x600.jpg",

        steps: [
          {
            content: "Both V's should point to your right shoulder. Reverse if left-handed.",
            link: "na",
            picture:
              "https://golfinsideruk.com/wp-content/uploads/2018/08/Proper-golf-grip.jpg",
          },
          {
            content: "The left hand's three bottom fingers must maintain a firm, but not suffocating, grip throughout the swing.",
            link: "na",
            picture: "https://i.ytimg.com/vi/qxDD8Dfthaw/maxresdefault.jpg",
          },
          {
            content: "Keep your right hand's grip relaxed.",
            link: "na",
            picture:
              "https://free-online-golf-tips.com/wp-content/uploads/proper-golf-grip-types-overlap-interlock-baseball.png",
          },
          {
            content: "During the swing, always extend your left arm fully. Keep it firm throughout the swing. Pull your left knee inwards.",
            link: "na",
            picture:
              "https://free-online-golf-tips.com/wp-content/uploads/proper-golf-grip-types-overlap-interlock-baseball.png",
          },
          {
            content: "Turn your hips with swing at all times, except when chipping or pitching onto the green. Including bunker shots.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your torso balanced, and stand mostly upright. Bend your knees slightly, but do not stoop.",
            link: "na",
            picture:
              "",
          },
          {
            content: "During the swing, don't stretch out your arms to reach the ball. Rather, inch closer or further away from the ball and rely on the length of your club.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "The Drive",
        description: "If you are just starting in golf, you should probably work on your short game first. After improving on that front, you will begin to appreciate the important of a good drive or wood on the fairway.",
        picture:
          "https://www.tripsavvy.com/thmb/PId4H83rbL4JrooYvcti7sr9oYY=/1500x1000/filters:fill(auto,1)/meet-the-golf-clubs-1560507_FINAL1-96bcd811ce0d4863a05afca4096478c9.png",
        steps: [
          {
            content: "Keep the ball almost aligned with your left heel, yet slightly inward.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Have a somewhat closed stance, with more weight on your right foot.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your hands positioned behind the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Align your body a little to the right of the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Ensure a snug grip with your left-hand.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Make sure to relax - take smooth inhaling breaths.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Swing with tempo rhythm - try to develop a consistent swing at the range. ",
            link: "na",
            picture:
              "",
          },
          {
            content: "Extend your firm left hand, and turn your hips as you swing.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Fairway Woods",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Take a square stance. If slicing, take a closed stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep the ball a little in from your left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Put more weight on the left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Align your body a little to the right of target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Check your grip, relax, extend your left arm while turning your hip with a good tempo swing.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Long Irons",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Align body to the right of the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Take a square stance with the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Put more weight on your left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Sand Traps",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Keep an open club face.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Use an open stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Ball back of left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep more weight on the left.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Aim to the left of your target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Plant both feet firmly.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Hit two inches behind the ball with full follow-through.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Purely use your arm and your hand - no body movement pre-impact.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Pitch Shots",
        description: "A two-lever movement that includes the trunk and wrist - for getting on the green, a bit further away than a chip shot.",
        picture:
          "",
        steps: [
          {
            content: "Use a 9 iron, or wedge.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep an open stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep weight on left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep ball in front of left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "No body movement, keep your feet close.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Hit the ball with a cocked wrist shot. Crisp shot.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Over trees, play ball more off of left heel. Move weight more to right side.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Chip Shots",
        description: "A one-lever movement when you are very close to the green. Use a 5-6-7 iron for straight punches. Use a wedge for close range chips onto the green from edge of the green.",
        picture:
          "",
        steps: [
          {
            content: "Take a square stance, feet close together.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep ball in the middle.",
            link: "na",
            picture:
              "",
          },
          {
            content: "No body movement.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep weight on the left side, hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "On a good lie - stiffen your wrist to punch with more tempo.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Uphill Lies",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Aim to the right of the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep a closed stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Maintain weight more on the left throughout the swing.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep ball about 3 inches off the left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Uphill Slope Lie",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Keep somewhat of an open club face.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Use an open stance and pick club to clear top of the mount.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Check grip extension of left arm, turn hips.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Downhill Lies",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Aim to the left of the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Use one club shorter.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep a medium open stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep ball 4 inches off left heel, weight on left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Check for firm grip, extension of left arm.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Turn hip as you swing with an even tempo.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Sidehill Lies",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "If ball is below feet level, aim to the left of the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Use one club longer.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep an open stance.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep ball 3-4 inches off left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Weight on left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "If ball is higher than feet level, aim to right of target. Keep closed stance, hands in front of the ball, weight on the left side. Ball 2 inches from left heel.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Check grip, extension of left arm and turn hip as you swing.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Putting",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Always try to hit the ball far enough. Better to go too far, than too short.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep blade of the putter square.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Do not move your head.",
            link: "na",
            picture:
              "",
          },
          {
            content: "The palm of your hand goes directly to the target.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your head directly over the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Always keep your elbows close to your body.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Use your shoulders, not your rest for the swinging motion.",
            link: "na",
            picture:
              "",
          },
          {
            content: "For shorter putts, grip the putter lower on the shaft.",
            link: "na",
            picture:
              "",
          },

        ],
      },
      {
        name: "Problems",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "Slicing is when a golf ball curves dramatically in flight from left to right (for a right-handed golfer).",
            link: "na",
            picture:
              "",
          },
          {
            content: "Hooking is when a golf ball curves dramatically in flight from right to left (for a right-handed golfer).",
            link: "na",
            picture:
              "",
          },
          {
            content: "Pulling is when a shot that starts to the left of the target, and continues to go that way. ",
            link: "na",
            picture:
              "",
          },
          {
            content: "Shanking is when the ball hits the hosel of the club, the intersection fo the clubhead and the shaft. It will shoot right, and go a fraction of the distance it's supposed to.",
            link: "na",
            picture:
              "",
          },
          {
            content: "A sky shot (skying) occurs when the clubhead hits the ball near its bottom pole, which sends the ball high into the air but not much forward.",
            link: "na",
            picture:
              "",
          },
          {
            content: "A golf ball may pick up scuffs, or scratches, which could affect the flight path of the ball. First clean the ball, play it for a hole or two. It may not affect play, or it might and you should replace it.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Hitting the top of the ball, which has the ball staying fairly close to the ground after being struck. These shots can roll a long way, and are disastrous when pitching/hitting under 100 yards.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Troubleshooting",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "All problems are caused by faulty fundamentals.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Check for a correct grip, with hands in front of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep a firm left hand grip, at the top of the swing.",
            link: "na",
            picture:
              "",
          },
          {
            content: "The left arm should remain extended and not collapse on the swing.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Turn the hips, but do not sway.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Keep your head steady, and don't lift it up.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Stand upright, and slightly flex your knees.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Have the proper stance, with good torso balance and weight on the left side.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Good arms and hands follow-through.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Develop a consistant, smooth swing to use.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Do not bend or stoop excessively.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Do not reach out or stand too far away from the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Never worry about who is watching your shot. When you step up to hit, get in your zone.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Take a deep breath, relax and get rid of any tension you might have. Never rush a shot.",
            link: "na",
            picture:
              "",
          },
          {
            content: "Swing with good speed, tempo and rhythm.",
            link: "na",
            picture:
              "",
          },

        ],
      },
      {
        name: "Weather and Obstacles",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "If the wind is behind you, open the club face a little. Play the ball slightly more forward than normal.",
            link: "na",
            picture:
              "",
          },
          {
            content: "If the wind is blowing at you, close club face slightly.Play the ball further back than normal, and use 1 or 2 clubs longer than usual. Stiff wrist action helps.",
            link: "na",
            picture:
              "",
          },
          {
            content: "With crosswinds, use a less lofted club than usual. Hit your shots and aim to the side that wind is blowing from to correct the drift the ball will go in flight.",
            link: "na",
            picture:
              "",
          },
          {
            content: "On a wet ground, always hit the ball first - not the turf. Try to hit just below center of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "In high grass, swing in an upright vertical fashion with the club face open. Hit the ball before the turf, just below center.",
            link: "na",
            picture:
              "",
          },
          {
            content: "In the rough, check for a secure grup. Do not choke the club. A good firm grip will eliminate club twisting.",
            link: "na",
            picture:
              "",
          },
          {
            content: "In bunker shots on the fairway, if the ball is lying clean - hit with the same club you would use on the fairway. You must hit the ball first, not the sand. Hit below center line of the ball.",
            link: "na",
            picture:
              "",
          },
          {
            content: "On a bad lie in a bunker shot, use a 56 degree sand wedge to get back onto the green or the fairway.",
            link: "na",
            picture:
              "",
          },
        ],
      },
      {
        name: "Stances",
        description: "",
        picture:
          "",
        steps: [
          {
            content: "A closed stance has the right foot back 2-3 inches, with the right toe turned slightly to the right. Normally used for drivers and wood shots. Also used for uphill lies, and sidehill lies.",
            link: "na",
            picture:
              "",
          },
          {
            content: "In a square stance, the toes are parallel in line of the intended target. Normall used for fairway woods, long irons and chip shots.",
            link: "na",
            picture:
              "",
          },
          {
            content: "An open stance has the right food moved forward, with the left foot back and turned slightly left. Normally used for sand traps, pitch shots, slope lies, downhill and sidehill lies. ",
            link: "na",
            picture:
              "",
          },
          {
            content: "",
            link: "na",
            picture:
              "",
          },
          {
            content: "",
            link: "na",
            picture:
              "",
          },
        ],
      },
];

export const yardage = [
  {
    club: 'Driver',
    beginnerMen: 200,
    averageMen: 250,
    goodWomen: 190
  },
  {
    club: '3 Wood',
    beginnerMen: 185,
    averageMen: 225,
    goodWomen: 170
  },
  {
    club: '5 Wood',
    beginnerMen: 170,
    averageMen: 215,
    goodWomen: 155
  },
  {
    club: '18 Hybrid',
    beginnerMen: 165,
    averageMen: 195,
    goodWomen: 135
  },
  {
    club: '21 Hybrid',
    beginnerMen: 145,
    averageMen: 185,
    goodWomen: 125
  },
  {
    club: '24 Hybrid',
    beginnerMen: 135,
    averageMen: 175,
    goodWomen: 115
  },
  {
    club: '5 Iron',
    beginnerMen: 125,
    averageMen: 165,
    goodWomen: 105
  },
  {
    club: '6 Iron',
    beginnerMen: 115,
    averageMen: 155,
    goodWomen: 95
  },
  {
    club: '7 Iron',
    beginnerMen: 110,
    averageMen: 145,
    goodWomen: 85
  },
  {
    club: '8 Iron',
    beginnerMen: 105,
    averageMen: 135,
    goodWomen: 75
  },
  {
    club: '9 Iron',
    beginnerMen: 100,
    averageMen: 125,
    goodWomen: 65
  },
  {
    club: 'Pitching Wedge (48)',
    beginnerMen: 90,
    averageMen: 115,
    goodWomen: 55
  },
  {
    club: 'Gap Wedge (52)',
    beginnerMen: 75,
    averageMen: 100,
    goodWomen: 45
  },
  {
    club: 'Sand Wedge (56)',
    beginnerMen: 65,
    averageMen: 85,
    goodWomen: 35
  },
  {
    club: 'Lob Wedge (62)',
    beginnerMen: 50,
    averageMen: 70,
    goodWomen: 25
  },
  
]

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
    photo: "https://public-pareto-assets.s3.amazonaws.com/jackson.jpg",
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/willows.jpeg",
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
    photo: 'NA',
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/greenlake.jpg",
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/jefferson.jpg",
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/interbay.png",
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/battle.jpg",
    phone: '(360) 659-7931',
    picture:
      "https://images.squarespace-cdn.com/content/v1/57646734414fb55ecccf62e7/dba4dea9-ec35-47d3-ab06-e7fc4c306faa/BC+logo+trees+fot+ts.png?format=1500w",
    holes: simpleCourseData,
    distances: [100, 102, 137, 89, 103, 200, 134, 106, 142],
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/highland.jpeg",
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
    photo: "https://public-pareto-assets.s3.amazonaws.com/cedars.png",
    phone: '(360) 893-3171',
    picture:
      "https://highcedars.com/wp-content/uploads/2014/12/high-cedars-logo.png",
    holes: simpleCourseData,
    distances: [90, 194, 120, 160, 280, 134, 90, 295, 155],
    handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    junior: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

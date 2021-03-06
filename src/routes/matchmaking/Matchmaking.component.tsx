/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import PlayerCard from "components/player-card";
import { API } from "@aws-amplify/api";
import { useRouter } from "next/router";
import short from "short-uuid";
import { Course, Golfer, simpleCourseData } from "../../config";

export default function Matchmaking(props: any): JSX.Element {
  const router = useRouter();
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [multiplayer, setMultiplayer] = useState<boolean>(false);
  const [stake, setStake] = useState<string>("5");
  const [time, setTime] = useState<string>("PM");
  const [hour, setHour] = useState<string>("4");
  const [description, setDescription] = useState<string>("");
  const [minute, setMinute] = useState<string>("15");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [chosenGolfers, setGolfers] = useState<any[]>([]);
  const [golfers, setFetchedGolfers] = useState<Golfer[]>([]);
  const [course, setCourse] = useState<Course>({
    id: "",
    name: "",
    codeName: "",
    par3: true,
    eighteen: false,
    street: "",
    city: "",
    state: "",
    zip: "",
    par: 27,
    putting: 0,
    picture: "",
    photo: '',
    phone: '',
    holes: [],
    distances: [],
    handicap: [],
    junior: []
  });

  const courseGoals = {
    name: course.name,
    code: course.codeName,
    allTimeStrokes: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    allTimeRecord: 0,
    firstTee: {
      name: "First Tee!",
      value: 10,
      completed: false,
      description: "Completing your 9 holes on a course.",
    },
    personalBest1: {
      name: "Beat your personal best!",
      value: 10,
      completed: false,
      description:
        "Making progress is the most important thing - you just beat your personal best on this course.",
    },
    personalBest2: {
      name: "Beat your personal best again!",
      value: 10,
      completed: false,
      description:
        "Making progress is the most important thing - you just beat your personal best on this course twice over.",
    },
    personalBest3: {
      name: "Beat your personal best three times!",
      value: 10,
      completed: false,
      description:
        "Making progress is the most important thing - you just beat your personal best on this course three times over.",
    },
    victory: {
      name: "To the victor go the spoils",
      value: 10,
      completed: false,
      description: "Congratulations on beating an opponent on this course.",
    },
    averageJuniorPar: {
      name: "Average Junior Par (4)",
      value: 10,
      completed: false,
      description:
        "You got a score of 36 on a Par 3 course - you have great potential to improve your game!",
    },
    averagePar: {
      name: "Average Par (3)",
      value: 10,
      completed: false,
      description:
        "You got a score of 27 on a Par 3 course - the next stop for you might be the Tour.",
    },
    ace: {
      name: "Ace",
      value: 10,
      completed: false,
      description:
        "Wow, you got a hole in one! That is quite ridiculous, great job.",
    },
    par1: {
      name: "Hole 1 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par2: {
      name: "Hole 2 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par3: {
      name: "Hole 3 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par4: {
      name: "Hole 4 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par5: {
      name: "Hole 5 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par6: {
      name: "Hole 6 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par7: {
      name: "Hole 7 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par8: {
      name: "Hole 8 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    par9: {
      name: "Hole 9 Par",
      value: 10,
      completed: false,
      description: "Congratulations on earning par for this hole!",
    },
    birdie1: {
      name: "Hole 1 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie2: {
      name: "Hole 2 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie3: {
      name: "Hole 3 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie4: {
      name: "Hole 4 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie5: {
      name: "Hole 5 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie6: {
      name: "Hole 6 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie7: {
      name: "Hole 7 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie8: {
      name: "Hole 8 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
    birdie9: {
      name: "Hole 9 Birdie",
      value: 10,
      completed: false,
      description: "Congratulations on earning birdie for this hole!",
    },
  };

  useEffect(() => {
    // this is where we pull the course name from localStorage
    let activeCourse = localStorage.getItem("activeCourse");
    if (activeCourse !== null) {
      setCourse(JSON.parse(activeCourse));
    }
  }, []);

  useEffect(() => {
    // fetching list of golfers from the internetz
    fetchGolfers();
  }, []);

  async function fetchGolfers() {
    try {
      const golfrs = await API.get("matches", `/sp3/date/member`, {});
      setFetchedGolfers(golfrs);
    } catch (e) {}
  }

  function addGolfer(event: any) {
    let jsData = JSON.parse(event.target.value);
    // Adding default hole data
    let updatedGolfer = {
      ...jsData,
      holes: simpleCourseData,
    };

    let newGolfers = chosenGolfers.slice();
    newGolfers.push(updatedGolfer);
    setGolfers(newGolfers);
    if (newGolfers.length >= 1) {
      setDisabledButton(true);
    }
  }

  function handleStake(event: any) {
    setStake(event.target.value);
  }

  function handleMultiplayer(event: any) {
    setMultiplayer(!multiplayer);
    golfers.forEach((gfr) => {
      if (gfr.SK === props.golfer.SK) {
        setGolfers([{ ...gfr, holes: simpleCourseData }]);
      }
    });
  }

  // now, it's time to add the matchmaking, to add the players to the localStorage game, set the gambling amounts, and create.
  // from there, need to add the counters for the holes,
  // then need to mark 'complete' and have a screen to review.

  // Resume here

  async function startGame() {
    const you = {
      ...props.golfer,
      holes: simpleCourseData,
    };

    const newDate = new Date();

    let gameSK = short.generate();

    // achievements being added in

    let initialPlayerData;

    if (multiplayer === true) {
      initialPlayerData = chosenGolfers;
    } else {
      initialPlayerData = [you];
    }

    // the bug is that the activeGame props are not being updated with the new player achievements, though the player profiles are...
    // need to manage the async data flow or figure out another hack

    initialPlayerData.forEach(async (gr, id) => {
      let achievementCheck = false;

      gr.achievements.forEach((ach: any, i: any) => {
        if (ach.code === course.codeName) {
          achievementCheck = true;
        }
      });

      const recordBody = {
        course: course.name,
        courseCode: course.codeName,
        gamePK: `${
          newDate.getMonth() + 1
        }-${newDate.getDate()}-${newDate.getFullYear()}`,
        gameSK: gameSK,
      };

      let profileBody = { ...gr };
      profileBody.records.push(recordBody);
      if (achievementCheck === false) {
        profileBody.achievements.push(courseGoals);
      }

      if (profileBody.SK === props.golfer.SK) {
        props.setGolfer(profileBody);
        localStorage.setItem("golfer", JSON.stringify(profileBody));
      }

      console.log('Profile body created: ', profileBody)

      try {
        // updating the profile of the player with the new records object
        await API.put("matches", `/sp3`, {
          body: profileBody,
        });
      } catch (e) {
        console.error(e);
      }
    });


    const body = {
      course: course.name,
      perHoleWager: parseInt(stake, 10) || 0,
      ldWager: 5,
      players: initialPlayerData,
      holes: course.holes,
      PK: `${
        newDate.getMonth() + 1
      }-${newDate.getDate()}-${newDate.getFullYear()}`,
      SK: gameSK,
      LSI1: props.golfer.SK,
      time: `${hour}:${minute} ${time}`,
      hostPhone: "na",
      description: description,
      gameMode: gameMode,
    };

    try {
      localStorage.setItem("activeGame", JSON.stringify(body));
      await API.post("matches", "/sp3", { body });

      router.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  const minuteItems = [];
  for (let i = 0; i < 60; i++) {
    let iStr = i.toString();
    if (iStr.length < 2) {
      iStr = `0${iStr}`;
    }
    minuteItems.push(<option value={`${iStr}`}>{iStr}</option>);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Matchmaking</title>
      </Head>
      <main style={{ display: "flex", flexDirection: "column" }}>
        <h1>{course.name}</h1>
        <a href={`https://maps.google.com/?q=${course.street}+${course.city}+${course.state}+${course.zip}`} target="_blank" style={{fontSize: 14,  textDecorationLine: 'underline'}}>
          {course.street}<br />{course.city}, {course.state} {course.zip}
        </a>
        <br />
        <a href={`tel:${course.phone}`} style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>{course.phone}</a>
        <div>
          <h3>Hole Distances (yards)</h3>
          <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
          {course.distances.map((dist: number) => {
            return <li style={{margin: 12, fontWeight: 'bold'}}>{dist}</li>
          })}
          </ul>
        </div>

        <div className="flex">
          <h2>More than one player?</h2>
          <input type="checkbox" onChange={handleMultiplayer} />
        </div>
        {multiplayer ? (
          <div>
            <div>
              <h2>GolfCoin Skin Per Hole</h2>
              <input
                value={stake}
                type="number"
                onChange={handleStake}
                placeholder="5"
                disabled
              />
            </div>

            <h2>Set Tee Time</h2>
            <div className="flex">
              <div className="flex-down-select">
                <label htmlFor="hour">Hour</label>
                <select
                  name="hour"
                  id="hours"
                  onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                    setHour(ev.target.value)
                  }
                  value={hour}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="flex-down-select">
                <label htmlFor="minute">Minute</label>
                <select
                  name="minute"
                  id="minute"
                  value={minute}
                  onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                    setMinute(ev.target.value)
                  }
                >
                  {minuteItems}
                </select>
              </div>
              <div className="flex-down-select">
                <label htmlFor="time">AM/PM</label>
                <select
                  name="time"
                  id="time"
                  value={time}
                  onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                    setTime(ev.target.value)
                  }
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div>
              {chosenGolfers.length <= 1 ? (
                <span className="custom-dropdown">
                  <select onChange={addGolfer} className="custom-dropdown">
                    <option value="none">Choose Your Players</option>
                    {golfers.map((golfer, idx) => (
                      <option value={JSON.stringify(golfer)} key={idx}>
                        {golfer.fName}
                      </option>
                    ))}
                  </select>
                </span>
              ) : null}
            </div>

            <br />

            <div className="cards">
              {chosenGolfers.map((player, idx) => {
                return <PlayerCard {...player} key={idx} />;
              })}
            </div>
          </div>
        ) : null}

        <div className="flex-between"> 

        <div className="span-button" onClick={() => {
            props.setPictureLink(course.photo);
            props.setPictureModal(true);
        }}><span>View Course Map</span></div>

        {disabledButton === true ? (
          <div
            className="span-button"
            onClick={startGame}
          >
            <span>Start game</span>
          </div>
        ) : null}
        </div>
      </main>
    </React.Fragment>
  );
}

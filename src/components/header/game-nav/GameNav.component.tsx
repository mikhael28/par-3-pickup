import React, { useState, useEffect } from "react";
import styles from "./GameNav.module.scss";
import { API } from "@aws-amplify/api";
import store from "stores";
import { showNotification } from "stores/notifications";

export default function GameNav(props: any): JSX.Element {
  const [activeHole, setActiveHole] = useState<number>(0);
  const [activeGolfers, setActiveGolfers] = useState<any>([]);
  const [preGameGolfers, setPreGameGolfers] = useState<any>([]);

  useEffect(() => {
    // check for hole, fetch profiles
    const holeCheck = localStorage.getItem("activeHole");
    if (holeCheck !== null) {
      setActiveHole(parseInt(holeCheck));
    }
    const activeGolfersCheck = localStorage.getItem("activeGolfers");
    if (activeGolfersCheck !== null) {
      setActiveGolfers(JSON.parse(activeGolfersCheck));
      fetchProfiles();

    } else {
      fetchProfiles();
    }
  }, []);

  async function fetchProfiles() {
    let emptyGolferArray: any[] = [];
    try {
      // fetch the profile information of the players, to not rely on props.golfer and have multiple profile updates.
      props.activeGame.players.forEach(async (player: any, idx: number) => {
        let profileInfo = await API.get(
          "matches",
          `/sp3/object/member/${player.SK}`,
          {}
        );
        emptyGolferArray.push(profileInfo);
      });

      setActiveGolfers(emptyGolferArray);
      // this is a lazy way for me to compare their previous experience, to know how many GC to send. Will fix later, in addition to creating an 'end of round' report.
      setPreGameGolfers(emptyGolferArray);
    } catch (e) {
      console.log(e);
    }
  }

  function cancelGame() {
    // function to go back to home
    // @TODO: need to add API to edit the profile, and remove the latest record in a user's profile.
    localStorage.removeItem("activeCourse");
    localStorage.removeItem("activeGame");
    localStorage.removeItem("activeHole");
    localStorage.removeItem("activeGolfers");
    props.setActive(false);
  }

  // @TODO: could merge increase and decrease into one function

  function increaseStroke(player: any) {
    const oldGame = { ...props.activeGame };
    oldGame.players.forEach((team: any, i: any) => {
      if (team.SK === player.SK) {
        team.holes[activeHole].score = team.holes[activeHole].score + 1;
      }
    });
    props.update(oldGame);
    localStorage.setItem("activeGame", JSON.stringify(oldGame));
    setActiveHole(activeHole);
  }

  function decreaseStroke(player: any) {
    const downGame = { ...props.activeGame };
    downGame.players.forEach((team: any, i: any) => {
      if (team.SK === player.SK) {
        team.holes[activeHole].score = team.holes[activeHole].score - 1;
      }
    });
    props.update(downGame);
    localStorage.setItem("activeGame", JSON.stringify(downGame));
    setActiveHole(activeHole);
  }

  console.log('Active Game Props: ', props.activeGame)

  function checkForAchievement(hole: any) {
    let updatedGolferAchievements: any[] = [];
    activeGolfers.forEach((golfer: any, idx: number) => {
      let achievementArray: any;
      let achievementIndex: any;
      let strokeCount;

      console.log('Golfer checked: ', golfer)

      // loop through each of the golfers in this system.
      if (props.activeGame.players.length > 1) {
        if (golfer.SK === props.activeGame.players[0].SK) {
          strokeCount = parseInt(
            props.activeGame.players[0].holes[hole].score,
            10
          );
        } else {
          strokeCount = parseInt(
            props.activeGame.players[1].holes[hole].score,
            10
          );
        }
      } else {
        strokeCount = parseInt(
          props.activeGame.players[0].holes[hole].score,
          10
        );
      }

      golfer.achievements.forEach((ach: any, idx: number) => {
        if (ach.code === props.activeCourse.codeName) {
          achievementArray = ach;
          achievementIndex = idx;
        }
      });

      // check par
      if (achievementArray !== undefined) {
        let newGolfer = { ...golfer };

        // checking for par
        if (
          achievementArray[`par${hole + 1}`].completed === false &&
          strokeCount === 3
        ) {
          newGolfer.achievements[achievementIndex][`par${hole + 1}`].completed =
            true;
          newGolfer.xp =
            newGolfer.xp +
            newGolfer.achievements[achievementIndex][`par${hole + 1}`].value;

          // the store dispatch failed to fire, though the achievment was marked as true

          store.dispatch(
            showNotification({
              message: `${golfer.fName} hit par on hole ${
                hole + 1
              } and earned ${
                newGolfer.achievements[achievementIndex][`par${hole + 1}`].value
              } GC!`,
              isExpirable: true,
            })
          );
        }

        // checking for birdie
        if (
          achievementArray[`birdie${hole + 1}`].completed === false &&
          strokeCount === 2
        ) {
          newGolfer.achievements[achievementIndex][
            `birdie${hole + 1}`
          ].completed = true;
          // also marking par as complete, if it has not yet happened
          if (
            (newGolfer.achievements[achievementIndex][
              `par${hole + 1}`
            ].completed = false)
          ) {
            newGolfer.achievements[achievementIndex][
              `par${hole + 1}`
            ].completed = true;
            newGolfer.xp =
              newGolfer.xp +
              newGolfer.achievements[achievementIndex][`par${hole + 1}`].value;
          }
          // marking birdie as completed
          newGolfer.xp =
            newGolfer.xp +
            newGolfer.achievements[achievementIndex][`birdie${hole + 1}`].value;
          store.dispatch(
            showNotification({
              message: `${golfer.fName} hit birdie on hole ${
                hole + 1
              } and earned ${
                newGolfer.achievements[achievementIndex][`birdie${hole + 1}`]
                  .value
              } GC!`,
              isExpirable: true,
            })
          );
        }

        // check for record
        console.log(achievementArray.allTimeStrokes)
        console.log('Hole: ', hole)
        console.log('Stroke: ', strokeCount)
        if (
          achievementArray.allTimeStrokes[hole] > strokeCount || achievementArray.allTimeStrokes[hole] === 0
        ) {
          newGolfer.achievements[achievementIndex].allTimeStrokes[hole] =
            strokeCount;
          store.dispatch(
            showNotification({
              message: `${golfer.fName} hit a new record on Hole ${hole + 1}!`,
              isExpirable: true,
            })
          );
        }

        // check for hole in one
        if (
          strokeCount === 1 &&
          golfer.achievements[achievementIndex].ace.completed === false
        ) {
          newGolfer.achievements[achievementIndex].ace.completed = true;
          newGolfer.xp =
            newGolfer.xp + newGolfer.achievements[achievementIndex].ace.value;
          store.dispatch(
            showNotification({
              message: `Course Achievement Unlocked - Ace (Hole in One)`,
              isExpirable: true,
            })
          );
        }

        // only running if hole is on 8, perhaps should place this in the 'save' category.

        if (activeHole === 8) {
          // check if finishing your first game
          if (
            golfer.achievements[achievementIndex].allTimeRecord === 0 &&
            golfer.achievements[achievementIndex].firstTee.completed === false
          ) {
            newGolfer.achievements[achievementIndex].firstTee.completed = true;
            newGolfer.xp =
              newGolfer.xp +
              newGolfer.achievements[achievementIndex].firstTee.value;
            store.dispatch(
              showNotification({
                message: `Achievement Unlocked - First Tee!`,
                isExpirable: true,
              })
            );
          }

          // check for less than all time record
          let allTimeStrokeCalculation = props.activeGame.players[
            idx
          ].holes.reduce(
            (accumulator: number, hole: any) => accumulator + hole.score,
            0
          );

          // check if you beat your all-time record
          if (
            allTimeStrokeCalculation <
              golfer.achievements[achievementIndex].allTimeRecord ||
            golfer.achievements[achievementIndex].allTimeRecord === 0
          ) {
            newGolfer.achievements[achievementIndex].allTimeRecord =
              allTimeStrokeCalculation;
            if (
              golfer.achievements[achievementIndex].personalBest1.completed ===
                false &&
              golfer.achievements[achievementIndex].personalBest2.completed ===
                false &&
              golfer.achievements[achievementIndex].personalBest3.completed ===
                false
            ) {
              newGolfer.achievements[achievementIndex].personalBest1.completed =
                true;
              newGolfer.xp =
                newGolfer.xp +
                newGolfer.achievements[achievementIndex].personalBest1.value;
              store.dispatch(
                showNotification({
                  message: `Achievement Unlocked - Personal Best I`,
                  isExpirable: true,
                })
              );
            } else if (
              golfer.achievements[achievementIndex].personalBest1.completed ===
                true &&
              golfer.achievements[achievementIndex].personalBest2.completed ===
                false &&
              golfer.achievements[achievementIndex].personalBest3.completed ===
                false
            ) {
              newGolfer.achievements[achievementIndex].personalBest2.completed =
                true;
              newGolfer.xp =
                newGolfer.xp +
                newGolfer.achievements[achievementIndex].personalBest2.value;
              store.dispatch(
                showNotification({
                  message: `Achievement Unlocked - Personal Best II`,
                  isExpirable: true,
                })
              );
            } else if (
              golfer.achievements[achievementIndex].personalBest1.completed ===
                true &&
              golfer.achievements[achievementIndex].personalBest2.completed ===
                true &&
              golfer.achievements[achievementIndex].personalBest3.completed ===
                false
            ) {
              newGolfer.achievements[achievementIndex].personalBest3.completed =
                true;
              newGolfer.xp =
                newGolfer.xp +
                newGolfer.achievements[achievementIndex].personalBest3.value;
              store.dispatch(
                showNotification({
                  message: `Achievement Unlocked - Personal Best III`,
                  isExpirable: true,
                })
              );
            }
          }

          // check if you average junior par
          if (
            allTimeStrokeCalculation <= 36 &&
            golfer.achievements[achievementIndex].averageJuniorPar.completed ===
              false
          ) {
            newGolfer.achievements[achievementIndex].averageJuniorPar
              .completed === true;
          }

          // check if you average par
          if (
            allTimeStrokeCalculation <= 27 &&
            golfer.achievements[achievementIndex].averagePar.completed === false
          ) {
            newGolfer.achievements[achievementIndex].averagePar.completed =
              true;
          }
        }
        updatedGolferAchievements.push(newGolfer);
      }
    });
    setActiveGolfers(updatedGolferAchievements);
    localStorage.setItem(
      "activeGolfers",
      JSON.stringify(updatedGolferAchievements)
    );
  }

  async function saveRound() {
    checkForAchievement(activeHole);

    await API.put("matches", "/sp3", {
      body: props.activeGame,
    });

    // doing this localStorage thing, because of a race condition (my working theory)
    // @TODO refactor to eliminate race condition
    try {
      let localActive = localStorage.getItem('activeGolfers');
      let jsonActive;
      if (localActive !== null) {
        jsonActive = JSON.parse(localActive);
      } else {
        jsonActive = [];
      }
      // @TODO: need to rework this, combine stellar and dynamo updates into one API call per player
      // Stellar test-net occasionally breaks, I actually need to migrate to prod if I want to keep this system
      await jsonActive.forEach(async (gfr: any, idx: number) => {
        //  this is where we pay people with Stellar at the end of the round

        let expDifference = gfr.xp - preGameGolfers[idx].xp;

        await API.put("matches", "/sp3", {
          body: gfr,
        });

        if (expDifference > 0) {
          await API.post("util", `/stellar-pay`, {
            body: {
              sk: gfr.gcSK,
              amount: expDifference,
            },
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("activeCourse");
    localStorage.removeItem("activeGame");
    localStorage.removeItem("activeHole");
    localStorage.removeItem("activeGolfers");
    // @TODO: Refresh the records page so that it has the latest personal best.
    props.fetchProfileData(props.golfer.SK);
    props.setActive(false);
  }

  return (
    <div>
      <h1>Par 3 at {props.activeCourse.name}</h1>
      <p>Per Hole Wager: ${props.activeGame.perHoleWager}</p>
      {props.activeGame.players.map((player: any, idx: number) => {
         let achIndex = 0;
         props.golfer.achievements.forEach((ach: any, idx: number) => {
           if (ach.code === props.activeCourse.codeName) {
             achIndex = idx;
           }
         });
        return (
          <figure
            className={styles.player}
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "default",
            }}
          >
            <div>
              <img
                src={player.profilePicture}
                height="80"
                width="80"
                alt={player.fName}
                style={{ borderRadius: 15 }}
              />
            </div>
            <div className="flex-down">
              {props.golfer.SK === player.SK ? (
                <div>
                  <p>
						Historical Best: {
								props.golfer.achievements[achIndex].allTimeStrokes[activeHole]
							}{' '}
							Strokes
						</p>
                </div>
              ) : (
                <p>
                  {player.fName} {player.lName}
                </p>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => decreaseStroke(player)}
                  style={{
                    fontSize: 40,
                    marginRight: 24,
                    paddingRight: 12,
                    paddingLeft: 12,
                    borderRadius: "50%",
                    backgroundColor: "#a946d0",
                    color: "white",
                  }}
                >
                  -
                </button>
                <p>
                  Strokes:{" "}
                  {props.activeGame.players[idx].holes[activeHole].score}
                </p>

                <button
                  onClick={() => increaseStroke(player)}
                  style={{
                    fontSize: 40,
                    marginLeft: 24,
                    paddingRight: 12,
                    paddingLeft: 12,
                    borderRadius: "50%",
                    backgroundColor: "#a946d0",
                    color: "white",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </figure>
        );
      })}
      {activeHole === 8 ? (
        <button
          onClick={saveRound}
          className="pay-button"
          style={{ width: "90vw", marginRight: 20, marginBottom: 20 }}
        >
          Save and finish rounds
        </button>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            backgroundColor: "#a946d0",
            display: "flex",
            alignItems: "center",
            borderRadius: 4,
            margin: 12,
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeHole !== 0) {
              const newHole = activeHole - 1;
              checkForAchievement(activeHole);
              setActiveHole(newHole);
              localStorage.setItem("activeHole", newHole.toString());
            }
          }}
        >
          <span className="material-icons" style={{ color: "white" }}>
            chevron_left
          </span>
          <button
            style={{
              color: "white",
              padding: 6,
              borderRadius: 4,
              alignItems: "center",
            }}
          >
            Previous
          </button>
        </div>

        <div>
          <h1>Hole {activeHole + 1}</h1>
        </div>
        <div
          style={{
            backgroundColor: "#a946d0",
            display: "flex",
            alignItems: "center",
            borderRadius: 4,
            margin: 12,
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeHole !== 8) {
              const newHole = activeHole + 1;
              checkForAchievement(activeHole);

              setActiveHole(newHole);
              localStorage.setItem("activeHole", newHole.toString());
            }
          }}
        >
          <button
            style={{
              color: "white",
              padding: 6,
            }}
          >
            &nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;
          </button>
          <span className="material-icons" style={{ color: "white" }}>
            chevron_right
          </span>
        </div>
      </div>
    </div>
  );
}

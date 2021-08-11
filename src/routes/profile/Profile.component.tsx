/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "components/image";
import Placeholder from "components/placeholder";
import { useRouter } from "next/router";
import SmallRecordCard from "components/small-record-card";
import Collapsible from "react-collapsible";
import styles from "./Profile.module.scss";
import SmallAchievementCard from "components/small-achievement-card";

const { profile, profileMain, profilePicture, profileContent } = styles;

export default function Profile(props: any): JSX.Element {
  const [records, setRecords] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // @TODO: I need to rethink how this value get's updated
    let recs = localStorage.getItem("records");
    if (recs !== null) {
      setRecords(props.golfer.records);
      console.log(props.golfer.achievements);
      setAchievements(props.golfer.achievements);
    } else {
      // dynamo request to get all records records, then you can click in to get the real dookie
    }
  }, [props.golfer]);

  return (
    <React.Fragment>
      <Head>
        <title>Profile</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={profile}>
        <div className={profileMain}>
          <Image
            isPlaceholder={false}
            src={props.golfer.profilePicture}
            className={profilePicture}
          />
          <div className={profileContent}>
            <h1>
              <Placeholder
                content={`${props.golfer.fName} ${props.golfer.lName}`}
                length="short"
              />
            </h1>
            <p>{props.golfer.xp} Golfer Score</p>
            <a
              style={{ fontSize: 14, textDecoration: "underline" }}
              target="_blank"
              rel="noopener"
              href={`https://horizon-testnet.stellar.org/accounts/${props.golfer.gcPK}`}
            >
              Open Stellar Wallet
            </a>
          </div>
        </div>

        <h2>View Achievements per Course</h2>
        {achievements.map((ach: any, i: any) => {
          return (
            <Collapsible trigger={`${ach.name}`} key={i}>
              <p>Personal Best: {ach.allTimeRecord}</p>
              <Collapsible trigger="Course Stroke Records">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                  }}
                >
                  {ach.allTimeStrokes.map((stroke: any, idx: any) => {
                    return (
                      <div style={{ textAlign: "center", margin: 2 }} key={idx}>
                        <h3>#{idx + 1}</h3>
                        <p>{stroke}</p>
                      </div>
                    );
                  })}
                </div>
              </Collapsible>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <SmallAchievementCard {...ach.ace} />
                <SmallAchievementCard {...ach.firstTee} />
                <SmallAchievementCard {...ach.personalBest1} />
                <SmallAchievementCard {...ach.personalBest2} />
                <SmallAchievementCard {...ach.personalBest3} />
                {/* <SmallAchievementCard {...ach.victory} /> */}
                <SmallAchievementCard {...ach.averageJuniorPar} />
                <SmallAchievementCard {...ach.averagePar} />
                <SmallAchievementCard {...ach.par1} />
                <SmallAchievementCard {...ach.par2} />
                <SmallAchievementCard {...ach.par3} />
                <SmallAchievementCard {...ach.par4} />
                <SmallAchievementCard {...ach.par5} />
                <SmallAchievementCard {...ach.par6} />
                <SmallAchievementCard {...ach.par7} />
                <SmallAchievementCard {...ach.par8} />
                <SmallAchievementCard {...ach.par9} />
                <SmallAchievementCard {...ach.birdie1} />
                <SmallAchievementCard {...ach.birdie2} />
                <SmallAchievementCard {...ach.birdie3} />
                <SmallAchievementCard {...ach.birdie4} />
                <SmallAchievementCard {...ach.birdie5} />
                <SmallAchievementCard {...ach.birdie6} />
                <SmallAchievementCard {...ach.birdie7} />
                <SmallAchievementCard {...ach.birdie8} />
                <SmallAchievementCard {...ach.birdie9} />
              </div>
            </Collapsible>
          );
        })}
        <h2>Review Previous Game Scores</h2>
        {records.map((rec: any, i: any) => {
          return (
            <SmallRecordCard
              course={rec.course}
              gamePK={rec.gamePK}
              key={i}
              handleClick={() => {
                localStorage.setItem("activeRecord", JSON.stringify(rec));
                router.push(`/stakes/stake/${rec.gamePK}_${rec.gameSK}`);
              }}
            />
          );
        })}
      </main>
    </React.Fragment>
  );
}

import React, { useEffect } from "react";
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
  const router = useRouter();

  useEffect(() => {
    let cache = localStorage.getItem("golfer");
    if (cache !== null) {
      if (props.golfer.SK) {
        props.fetchProfileData(props.golfer.SK);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Review Your Scorecards</title>
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

        {props.golfer.records.length > 0 ? (
          <React.Fragment>
            <h2>Your latest round</h2>
            {props.golfer.records.map((rec: any, i: any) => {
              if (i + 1 === props.golfer.records.length) {
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
              }
            })}

            <Collapsible trigger={`View All Scorecards`}>
              {props.golfer.records.map((rec: any, i: any) => {
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
            </Collapsible>

            {props.golfer.achievements.map((ach: any, i: any) => {
              return (
                <Collapsible trigger={`View ${ach.name} Achievements`} key={i}>
                  <p>Personal Best: {ach.allTimeRecord}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    {ach.allTimeStrokes.map((stroke: any, idx: any) => {
                      return (
                        <div
                          style={{ textAlign: "center", margin: 2 }}
                          key={idx}
                        >
                          <h3>#{idx + 1}</h3>
                          <p>{stroke}</p>
                        </div>
                      );
                    })}
                  </div>
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
          </React.Fragment>
        ) : null}
      </main>
    </React.Fragment>
  );
}

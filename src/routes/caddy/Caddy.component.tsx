import React from "react";
import Head from "next/head";
import Image from "components/image";
import Placeholder from "components/placeholder";
import styles from "./Caddy.module.scss";
import { lessons } from "config";

const { profilePicture, profileContent, caddy, caddyMain } = styles;

export default function Caddy(props: any): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Caddy</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={caddy}>
        {lessons.map((topics, i) => {
          return (
            <div className={caddyMain} key={i}>
              <Image
                isPlaceholder={false}
                src={topics.picture}
                className={profilePicture}
              />
              <div className={profileContent}>
                <h1>
                  <Placeholder content={`${topics.name}`} length="short" />
                </h1>
                <p>{topics.description}</p>
              </div>
            </div>
          );
        })}
      </main>
    </React.Fragment>
  );
}

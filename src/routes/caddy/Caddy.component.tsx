/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "components/image";
import Placeholder from "components/placeholder";
import { useUser } from "hooks/user";
import { useRouter } from "next/router";
import styles from "./Caddy.module.scss";
import { caddy } from "config";

const {
  profile,
  profileMain,
  profilePicture,
  profileContent,
  followersIcon,
  followersPlaceholder,
  about,
  proshop,
  proshopMain,
} = styles;

export default function Caddy(props: any): JSX.Element {
  const router = useRouter();
  const { name, bio, avatar_url, followers } = useUser();

  return (
    <React.Fragment>
      <Head>
        <title>Caddy</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={proshop}>
        {caddy.map((topics, i) => {
          return (
            <div className={proshopMain} key={i}>
              <Image
                isPlaceholder={!avatar_url}
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

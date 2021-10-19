import React from "react";
import Head from "next/head";
import Image from "components/image";
import Placeholder from "components/placeholder";
import styles from "./Caddy.module.scss";
import Collapsible from "react-collapsible";
import { lessons } from "config";

const { caddy } = styles;

export default function Caddy(props: any): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Caddy</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={caddy}>
        <h2>Tap on a topic to open some suggestions.</h2>
        {lessons.map((topics, i) => {
          return (
            <Collapsible trigger={topics.name}>
              <div key={i}>
                {/* <Image
                  isPlaceholder={false}
                  src={topics.picture}
                  className={profilePicture}
                /> */}
              </div>
                {topics.steps.map((step, idx) => {
                  return(
                    <li style={{paddingLeft: 16, paddingRight: 16, marginTop: 10, fontSize: 16, listStyle: 'none'}}>{step.content}</li>
                  )
                })}
            </Collapsible>
            );
          })}
        </main>
      </React.Fragment>
  );
}

/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "components/image";
import Placeholder from "components/placeholder";
import { useUser } from "hooks/user";
import { useRouter } from "next/router";
import styles from "./ProShop.module.scss";
import { products } from "config";

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

export default function Profile(props: any): JSX.Element {
  const router = useRouter();
  const { name, bio, avatar_url, followers } = useUser();

  return (
    <React.Fragment>
      <Head>
        <title>Pro Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={proshop}>
        {products.map((product, i) => {
          return (
            <div className={proshopMain} key={i}>
              <Image
                isPlaceholder={!avatar_url}
                src={product.picture}
                className={profilePicture}
              />
              <div className={profileContent}>
                <h1>
                  <Placeholder content={`${product.name}`} length="short" />
                </h1>
                <h2>{product.maker}</h2>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <div>
                  <a
                    href={product.amazon}
                    target="_blank"
                    rel="noopener"
                    id="LoginWithAmazon"
                  >
                    <img
                      style={{ border: 0 }}
                      alt="Login with Amazon"
                      src="https://www.eatingdisordertherapyla.com/wp-content/uploads/2018/05/amazon-button-1.jpg"
                      width="156"
                      height="64"
                    />
                  </a>
                  <a
                    href={product.youtube}
                    target="_blank"
                    rel="noopener"
                    id="WatchOnYouTube"
                  >
                    <img
                      style={{ border: 0, borderRadius: 3, margin: 1 }}
                      alt="Watch Review on YouTube"
                      src="https://miro.medium.com/max/512/0*db6bfYw00KqtrGjo."
                      width="156"
                      height="64"
                    />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </React.Fragment>
  );
}

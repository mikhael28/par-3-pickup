/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { injectClassNames } from "utils/css";
import styles from "./Items.module.scss";

const { items, active } = styles;

const links = [
  { name: "Clubhouse", url: "/", alias: [] },
  { name: "Proshop", url: "/proshop", alias: [] },
  { name: "Caddy", url: "/caddy", alias: [] },
  { name: "Scores", url: "/profile", alias: [] },
];

export default function Items(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <ul className={items}>
      {links.map(({ name, url, alias }) => (
        <li
          key={name}
          // eslint-disable-next-line react/jsx-indent-props
          className={injectClassNames([
            active,
            pathname === url,
            // || alias.includes(pathname)
          ])}
        >
          <Link href={url}>{name}</Link>
        </li>
      ))}

      <span
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        logout
      </span>
    </ul>
  );
}

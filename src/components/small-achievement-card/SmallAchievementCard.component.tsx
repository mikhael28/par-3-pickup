import React from "react";
import styles from "./SmallAchievementCard.module.scss";

export default function AchievementCard(props: any) {
  const { card } = styles;
  let completed;
  if (props.completed === true) {
    completed = (
      <i
        className="material-icons"
        style={{ color: "black", marginLeft: "45%", marginRight: "45%" }}
      >
        lock_open
      </i>
    );
  } else {
    completed = (
      <i
        className="material-icons"
        style={{ color: "black", marginLeft: "45%", marginRight: "45%" }}
      >
        lock_icon
      </i>
    );
  }
  return (
    <figure
      className={card}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-apart",
      }}
      onClick={props.handleClick}
    >
      <p>{props.name}</p>

      {completed}
    </figure>
  );
}

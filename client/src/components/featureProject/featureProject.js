import React from "react";
import "../cards/card.scss";

function FeaturedAndMakers(props) {
  return (
    <div className="card">
      <img src={props.image} alt="project" />
      {props.type === "featured" ? <h2>{props.title}</h2> : null}
      <p>{props.user.username}</p>
      <p>{props.stars}</p>
    </div>
  );
}

export default FeaturedAndMakers;

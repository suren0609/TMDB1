import React from "react";
import { img_url } from "../urls";
import "./Card.css";
import { NavLink as Link } from "react-router-dom";

const Card = ({ movie }) => {
  return (
    <Link className="Card" to={"/movie/" + movie.id}>
      <div className="cardTop">
        <div className="defCard">
          <img className="poster" src={img_url + movie.poster_path} alt="" />
        </div>
        <div className="hovCard">
          <h5>{movie.title + " " + movie.release_date.slice(0, 4)}</h5>

          <p>
            Popularity: <br /> {movie.popularity}
          </p>
        </div>
      </div>
      <p>
        {movie.title.slice(0, 16)}
        {movie.title.length > 16 ? "..." : null}
      </p>
    </Link>
  );
};

export default Card;

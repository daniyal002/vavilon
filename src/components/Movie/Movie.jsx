import React from "react";
import style from "./Movie.module.css";
import Booking from "../Booking/Booking";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Movie = (props) => {
  const ratingStars = [];
  for (let i = 0; i < 5; i++) {
    ratingStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < props.rating ? style.starFilled : style.starEmpty}
      />
    );
  }

  return (
    <div className={style.movie}>
      <div className={style.movieG}>
        <img
          src={props.poster}
          alt={props.title}
          className={style.moviePoster}
        />
        <div className={style.movieInfo}>
          <div className={style.moviePT}>
            <p className={style.moviePrice}>Цена: {props.price}₽</p>
            <p className={style.movieTime}>Время: {props.time}</p>
          </div>

          <h2 className={style.movieTitle}>{props.title}</h2>
          <p className={style.movieDescription}>{props.description}</p>

          <div className={style.movieRaR}>
            <p className={style.rating}>{ratingStars}</p>
            <p className={style.ageRestriction}>{props.ageRestriction}</p>
          </div>
        </div>
      </div>
      <Booking movieId={props.movieId} time={props.time} />
    </div>
  );
};

export default Movie;

import React from "react";
import style from "./Movie.module.css";
import Booking from "../Booking/Booking";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Movie = ({ movieId, price, time }) => {
  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/movies/${movieId}`);
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    }

    fetchData();
  }, []);

  const ratingStars = [];
  for (let i = 0; i < 5; i++) {
    ratingStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < movieList.rating ? style.starFilled : style.starEmpty}
      />
    );
  }

  return (
    <div className={style.movie}>
      <div className={style.movieG}>
        <img
          src={movieList.poster_url}
          alt={movieList.title}
          className={style.moviePoster}
        />
        <div className={style.movieInfo}>
          <div className={style.moviePT}>
            <p className={style.moviePrice}>Цена: {price}₽</p>
            <p className={style.movieTime}>Время: {time}</p>
          </div>

          <h2 className={style.movieTitle}>{movieList.title}</h2>
          <p className={style.movieDescription}>{movieList.description}</p>

          <div className={style.movieRaR}>
            <p className={style.rating}>{ratingStars}</p>
            <p className={style.ageRestriction}>{movieList.age_limit}+</p>
          </div>
        </div>
      </div>
      <Booking movieId={movieId} time={time} />
    </div>
  );
};

export default Movie;

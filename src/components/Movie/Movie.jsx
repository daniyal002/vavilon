import React from "react";
import style from "./Movie.module.css";
import Booking from "../Booking/Booking";
import { Link } from "react-router-dom";
import { UrlMovie } from "../../urls";

const Movie = ({ movieId, price, time, sessionId }) => {
  const maxLength = 100;

  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlMovie + "/" + movieId);
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };
    console.log(movieList);
    fetchData();
  }, []);

  return (
    <div className={style.movie}>
      <div className={style.movieG}>
        <Link to={`movies/${movieId}`}>
          <img
            src={movieList.poster_url}
            alt={movieList.title}
            className={style.moviePoster}
          />
        </Link>

        <div className={style.movieInfo}>
          <h2 className={style.movieTitle}>{movieList.title}</h2>
          <p className={style.movieYear}>Год: {movieList.year}</p>

          <div className={style.moviePT}>
            <p className={style.moviePrice}>
              Цена: {price.replace(".00", "")} ₽
            </p>
            <p className={style.movieTime}>Время: {time}</p>
          </div>
          <p className={style.movieDescription}>
            <span className={style.movieDescriptionTitle}>Описание: </span>
            <br />
            {movieList.description && movieList.description.length > maxLength
              ? `${movieList.description.substring(0, maxLength)}...`
              : movieList.description}{" "}
            <Link to={`movies/${movieId}`}>Далее</Link>
          </p>
          <p className={style.movieGenre}>Жанр:{movieList.genre} </p>

          <div className={style.movieRaR}>
            <p className={style.movieRating}>Рейтинг: {movieList.rating}</p>
            <p className={style.ageRestriction}>{movieList.age_limit}+</p>
          </div>
        </div>
      </div>
      <Booking
        sessionId={sessionId}
        time={time}
        movieId={movieId}
        price={price}
      />
    </div>
  );
};

export default Movie;

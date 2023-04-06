import React from "react";
import Movie from "../Movie/Movie";
import styles from "./MovieList.module.css";
import Header from "../Header/Header";

const MovieList = ({ movies, bookMovie }) => {
  return (
    <>
      <Header />
      <div className={styles.movieList}>
        <div className="container">
          <div className={styles.movieListB}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                poster={movie.poster}
                description={movie.description}
                price={movie.price}
                time={movie.time}
                rating={movie.rating}
                ageRestriction={movie.ageRestriction}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieList;

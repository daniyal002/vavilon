import React from "react";
import { useParams } from "react-router-dom";
import { UrlMovie } from "../../urls";
import styles from "./MovieItem.module.css";

const MovieItem = () => {
  const [movieItem, setMovieItem] = React.useState({});

  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlMovie + "/" + id);
        const data = await response.json();
        setMovieItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.movieItem}>
      <div className={styles.movieItemG}>
        <img
          src={movieItem.poster_url}
          alt={movieItem.title}
          className={styles.movieItemPoster}
        />
        <div className={styles.movieItemDetails}>
          <h2 className={styles.movieItemTitle}>{movieItem.title}</h2>
          <p className={styles.movieItemDescription}>
            <span className={styles.movieItemDescriptionTitle}>Описание: </span>
            <br />
            {movieItem.description}
          </p>

          <div className={styles.movieItemRating}>
            Рейтинг: {movieItem.rating}
          </div>
          <div className={styles.movieItemAgeLimit}>
            Возрастное ограничение: {movieItem.age_limit}+
          </div>
          <iframe
            src={movieItem.trailer_url}
            frameborder="0"
            className={styles.movieItemTrailer}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;

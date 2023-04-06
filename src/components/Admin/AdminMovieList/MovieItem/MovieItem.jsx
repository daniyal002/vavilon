import React from "react";
import style from "./MovieItem.module.css";
import MovieItemModal from "./MovieItemModal/MovieItemModal";

const MovieItem = ({
  id,
  title,
  poster,
  description,
  rating,
  age_restriction,
  trailer,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const deleteMovieFromDB = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data was successfully deleted from the database:", data);
    } catch (error) {
      console.error(
        "There was a problem deleting data from the database:",
        error
      );
    }
  };
  return (
    <div className={style.movieItem}>
      <div className={style.movieItemCard}>
        <img src={poster} alt={title} />
        <div className={style.movieItemCardBody}>
          <h2 className={style.movieItemCardBodyTitle}>{title}</h2>
          <p className={style.movieItemCardBodyDescription}>
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
          <div className={style.movieItemCardBodyRaR}>
            <p className={style.movieItemCardBodyRating}>Рейтинг: {rating}</p>
            <p className={style.movieItemCardBodyAgeRestriction}>
              {age_restriction}+
            </p>
          </div>
        </div>
        <div className={style.movieItemCardButtons}>
          <button
            className={style.movieItemCardButton}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить в афишу
          </button>

          {isModalOpen && (
            <MovieItemModal
              setIsModalOpen={setIsModalOpen}
              title={title}
              movieId={id}
            />
          )}
          <button
            className={style.movieItemCardButton}
            onClick={() => deleteMovieFromDB(id)}
          >
            Удалить фильм
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;

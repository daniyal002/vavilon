import React from "react";
import style from "./PosterItem.module.css";
import PosterItemModal from "./PosterItemModal/PosterItemModal";
import { UrlSession, UrlMovie } from "../../../../urls";
import PosterBooking from "./PosterBooking/PosterBooking";

const PosterItem = ({
  posterId,
  movieId,
  time,
  date,
  price,
  remaining_seats,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(UrlMovie + "/" + movieId);
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    }
    fetchData();
  }, []);

  const deleteMovieFromDB = async (posterId) => {
    try {
      const response = await fetch(UrlSession + "/" + posterId, {
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
    <div className={style.posterItem}>
      <div className={style.posterItemCard}>
        <img src={movieList.poster_url} alt={movieList.title} />
        <div className={style.posterItemCardBody}>
          <h2 className={style.posterItemCardBodyTitle}>{movieList.title}</h2>
          <p className={style.posterItemCardBodyDescription}>
            {movieList.description}
          </p>
          <div className={style.posterItemCardBodyRaR}>
            <p className={style.posterItemCardBodyRating}>
              Рейтинг: {movieList.rating}
            </p>
            <p className={style.posterItemCardBodyAgeRestriction}>
              {movieList.age_limit}+
            </p>
          </div>
          <div className={style.posterItemCardBodySessionInfo}>
            <p className={style.posterItemCardBodySessionInfoTime}>
              Время показа: {time}
            </p>
            <p className={style.posterItemCardBodySessionInfoDate}>
              День показа: {date}
            </p>
            <p className={style.posterItemCardBodySessionInfoPrice}>
              Цена: {price} ₽
            </p>
          </div>
        </div>
        <div className={style.posterItemCardButtons}>
          <button
            className={style.posterItemCardButton}
            onClick={() => deleteMovieFromDB(posterId)}
          >
            Удалить фильм c афиши
          </button>

          <button
            className={style.posterItemCardButton}
            onClick={() => setIsModalOpen(true)}
          >
            Изменить афишу
          </button>
          {isModalOpen && (
            <PosterItemModal
              setIsModalOpen={setIsModalOpen}
              title={movieList.title}
              posterId={posterId}
              time={time}
              date={date}
              price={price}
            />
          )}

          <PosterBooking
          sessionId={posterId}
          title={movieList.title}
          time={time}
          movieId={movieId}
          price={price}
          />
        </div>
      </div>
    </div>
  );
};

export default PosterItem;

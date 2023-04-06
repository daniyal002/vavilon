import React from "react";
import style from "./AdminMoviePoster.module.css";
import PosterItem from "./PosterItem/PosterItem";

const AdminMoviePoster = () => {
  const [sessionList, setSessionList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/sessions");
        const data = await response.json();
        setSessionList(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={style.adminMovieList}>
      <div className={style.adminMoviePostItem}>
        {sessionList.map((el) => {
          return (
            <PosterItem
              key={el.id}
              posterId={el.id}
              movieId={el.movieId}
              time={el.time}
              date={el.date}
              price={el.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminMoviePoster;

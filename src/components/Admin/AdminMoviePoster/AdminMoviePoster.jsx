import React from "react";
import style from "./AdminMoviePoster.module.css";
import AdminSlidebar from "../AdminSlidebar/AdminSlidebar";
import PosterItem from "./PosterItem/PosterItem";
import { UrlSession } from "../../../urls";
import { fromNumbersInMonth } from "../../MovieList/MovieData";

const AdminMoviePoster = () => {
  const [selectedDate, setSelectedDate] = React.useState("");
  const [dates, setDates] = React.useState([]);

  const [sessionList, setSessionList] = React.useState([]);

  const filterSessionsByDate = () => {
    return sessionList.filter((session) => session.date === selectedDate);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlSession);
        const data = await response.json();
        setSessionList(data);
        const uniqueDates = Array.from(
          new Set(data.map((session) => session.date))
        );
        setDates(uniqueDates);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AdminSlidebar />
      <div className={style.adminMoviePoster}>
        <div className={style.filters}>
          <div className={style.movieListDate}>
            {dates.map((date) => (
              <button
                className={style.movieListDateButton}
                key={date}
                onClick={() => setSelectedDate(date)}
              >
                {date.split("-").slice(2).join("-") +
                  " " +
                  fromNumbersInMonth(parseInt(date.split("-")[1]))}
              </button>
            ))}
          </div>
        </div>
        <div className={style.adminMoviePostItem}>
          {filterSessionsByDate().map((el) => {
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
    </>
  );
};

export default AdminMoviePoster;

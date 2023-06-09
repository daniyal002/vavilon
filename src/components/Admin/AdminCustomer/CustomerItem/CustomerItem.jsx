import React, { useEffect, useState } from "react";
import style from "./CustomerItem.module.css";
import { UrlSession, UrlMovie } from "../../../../urls";

const CustomerItem = ({ sessionId, countPerson }) => {
  console.log(countPerson);
  const [sessionData, setSessionData] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(UrlSession + "/" + sessionId);
      const data = await response.json();
      setSessionData(data);
      fetchMovieData(data.movieId);
    } catch (error) {
      console.error("Failed to fetch session data", error);
    }
  };

  const fetchMovieData = async (movieId) => {
    try {
      const response = await fetch(UrlMovie + "/" + movieId);
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Failed to fetch movie data", error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  useEffect(() => {
    const fetchSessionDataPut = async () => {
      try {
        const response = await fetch(UrlSession + "/" + sessionId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remaining_seats: countPerson,
          }),
        });
        const data = await response.json();
        console.log("Данные успешно обновлены:", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessionDataPut();
  }, []);

  return (
    <div className={style.customerItem}>
      <div className={style.customerItemTitle}>
        Афиша по Фильму: {movieData.title}
      </div>
      <div className={style.customerItemTime}>Время: {sessionData.time}</div>
      <div className={style.customerItemDate}>Дата: {sessionData.date}</div>
      <div className={style.customerItemPrice}>Цена:{sessionData.price}</div>
      <div className={style.customerItemSeats}>
        Занятые места: {countPerson}
      </div>
    </div>
  );
};

export default CustomerItem;

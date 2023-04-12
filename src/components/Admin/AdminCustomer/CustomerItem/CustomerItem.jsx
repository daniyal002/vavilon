import React, { useEffect, useState } from "react";
import style from "./CustomerItem.module.css";

const CustomerItem = ({ sessionId, count }) => {
  const URLSessions = "http://90.156.210.4:5000/sessions/";
  const URLMovies = "http://90.156.210.4:5000/movies/";

  const [sessionData, setSessionData] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(URLSessions + sessionId);
      const data = await response.json();
      setSessionData(data);
      fetchMovieData(data.movieId);
    } catch (error) {
      console.error("Failed to fetch session data", error);
    }
  };

  const fetchMovieData = async (movieId) => {
    try {
      const response = await fetch(URLMovies + movieId);
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Failed to fetch movie data", error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className={style.customerItem}>
      <div className={style.customerItemTitle}>
        Афиша по Фильму: {movieData.title}
      </div>
      <div className={style.customerItemTime}>Время: {sessionData.time}</div>
      <div className={style.customerItemDate}>Дата: {sessionData.date}</div>
      <div className={style.customerItemPrice}>Цена:{sessionData.price}</div>
      <div className={style.customerItemSeats}>Занятые места: {count} </div>
    </div>
  );
};

export default CustomerItem;

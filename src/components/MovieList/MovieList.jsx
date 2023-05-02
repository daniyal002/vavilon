import React from 'react';
import Movie from '../Movie/Movie';
import styles from './MovieList.module.css';
import Header from '../Header/Header';
import { todayDate } from './MovieData';
import { UrlSession } from '../../urls';
import Footer from '../Footer/Footer';

const MovieList = () => {
  const [selectedDate, setSelectedDate] = React.useState('today');
  const [sessions, setSessions] = React.useState([]);

  const filterSessionsByDate = () => {
    return sessions.filter((session) => session.day === selectedDate);
  };

  const [days, setDays] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlSession);
        const data = await response.json();
        setSessions(data);
        const uniqueDays = Array.from(
          new Set(data.map((session) => session.day))
        );
        setDays(uniqueDays.sort());
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  const [today, setToday] = React.useState('today');

  return (
    <>
      <Header />
      <main className={styles.movieList}>
        <div className="container">
          <div className={styles.movieListDate}>
            {days.map((day) => (
              <button
                className={
                  styles.movieListDateButton +
                  (today === day ? ' ' + styles.movieListDateButtonActive : '')
                }
                key={day}
                onClick={() => {
                  setToday(day);
                  setSelectedDate(day);
                }}
              >
                {day === 'today' ? 'Сегодня' : 'Завтра'}
              </button>
            ))}
          </div>
          <div className={styles.movieListB}>
            {filterSessionsByDate().map((session) => (
              <Movie
                key={session.id}
                sessionId={session.id}
                movieId={session.movieId}
                price={session.price}
                time={session.time}
                remainingSeats={session.remaining_seats}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MovieList;

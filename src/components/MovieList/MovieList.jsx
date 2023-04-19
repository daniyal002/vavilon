import React from 'react';
import Movie from '../Movie/Movie';
import styles from './MovieList.module.css';
import Header from '../Header/Header';
import { fromNumbersInMonth, todayDate } from './MovieData';
import { UrlSession } from '../../urls';

const MovieList = () => {
  const [selectedDate, setSelectedDate] = React.useState(todayDate());
  const [dates, setDates] = React.useState([]);

  const [sessions, setSessions] = React.useState([]);

  const filterSessionsByDate = () => {
    return sessions.filter((session) => session.date === selectedDate);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlSession);
        const data = await response.json();
        setSessions(data);
        const uniqueDates = Array.from(
          new Set(data.map((session) => session.date))
        );
        setDates(uniqueDates.sort((a, b) => new Date(a) - new Date(b)));
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.movieList}>
        <div className="container">
          <div className={styles.filters}>
            <div className={styles.movieListDate}>
              {dates.map((date) => (
                <button
                  className={styles.movieListDateButton}
                  key={date}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.split('-').slice(2).join('-') +
                    ' ' +
                    fromNumbersInMonth(parseInt(date.split('-')[1]))}
                </button>
              ))}
            </div>
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
      </div>
    </>
  );
};

export default MovieList;

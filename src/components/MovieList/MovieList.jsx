import React from 'react';
import Movie from '../Movie/Movie';
import styles from './MovieList.module.css';
import Header from '../Header/Header';

const MovieList = () => {
  const URL = 'http://localhost:5000/sessions';

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className={styles.movieList}>
        <div className="container">
          <div className={styles.movieListB}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                sessionId={movie.id}
                movieId={movie.movieId}
                price={movie.price}
                time={movie.time}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieList;

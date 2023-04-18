import React from 'react';
import AddMovie from './AddMovie/AddMovie';
import AdminSlidebar from '../AdminSlidebar/AdminSlidebar';
import style from './AdminMovieList.module.css';
import MovieItem from './MovieItem/MovieItem';
import { UrlMovie } from '../../../urls';

const AdminMovieList = () => {
  const [movieList, setMovieList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(UrlMovie);
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    if (searchQuery) {
      const filtered = movieList.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movieList);
    }
  }, [searchQuery, movieList]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <AdminSlidebar />
      <div className={style.adminMovieList}>
        <div className={style.adminMovieListSearchBar}>
          <input
            type="text"
            placeholder="Поиск по названию фильма"
            value={searchQuery}
            onChange={handleSearch}
            className={style.adminMovieListSearch}
          />
        </div>
        <AddMovie />

        <div className={style.adminMovieListItem}>
          {filteredMovies.map((item) => {
            return (
              <MovieItem
                key={item.id}
                id={item.id}
                title={item.title}
                poster={item.poster_url}
                description={item.description}
                rating={item.rating}
                age_restriction={item.age_limit}
                trailer={item.trailer_url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminMovieList;

import React from 'react';
import style from './AdminMoviePoster.module.css';
import AdminSlidebar from '../AdminSlidebar/AdminSlidebar';
import PosterItem from './PosterItem/PosterItem';

const AdminMoviePoster = () => {
  const URL = 'http://localhost:5000/sessions/';

  const [sessionList, setSessionList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setSessionList(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AdminSlidebar />
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
    </>
  );
};

export default AdminMoviePoster;

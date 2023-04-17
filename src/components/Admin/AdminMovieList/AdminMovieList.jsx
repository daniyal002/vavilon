import React from "react";
import AddMovie from "./AddMovie/AddMovie";
import AdminSlidebar from "../AdminSlidebar/AdminSlidebar";
import style from "./AdminMovieList.module.css";
import MovieItem from "./MovieItem/MovieItem";
import { UrlMovie } from "../../../urls";

const AdminMovieList = () => {
  const [movieList, setMovieList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(UrlMovie);
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AdminSlidebar />
      <div className={style.adminMovieList}>
        <AddMovie />
        <div className={style.adminMovieListItem}>
          {movieList.map((item) => {
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

import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList/MovieList";
import AdminCustomer from "./components/Admin/AdminCustomer/AdminCustomer";
import AdminMovieList from "./components/Admin/AdminMovieList/AdminMovieList";
import AdminMoviePoster from "./components/Admin/AdminMoviePoster/AdminMoviePoster";

function App() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const fetchedMovies = [
      {
        id: 1,
        title: "Фильм 1",
        poster: "https://placehold.it/200x300",
        description: "Описание фильма 1",
        price: "350",
        time: "10:00",
        rating: 5,
        ageRestriction: "16+",
      },
      {
        id: 2,
        title: "Фильм 2",
        poster: "https://placehold.it/200x300",
        description: "Описание фильма 2",
        price: "350",
        time: "13:00",
        rating: 4,
        ageRestriction: "18+",
      },
      {
        id: 3,
        title: "Фильм 3",
        poster: "https://placehold.it/200x300",
        description: "Описание фильма 3",
        price: "350",
        time: "19:00",
        rating: 3,
        ageRestriction: "12+",
      },
    ];

    setMovies(fetchedMovies);
  }, []);

  function bookMovie(movieId) {
    // Здесь можно реализовать логику для бронирования фильма
    console.log(`Фильм с id ${movieId} забронирован`);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MovieList movies={movies} bookMovie={bookMovie} />}
        />
        <Route path="admin/customer" element={<AdminCustomer />} />
        <Route path="admin/movielist" element={<AdminMovieList />} />
        <Route path="admin/movieposter" element={<AdminMoviePoster />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

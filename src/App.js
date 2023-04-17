import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./components/Movie/Movie";
import AdminCustomer from "./components/Admin/AdminCustomer/AdminCustomer";
import AdminMovieList from "./components/Admin/AdminMovieList/AdminMovieList";
import AdminMoviePoster from "./components/Admin/AdminMoviePoster/AdminMoviePoster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route exact path="/movies/:date" element={<Movie/>} />
        <Route path="admin/customer" element={<AdminCustomer />} />
        <Route path="admin/movielist" element={<AdminMovieList />} />
        <Route path="admin/movieposter" element={<AdminMoviePoster />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

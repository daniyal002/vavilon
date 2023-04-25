import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList/MovieList";
import MovieItem from "./components/MovieItem/MovieItem";
import AdminCustomer from "./components/Admin/AdminCustomer/AdminCustomer";
import AdminMovieList from "./components/Admin/AdminMovieList/AdminMovieList";
import AdminMoviePoster from "./components/Admin/AdminMoviePoster/AdminMoviePoster";
import io from 'socket.io-client';

const ENDPOINT = 'http://kinovavilon.ru:5000';


function App() {
  React.useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('eventFromClient', 'Hello from client');
    });

    socket.on('eventFromServer', (data) => {
      console.log(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieItem />} />
        <Route path="admin/customer" element={<AdminCustomer />} />
        <Route path="admin/movielist" element={<AdminMovieList />} />
        <Route path="admin/movieposter" element={<AdminMoviePoster />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

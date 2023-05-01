import React from "react";
import style from "./UpdateMovie.module.css";
import { UrlMovie } from "../../../../urls";

const UpdateMovie = ({movieId,setIsModalUpdateOpen}) => {
const [formData, setFormData] = React.useState({
title: "",
year: "",
poster_url: "",
description: "",
genre: "",
rating: 0,
age_limit: 0,
trailer_url: "",
});

React.useEffect(()=>{
    const fetchData = async () =>{
        try {
            const response = await fetch(UrlMovie + "/" + movieId);
            const data = await response.json();
            setFormData({
                title: data.title,
                year: data.year,
                poster_url: data.poster_url,
                description: data.description,
                genre: data.genre,
                rating: data.rating,
                age_limit: data.age_limit,
                trailer_url: data.trailer_url
            })
        } catch (error) {
            
        }
    }
    fetchData();
},[])

const updateMovieToDB = async (movie) => {
    try {
        const response = await fetch(UrlMovie + "/" + movieId, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
        });
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Data was successfully updated in the database:", data);
    } catch (error) {
        console.error("There was a problem updating data in the database:", error);
    }
};

    const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: id === "rating" || id === "age_limit" ? parseInt(value) : value,
    }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMovieToDB(formData);
    };
    return (
        <div className={style.updateMovie}>
      
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Название фильма:</label>
        <input
         className={style.updateMovieInputText}
         type="text"
         id="title"
         value={formData.title}
         onChange={handleInputChange}
       />
        <label htmlFor="title">Год:</label>
        <input
         className={style.updateMovieInputYear}
         type="text"
         id="year"
         value={formData.year}
         onChange={handleInputChange}
       />
         <label htmlFor="poster_url">Постер:</label>
      <input
        className={style.updateMovieInputPoster}
        type="text"
        id="poster_url"
        value={formData.poster_url}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Описание:</label>
      <textarea
        className={style.updateMovieInputTextArea}
        id="description"
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="poster_url">Жанр:</label>
      <input
        className={style.updateMovieInputGenre}
        type="text"
        id="genre"
        value={formData.genre}
        onChange={handleInputChange}
      />

      <label htmlFor="rating">Рейтинг:</label>
      <input
        className={style.updateMovieInputRating}
        type="number"
        id="rating"
        value={formData.rating}
        onChange={handleInputChange}
      />

      <label htmlFor="age_limit">Возрастное ограничение:</label>
      <input
        className={style.updateMovieInputAgeLimit}
        type="number"
        id="age_limit"
        value={formData.age_limit}
        onChange={handleInputChange}
      />
      
      <label htmlFor="trailer_url">Трейлер:</label>
          <input
            className={style.updateMovieInputTrailerUrl}
            type="text"
            id="trailer_url"
            value={formData.trailer_url}
            onChange={handleInputChange}
          />

          <button   className={style.updateMovieButtonBD} type="submit">
            Изменить
          </button>
          <button
            onClick={() => setIsModalUpdateOpen(false)}
            className={style.updateMovieClose}
          >
             
            Закрыть форму
          </button>
        </form>
    </div>
  );
};

export default UpdateMovie;
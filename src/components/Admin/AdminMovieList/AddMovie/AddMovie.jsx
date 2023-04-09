import React from 'react';
import style from './AddMovie.module.css';

const AddMovie = () => {
  const [addMovie, setAddMovie] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    poster_url: '',
    description: '',
    rating: 0,
    age_limit: '',
    trailer_url: '',
  });

  const addMovieToDB = async (movie) => {
    try {
      console.log(movie);
      const response = await fetch('http://localhost:3000/filmslist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data was successfully added to the database:', data);
    } catch (error) {
      console.error('There was a problem adding data to the database:', error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: id === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMovieToDB(formData);
  };
  return (
    <div className={style.addMovie}>
      <button onClick={() => setAddMovie(true)}>Добавить фильм</button>
      {addMovie && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Название фильма:</label>
          <input
            className={style.addMovieInputText}
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="poster">Постер:</label>
          <input
            className={style.addMovieInputPoster}
            type="text"
            id="poster"
            value={formData.poster_url}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Описание:</label>
          <textarea
            className={style.addMovieInputTextArea}
            id="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="rating">Рейтинг:</label>
          <input
            className={style.addMovieInputRating}
            type="number"
            id="rating"
            value={parseInt(formData.rating)}
            onChange={handleInputChange}
          />

          <label htmlFor="age_restriction">Возрастное ограничение:</label>
          <input
            className={style.addMovieInputAgeLimit}
            type="text"
            id="age_restriction"
            value={formData.age_limit}
            onChange={handleInputChange}
          />

          <label htmlFor="trailer">Трейлер:</label>
          <input
            className={style.addMovieInputTrailerUrl}
            type="text"
            id="trailer"
            value={formData.trailer_url}
            onChange={handleInputChange}
          />

          <button type="submit">Добавить</button>
          <button onClick={() => setAddMovie(false)}> Закрыть форму</button>
        </form>
      )}
    </div>
  );
};

export default AddMovie;

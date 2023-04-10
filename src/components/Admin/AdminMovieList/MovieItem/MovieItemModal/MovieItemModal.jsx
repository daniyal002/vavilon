import React from "react";
import style from "./MovieItemModal.module.css";

const MovieItemModal = ({ setIsModalOpen, title, movieId }) => {
  const URL = "http://192.168.24.148:5000/sessions/";

  const [formData, setFormData] = React.useState({
    price: "",
    time: "",
    date: "",
  });
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [id]: value,
    }));
  };
  const handleSave = async () => {
    console.log(formData, movieId);

    // сохранение данных в базу данных или отправка на сервер
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          time: formData.time,
          date: formData.date,
          price: formData.price,
        }),
      });
      if (response.ok) {
        console.log("Новый сеанс успешно добавлен");
        setIsModalOpen(false);
      } else {
        console.error(
          "Ошибка при добавлении нового сеанса:",
          response.statusText
        );
      }
    } catch (error) {
      console.log("Ошибка при отправке запроса:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Добавить фильм: {title}</h2>
        <label htmlFor="price">Цена:</label>
        <input
          className={style.modalContentInputText}
          type="text"
          id="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="time">Время:</label>
        <input
          className={style.modalContentInputTime}
          type="time"
          id="time"
          value={formData.time}
          onChange={handleInputChange}
        />

        <label htmlFor="date">Дата:</label>
        <input
          className={style.modalContentInputDate}
          type="date"
          id="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <button onClick={handleSave}>Добавить</button>
        <button onClick={() => setIsModalOpen(false)}>Отмена</button>
      </div>
    </div>
  );
};

export default MovieItemModal;

import React from "react";
import style from "./PosterItemModal.module.css";
import { UrlSession } from "../../../../../urls";

const PosterItemModal = ({
  setIsModalOpen,
  title,
  posterId,
  time,
  date,
  price,
}) => {
  const URL = "http://90.156.210.4:5000/sessions/";

  const [updateSessions, setUpdateSessions] = React.useState({
    price: "",
    time: "",
    date: "",
  });

  React.useEffect(() => {
    setUpdateSessions({
      price: price,
      time: time,
      date: date,
    });
  }, [price, time, date]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUpdateSessions((updateSessions) => ({
      ...updateSessions,
      [id]: value,
    }));
  };
  const handleSave = async () => {
    // сохранение данных в базу данных или отправка на сервер
    try {
      const response = await fetch(UrlSession + "/" + posterId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: updateSessions.time,
          date: updateSessions.date,
          price: updateSessions.price,
        }),
      });
      if (response.ok) {
        console.log("Сеанс успешно Изменен");
        setIsModalOpen(false);
      } else {
        console.error("Ошибка при изменении сеанса:", response.statusText);
      }
    } catch (error) {
      console.log("Ошибка при отправке запроса:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Изменить афишу: {title}</h2>
        <label htmlFor="price">Цена:</label>
        <input
          className={style.modalContentInputText}
          type="text"
          id="price"
          value={updateSessions.price}
          onChange={handleInputChange}
        />

        <label htmlFor="time">Время:</label>
        <input
          className={style.modalContentInputTime}
          type="time"
          id="time"
          value={updateSessions.time}
          onChange={handleInputChange}
        />

        <label htmlFor="date">Дата:</label>
        <input
          className={style.modalContentInputDate}
          type="date"
          id="date"
          value={updateSessions.date}
          onChange={handleInputChange}
        />

        <button onClick={handleSave}>Изменить</button>
        <button onClick={() => setIsModalOpen(false)}>Отмена</button>
      </div>
    </div>
  );
};

export default PosterItemModal;

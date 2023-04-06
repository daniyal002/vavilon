import React, { useState } from "react";
import style from "./Booking.module.css";

const Booking = (props) => {
  const currentTime = new Date();
  const [hours, minutes] = props.time.split(":");
  const showTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    hours,
    minutes
  );

  const [isBooked, setIsBooked] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const handleBookMovie = () => {
    setIsBookingInProgress(true);

    // Делаем запрос на сервер и бронируем фильм

    setIsBooked(true);
    setIsBookingInProgress(false);
  };

  return (
    <>
      {showTime < currentTime ? (
        <button className={style.movieBtnD} disabled>
          Сеанс завершен
        </button>
      ) : !isBooked ? (
        <div className={style.bookingT}>
          <input
            type="text"
            placeholder="Имя"
            id="name"
            className={style.bookingName}
          />
          <input
            className={style.bookingPhone}
            type="tel"
            name="phone"
            id="phone"
            placeholder="+7(XXX)-XXX-XX-XX"
          />
          <button
            className={style.bookingBtn}
            disabled={isBookingInProgress}
            onClick={handleBookMovie}
          >
            {isBookingInProgress ? "Бронирование..." : "Бронировать"}
          </button>
        </div>
      ) : (
        <div className={style.bookingOk}>
          <h2 className={style.bookingOkHeader}>Фильм забронирован!</h2>
          <p className={style.bookingOkText}>
            Оплатите билет назвав свое имя или номер, когда придете в кинотеатр
          </p>
        </div>
      )}
    </>
  );
};

export default Booking;

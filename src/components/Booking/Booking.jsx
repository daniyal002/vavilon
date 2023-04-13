import React, { useState } from "react";
import style from "./Booking.module.css";
import check from "../../assets/icons/check.svg";

const Booking = (props) => {
  const URL = "http://90.156.210.4:5000/orders";

  const [booking, setBooking] = React.useState({
    name: "",
    phone: "",
  });

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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setBooking((booking) => ({
      ...booking,
      [id]: value,
    }));
  };

  const handleBookMovie = async () => {
    setIsBookingInProgress(true);

    // Делаем запрос на сервер и бронируем фильм

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: props.sessionId,
          customer_name: booking.name,
          customer_phone: booking.phone,
        }),
      });
      if (response.ok) {
        console.log("Бронироавние прошло успешно");
      } else {
        console.error("Ошибка при бронировании:", response.statusText);
      }
    } catch (error) {
      console.log("Ошибка при отправке запроса:", error);
    }
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
            onChange={handleInputChange}
          />
          <input
            className={style.bookingPhone}
            type="tel"
            name="phone"
            id="phone"
            placeholder="+7(XXX)-XXX-XX-XX"
            onChange={handleInputChange}
          />
          <button
            className={style.bookingBtn}
            disabled={isBookingInProgress}
            onClick={handleBookMovie}
          >
            {isBookingInProgress ? "Бронирование..." : "Забронировать"}
          </button>
        </div>
      ) : (
        <div className={style.bookingOk}>
          <h2 className={style.bookingOkHeader}>Бронь принята <img className={style.bookingOkHeaderCheck} src={check} alt="Галочка" width='20'/></h2>
          <p className={style.bookingOkText}>
            Оплата производится на месте. <br/>На кассе назовите ваше имя или номер телефона
          </p>
        </div>
      )}
    </>
  );
};

export default Booking;

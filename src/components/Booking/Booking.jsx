import React, { useState } from "react";
import style from "./Booking.module.css";
import check from "../../assets/icons/check.svg";
import { UrlOrder } from "../../urls";

const Booking = (props) => {
  const [booking, setBooking] = React.useState({
    name: "",
    phone: "",
  });

  const currentTime = new Date();
  const [hours, minutes] = props.time ? props.time.split(":") : [0, 0];
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

  const bookMovie = (sessionId, booking) => {
    const storedBookings = JSON.parse(localStorage.getItem(sessionId)) || {};
    const updatedBookings = {
      ...storedBookings,
      [booking.id]: {
        ...booking,
        id: sessionId, // Set the id of the booking to the sessionId
      },
    };
    localStorage.setItem(sessionId, JSON.stringify(updatedBookings));
  };

  const handleBookMovie = async () => {
    setIsBookingInProgress(true);

    try {
      const response = await fetch(UrlOrder, {
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
        bookMovie(props.sessionId, booking);
        setIsBooked(true);
        console.log("Бронирование прошло успешно");
      } else {
        console.error("Ошибка при бронировании:", response.statusText);
      }
    } catch (error) {
      console.log("Ошибка при отправке запроса:", error);
    }
    setIsBookingInProgress(false);
  };

  React.useEffect(() => {
    const storedBooking =
      JSON.parse(localStorage.getItem(props.sessionId)) || {};
    if (storedBooking[booking.id]) {
      setIsBooked(true);
    }
  }, [booking.id, props.sessionId]);

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
          <h2 className={style.bookingOkHeader}>
            Бронь принята{" "}
            <img
              className={style.bookingOkHeaderCheck}
              src={check}
              alt="Галочка"
              width="20"
            />
          </h2>
          <p className={style.bookingOkText}>
            Оплата производится на месте. <br />
            На кассе назовите ваше имя или номер телефона
          </p>
        </div>
      )}
    </>
  );
};

export default Booking;

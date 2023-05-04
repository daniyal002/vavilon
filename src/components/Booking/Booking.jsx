import React, { useState } from "react";
import style from "./Booking.module.css";
import check from "../../assets/icons/check.svg";
import { UrlOrder, UrlSession } from "../../urls";

const Booking = (props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [booking, setBooking] = React.useState({
    name: "",
    phone: "",
    countPerson: 0,
  });

  const [totalPrice, setTotalPrice] = React.useState(props.price);
  const [dates, setDates] = React.useState();
  const [bookedSeats, setBookedSeats] = useState(0);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(UrlOrder);
        const data = await response.json();

        // Фильтрация заказов по sessionId
        const ordersForSession = data.filter(
          (order) => order.sessionId === props.sessionId
        );

        // Подсчет общего количества занятых мест
        const totalBookedSeats = ordersForSession.reduce(
          (total, order) => total + order.seats,
          0
        );

        setBookedSeats(totalBookedSeats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [props.sessionId]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlSession + "/" + props.sessionId);
        const data = await response.json();
        setDates(data.date);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const currentTime = new Date();
  const dateParts = dates ? dates.split("-") : [0, 0, 0];
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const [hours, minutes] = props.time ? props.time.split(":") : [0, 0];
  const showTime = new Date(year, month, day, hours, minutes);

  const [isBooked, setIsBooked] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const [countPerson, setCountPerson] = useState(1);
  React.useEffect(() => {
    setTotalPrice(countPerson * props.price);
  }, [countPerson]);
  const handleIncrement = () => {
    if (countPerson < 40 - bookedSeats) {
      setCountPerson(countPerson + 1);
    }
  };

  const handleDecrement = () => {
    if (countPerson > 1) {
      setCountPerson(countPerson - 1);
    }
  };

  const handleInputCountPersonChange = (event) => {
    const { id, value } = event.target;
    setBooking((booking) => ({
      ...booking,
      [id]: id === "countPerson" ? parseInt(value) : value,
    }));
  };

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
    setIsModalOpen(false);
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
          seats: countPerson,
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
    <div className={style.booking}>
      {showTime < currentTime ? (
        <button className={style.movieBtnD} disabled>
          Сеанс завершен
        </button>
      ) : !isBooked ? (
        <div className={style.bookingT}>
          <button
            className={style.bookingOpenModal}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Забронировать
          </button>
          {isModalOpen && (
            <div className={style.modalBooking}>
              <div className={style.modalBookingForm}>
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
                <div className={style.bookingSeats}>
                  <input
                    className={style.bookingCountPerson}
                    type="number"
                    name="countPerson"
                    id="countPerson"
                    placeholder="Количество человек"
                    value={countPerson}
                    onChange={handleInputCountPersonChange}
                    min={1}
                    max={40 - bookedSeats}
                  />

                  <button
                    className={style.bookingSeatsPlus}
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                  <button
                    className={style.bookingSeatsMinus}
                    onClick={handleDecrement}
                  >
                    -
                  </button>

                  <span className={style.bookingTotalPrice}>
                    Сумма: {totalPrice.toString().replace(".00", "")} ₽
                  </span>
                </div>

                <button
                  className={style.bookingBtn}
                  disabled={isBookingInProgress}
                  onClick={handleBookMovie}
                >
                  {isBookingInProgress ? "Бронирование..." : "Забронировать"}
                </button>

                <button
                  className={style.BookingCloseModal}
                  onClick={() => setIsModalOpen(false)}
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={style.bookingOk}>
          <h2 className={style.bookingOkHeader}>
            Бронь принята
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
    </div>
  );
};

export default Booking;

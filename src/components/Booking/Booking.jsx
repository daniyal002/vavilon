import React, { useState } from 'react';
import style from './Booking.module.css';
import check from '../../assets/icons/check.svg';
import { UrlOrder, UrlSession } from '../../urls';

const Booking = (props) => {
  const [booking, setBooking] = React.useState({
    name: '',
    phone: '',
    countPerson: 0,
  });

  const [totalPrice, setTotalPrice] = React.useState(props.price);
  const [dates, setDates] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlSession + '/' + props.sessionId);
        const data = await response.json();
        setDates(data.date);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const currentTime = new Date();
  const dateParts = dates ? dates.split('-') : [0, 0, 0];
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const [hours, minutes] = props.time ? props.time.split(':') : [0, 0];
  const showTime = new Date(year, month, day, hours, minutes);

  const [isBooked, setIsBooked] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const handleInputCountPersonChange = (event) => {
    setTotalPrice(event.target.value * props.price);
    const { id, value } = event.target;
    setBooking((booking) => ({
      ...booking,
      [id]: id === 'countPerson' ? parseInt(value) : value,
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
    setIsBookingInProgress(true);

    try {
      const response = await fetch(UrlOrder, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: props.sessionId,
          customer_name: booking.name,
          customer_phone: booking.phone,
          seats: booking.countPerson,
        }),
      });
      if (response.ok) {
        bookMovie(props.sessionId, booking);
        setIsBooked(true);
        console.log('Бронирование прошло успешно');
      } else {
        console.error('Ошибка при бронировании:', response.statusText);
      }
    } catch (error) {
      console.log('Ошибка при отправке запроса:', error);
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
          <div className={style.bookingSeats}>
            <input
              className={style.bookingCountPerson}
              type="number"
              name="countPerson"
              id="countPerson"
              placeholder="Количество человек"
              onChange={handleInputCountPersonChange}
              min={1}
              max={40}
            />
            <span className={style.bookingTotalPrice}>
              Сумма: {totalPrice.toString().replace('.00', '')} ₽
            </span>
          </div>

          <button
            className={style.bookingBtn}
            disabled={isBookingInProgress}
            onClick={handleBookMovie}
          >
            {isBookingInProgress ? 'Бронирование...' : 'Забронировать'}
          </button>
        </div>
      ) : (
        <div className={style.bookingOk}>
          <h2 className={style.bookingOkHeader}>
            Бронь принята{' '}
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

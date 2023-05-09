import React, { useState, useEffect } from 'react';
import style from './AdminCustomer.module.css';
import CustomerItem from './CustomerItem/CustomerItem';
import AdminSlidebar from '../AdminSlidebar/AdminSlidebar';
import { UrlOrder } from '../../../urls';

function AdminCustomer() {
  const [ordersData, setOrdersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(UrlOrder);
        const data = await response.json();

        // Создание объекта с массивами заказов по sessionId
        const ordersBySessionId = data.reduce((acc, order) => {
          if (!acc[order.sessionId]) {
            acc[order.sessionId] = [];
          }

          acc[order.sessionId].push(order);
          return acc;
        }, {});

        setOrdersData(ordersBySessionId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = async (ordersId) => {
    try {
      const response = await fetch(UrlOrder + '/' + ordersId, {
        method: 'DELETE',
      });
      const data = response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminSlidebar />
      <div className={style.adminCustomer}>
        {/* Цикл по каждому sessionId */}
        {Object.keys(ordersData).map((sessionId) => {
          const sessionOrders = ordersData[sessionId];
          const totalSeats = sessionOrders.reduce(
            (total, order) => total + order.seats,
            0
          );

          return (
            <div key={sessionId} className={style.adminCustomerSessionId}>
              {/* Отображение sessionId */}
              <CustomerItem sessionId={sessionId} countPerson={totalSeats} />
              {/* Цикл по каждому заказу с текущим sessionId */}
              <table className={style.adminTable}>
                <thead className={style.adminTableHeader}>
                  <tr className={style.adminTableHeaderRow}>
                    <th className={style.adminTableHeaderHead}>
                      Номер телефона
                    </th>
                    <th className={style.adminTableHeaderHead}>
                      Количество мест
                    </th>

                    <th className={style.adminTableHeaderHead}>Действия</th>
                  </tr>
                </thead>
                <tbody className={style.adminTableBody}>
                  {ordersData[sessionId].map((order) => {
                    return (
                      <tr key={order.id} className={style.adminTableBodyRow}>
                        <td className={style.adminTableBodyColumn}>
                          <div className={style.adminCustomerPhone}>
                            {order.customer_phone}
                          </div>
                        </td>

                        <td className={style.adminTableBodyColumn}>
                          <div className={style.adminCustomerPersonCount}>
                            {order.seats}
                          </div>
                        </td>

                        <td className={style.adminTableBodyColumn}>
                          <button
                            onClick={() => deleteCustomer(order.id)}
                            className={style.AdminCustomerButtonDelete}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AdminCustomer;

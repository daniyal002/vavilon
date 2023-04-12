import React, { useState, useEffect } from "react";
import style from "./AdminCustomer.module.css";
import CustomerItem from "./CustomerItem/CustomerItem";
import AdminSlidebar from "../AdminSlidebar/AdminSlidebar";

function AdminCustomer() {
  const URLOrders = "http://90.156.210.4:5000/orders/";

  const [ordersData, setOrdersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URLOrders);
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
      const response = await fetch(URLOrders + ordersId, {
        method: "DELETE",
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
        {Object.keys(ordersData).map((sessionId) => (
          <div key={sessionId} className={style.adminCustomerSessionId}>
            {/* Отображение sessionId */}
            <CustomerItem sessionId={sessionId} />
            {/* Цикл по каждому заказу с текущим sessionId */}
            <table className={style.adminTable}>
              <thead className={style.adminTableHeader}>
                <tr className={style.adminTableHeaderRow}>
                  <th className={style.adminTableHeaderHead}>Имя</th>
                  <th className={style.adminTableHeaderHead}>Номер телефона</th>
                  <th className={style.adminTableHeaderHead}>Действия</th>
                </tr>
              </thead>
              <tbody className={style.adminTableBody}>
                {ordersData[sessionId].map((order) => (
                  <tr key={order.id} className={style.adminTableBodyRow}>
                    <td className={style.adminTableBodyColumn}>
                      <div className={style.adminCustomerName}>
                        {order.customer_name}
                      </div>
                    </td>

                    <td className={style.adminTableBodyColumn}>
                      <div className={style.adminCustomerPhone}>
                        {order.customer_phone}
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
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminCustomer;

import React, { useState, useEffect } from 'react';

function AdminCustomer() {
  const URLOrders = 'http://localhost:5000/orders';

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

  return (
    <div>
      {/* Цикл по каждому sessionId */}
      {Object.keys(ordersData).map((sessionId) => (
        <div key={sessionId}>
          {/* Отображение sessionId */}
          <h3>Session ID: {sessionId}</h3>

          {/* Цикл по каждому заказу с текущим sessionId */}
          {ordersData[sessionId].map((order) => (
            <div key={order.id}>
              <div>Customer name: {order.customer_name}</div>
              <div>Customer phone: {order.customer_phone}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminCustomer;

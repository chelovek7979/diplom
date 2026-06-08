import { useEffect, useState } from "react";
import "./FullOrdersView.scss";

export default function FullOrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://diplom-1-54sb.onrender.com/api/orders/full"
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-view">
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="orders-view">
      <div className="orders-view__header">
        
        <span>Всего заказов: {orders.length}</span>
      </div>

      <div className="orders-view__table-wrapper">
        <table className="orders-view__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Логин</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Сумма</th>
              <th>Товаров</th>
              <th>Скидка</th>
              <th>Оплата</th>
              <th>Статус</th>
              <th>Этап</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>
                  {new Date(order.created_at).toLocaleDateString("ru-RU")}
                </td>

                <td>{order.user_login}</td>

                <td>{order.user_full_name}</td>

                <td>{order.user_number}</td>

                <td>{order.total_sum} ₽</td>

                <td>{order.items_count}</td>

                <td>
                  {order.discont === "TRUE" ? "Да" : "Нет"}
                </td>

                <td>{order.payment_method}</td>

                <td>{order.status}</td>

                <td>
                  <span className={`stage stage--${order.stage}`}>
                    {order.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
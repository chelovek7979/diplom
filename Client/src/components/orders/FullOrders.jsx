import React, { useEffect, useState } from "react";
import "./fullOrders.scss";

const API_URL = "https://diplom-1-54sb.onrender.com/api/orders/full";
const UPDATE_URL = "https://diplom-1-54sb.onrender.com/api/orders";

const STAGES = [
  "новый",
  "ожидает получение",
  "нужно связаться",
  "завершено",
];

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedStage, setSelectedStage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Ошибка загрузки заказов");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (order) => {
    setEditingId(order.id);
    setSelectedStage(order.stage);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSelectedStage("");
  };

  const saveStage = async (id) => {
    try {
      const response = await fetch(`${UPDATE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: selectedStage }),
      });

      if (!response.ok) throw new Error("Не удалось обновить статус");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, stage: selectedStage } : order
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении статуса");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.user_full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="orders">
      <div className="orders__header">
        <h2>Заказы</h2>
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="orders__search"
        />
      </div>

      <div className="orders__table-wrapper">
        <table className="orders__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Stage</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_full_name}</td>
                  <td>{order.user_number}</td>
                  <td>
                    {editingId === order.id ? (
                      <select
                        value={selectedStage}
                        onChange={(e) => setSelectedStage(e.target.value)}
                      >
                        {STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    ) : (
                      order.stage
                    )}
                  </td>
                  <td>
                    {editingId === order.id ? (
                      <div className="orders__actions">
                        <button
                          className="btn btn--save"
                          onClick={() => saveStage(order.id)}
                        >
                          Сохранить
                        </button>
                        <button
                          className="btn btn--cancel"
                          onClick={cancelEdit}
                        >
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn--edit"
                        onClick={() => startEdit(order)}
                      >
                        Редактировать
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="orders__empty">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
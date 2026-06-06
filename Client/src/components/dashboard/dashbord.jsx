import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
    const [general, setGeneral] = useState({ totalOrders: 0, totalRevenue: 0, avgCheck: 0 });
    const [dailySales, setDailySales] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [filter, setFilter] = useState({ from: "", to: "" });
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        // Общая статистика
        fetch("https://diplom-1-54sb.onrender.com/api/stats/general")
            .then(res => res.json())
            .then(data => setGeneral(data));

        // Продажи по дням
        fetch("https://diplom-1-54sb.onrender.com/api/stats/daily-sales")
            .then(res => res.json())
            .then(data => setDailySales(data));

        // Топ пользователей
        fetch("https://diplom-1-54sb.onrender.com/api/stats/top-users")
            .then(res => res.json())
            .then(data => setTopUsers(data));
    }, []);

    // Фильтрация по дате
    const fetchFilteredOrders = () => {
        if (!filter.from || !filter.to) return;
        fetch(`https://diplom-1-54sb.onrender.com/api/orders/stats/by-date?from=${filter.from}&to=${filter.to}`)
            .then(res => res.json())
            .then(data => setFilteredOrders(data));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Дашборд</h2>

            {/* Общая статистика */}
            <div className="grid">
                <div className="card">
                    <h3>Заказы</h3>
                    <p>{general.totalOrders}</p>
                </div>
                <div className="card">
                    <h3>Выручка</h3>
                    <p>{general.totalRevenue.toFixed(2)} ₽</p>
                </div>
                <div className="card">
                    <h3>Средний чек</h3>
                    <p>{general.avgCheck.toFixed(2)} ₽</p>
                </div>
            </div>

            {/* График продаж */}
            <h3>Продажи по дням (последние 30 дней)</h3>
            <Line
                data={{
                    labels: dailySales.map(d => d.date),
                    datasets: [
                        {
                            label: "Выручка",
                            data: dailySales.map(d => d.revenue),
                            borderColor: "blue",
                            backgroundColor: "rgba(0,0,255,0.2)"
                        },
                        {
                            label: "Количество заказов",
                            data: dailySales.map(d => d.ordersCount),
                            borderColor: "green",
                            backgroundColor: "rgba(0,255,0,0.2)"
                        }
                    ]
                }}
            />

            {/* Топ пользователей */}
            <h3>Топ пользователей по сумме заказов</h3>
            <table>
                <thead>
                    <tr>
                        <th>Пользователь</th>
                        <th>Всего потрачено</th>
                        <th>Количество заказов</th>
                    </tr>
                </thead>
                <tbody>
                    {topUsers.map(u => (
                        <tr key={u.user_login}>
                            <td>{u.user_login}</td>
                            <td>{u.totalSpent.toFixed(2)} ₽</td>
                            <td>{u.ordersCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Фильтр по дате */}
            <h3>Фильтр заказов по дате</h3>
            <input type="date" value={filter.from} onChange={e => setFilter({ ...filter, from: e.target.value })} />
            <input type="date" value={filter.to} onChange={e => setFilter({ ...filter, to: e.target.value })} />
            <button onClick={fetchFilteredOrders}>Применить</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Сумма</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.user_login}</td>
                            <td>{o.total_sum.toFixed(2)} ₽</td>
                            <td>{new Date(o.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
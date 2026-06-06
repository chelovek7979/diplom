import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
    const [general, setGeneral] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        avgCheck: 0
    });
    const [dailySales, setDailySales] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [filter, setFilter] = useState({ from: "", to: "" });
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        fetch("https://diplom-1-54sb.onrender.com/api/orders/general")
            .then(res => res.json())
            .then(data => {
                setGeneral({
                    totalOrders: Number(data.totalOrders || 0),
                    totalRevenue: Number(data.totalRevenue || 0),
                    avgCheck: Number(data.avgCheck || 0)
                });
            });
        fetch("https://diplom-1-54sb.onrender.com/api/orders/daily-sales")
            .then(res => res.json())
            .then(data => {
                setDailySales(
                    data.map(d => ({
                        ...d,
                        revenue: Number(d.revenue || 0),
                        ordersCount: Number(d.ordersCount || 0)
                    }))
                );
            });
        fetch("https://diplom-1-54sb.onrender.com/api/orders/top-users")
            .then(res => res.json())
            .then(data => {
                setTopUsers(
                    data.map(u => ({
                        ...u,
                        totalSpent: Number(u.totalSpent || 0),
                        ordersCount: Number(u.ordersCount || 0)
                    }))
                );
            });
    }, []);

    const fetchFilteredOrders = () => {
        if (!filter.from || !filter.to) return;
        fetch(`https://diplom-1-54sb.onrender.com/api/orders/by-date?from=${filter.from}&to=${filter.to}`)
            .then(res => res.json())
            .then(data => {
                setFilteredOrders(
                    data.map(o => ({
                        ...o,
                        total_sum: Number(o.total_sum || 0)
                    }))
                );
            });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h2>📊 Дашборд</h2>

            {/* KPI-блоки */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {[
                    { title: "Заказы", value: general.totalOrders },
                    { title: "Выручка", value: Number(general.totalRevenue).toFixed(2) + " ₽" },
                    { title: "Средний чек", value: Number(general.avgCheck).toFixed(2) + " ₽" }
                ].map((kpi, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: 1,
                            backgroundColor: "#3b82f6",
                            color: "#fff",
                            padding: "20px",
                            borderRadius: "12px",
                            textAlign: "center",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                        }}
                    >
                        <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>{kpi.title}</h3>
                        <p style={{ fontSize: "28px", margin: 0, fontWeight: "bold" }}>{kpi.value}</p>
                    </div>
                ))}
            </div>

            {/* График */}
            <h3 style={{ marginTop: "40px" }}>Продажи по дням (последние 30 дней)</h3>
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
            <h3 style={{ marginTop: "40px" }}>Топ пользователей по сумме заказов</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f0f0f0" }}>
                        <th style={{ padding: "10px", textAlign: "left" }}>Пользователь</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Всего потрачено</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Количество заказов</th>
                    </tr>
                </thead>
                <tbody>
                    {topUsers.map(u => (
                        <tr key={u.user_login} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>{u.user_login}</td>
                            <td style={{ padding: "10px" }}>{Number(u.totalSpent).toFixed(2)} ₽</td>
                            <td style={{ padding: "10px" }}>{u.ordersCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Фильтр заказов */}
            <h3 style={{ marginTop: "40px" }}>Фильтр заказов по дате</h3>
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="date"
                    value={filter.from}
                    onChange={e => setFilter({ ...filter, from: e.target.value })}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none",
                        fontSize: "14px"
                    }}
                />
                <input
                    type="date"
                    value={filter.to}
                    onChange={e => setFilter({ ...filter, to: e.target.value })}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none",
                        fontSize: "14px"
                    }}
                />
                <button
                    onClick={fetchFilteredOrders}
                    style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Применить
                </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f0f0f0" }}>
                        <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Пользователь</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Сумма</th>
                        <th style={{ padding: "10px", textAlign: "left" }}>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(o => (
                        <tr key={o.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>{o.id}</td>
                            <td style={{ padding: "10px" }}>{o.user_login}</td>
                            <td style={{ padding: "10px" }}>{Number(o.total_sum).toFixed(2)} ₽</td>
                            <td style={{ padding: "10px" }}>{new Date(o.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
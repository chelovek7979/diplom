import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import './dashboard.scss'; // подключаем стили

export default function Dashboard() {
    const [general, setGeneral] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        avgCheck: 0
    });

    const [dailySales, setDailySales] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState({ from: "", to: "" });

    const [stats, setStats] = useState({
        itemsAnalytics: { avgItems: 0, maxItems: 0, totalItems: 0 },
        discounts: { discountPercent: 0 },
        popularPayment: "—"
    });

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

        fetch("https://diplom-1-54sb.onrender.com/api/orders/items-stats")
            .then(res => res.json())
            .then(data => {
                setStats(prev => ({
                    ...prev,
                    itemsAnalytics: {
                        avgItems: Number(data.avgItems || 0),
                        maxItems: Number(data.maxItems || 0),
                        totalItems: Number(data.totalItems || 0)
                    }
                }));
            });

        fetch("https://diplom-1-54sb.onrender.com/api/orders/discount-stats")
            .then(res => res.json())
            .then(data => {
                setStats(prev => ({
                    ...prev,
                    discounts: { discountPercent: Number(data.percent || 0) }
                }));
            });

        fetch("https://diplom-1-54sb.onrender.com/api/orders/popular-payment")
            .then(res => res.json())
            .then(data => {
                setStats(prev => ({
                    ...prev,
                    popularPayment: data?.payment_method || "—"
                }));
            });
    }, []);

    const fetchFilteredOrders = () => {
        if (!filter.from || !filter.to) return;
        fetch(`https://diplom-1-54sb.onrender.com/api/orders/orders-by-date?from=${filter.from}&to=${filter.to}`)
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
        <div className="dashboard">
            <h2 className="text-center">панель показателей</h2>

            {/* KPI-блоки */}
            <div className="kpi-grid">
                {[
                    { title: "Заказы", value: general.totalOrders },
                    { title: "Выручка", value: Number(general.totalRevenue || 0).toFixed(2) + " ₽" },
                    { title: "Средний чек", value: Number(general.avgCheck || 0).toFixed(2) + " ₽" },
                    { title: "Среднее товаров", value: Number(stats.itemsAnalytics.avgItems || 0).toFixed(1) },
                    { title: "Всего товаров", value: stats.itemsAnalytics.totalItems || 0 },
                    { title: "Макс товаров", value: stats.itemsAnalytics.maxItems || 0 },
                    { title: "Заказы со скидкой", value: stats.discounts.discountPercent + "%" },
                    { title: "Популярная оплата", value: stats.popularPayment }
                ].map((kpi, idx) => (
                    <div className="kpi-card" key={idx}>
                        <div className="kpi-title">{kpi.title}</div>
                        <div className="kpi-value">{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* График */}
            <h3 style={{ marginTop: "40px" }}>Продажи по дням</h3>
            <Line
                data={{
                    labels: dailySales.map(d =>
    new Date(d.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit'
    })
),
                    datasets: [
                        {
                            label: "Выручка",
                            data: dailySales.map(d => d.revenue),
                            borderColor: "blue"
                        },
                        {
                            label: "Заказы",
                            data: dailySales.map(d => d.ordersCount),
                            borderColor: "green"
                        }
                    ]
                }}
            />

            {/* Фильтр */}
            <h3 style={{ marginTop: "40px" }}>Фильтр заказов</h3>
            <div className="filter">
                <input
                    type="date"
                    value={filter.from}
                    onChange={e => setFilter({ ...filter, from: e.target.value })}
                />
                <input
                    type="date"
                    value={filter.to}
                    onChange={e => setFilter({ ...filter, to: e.target.value })}
                />
                <button onClick={fetchFilteredOrders}>Применить</button>
            </div>

            {/* Таблица заказов */}
            <div className="table-wrapper">
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
                                <td>{Number(o.total_sum || 0).toFixed(2)} ₽</td>
                                <td>{new Date(o.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
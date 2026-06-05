import { useEffect, useState } from "react";

import './dashboard.scss'

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        avgCheck: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(
                    "https://diplom-1-54sb.onrender.com/api/getStats"
                );

                const data = await res.json();

                const totalOrders = data.length;

                const totalRevenue = data.reduce(
                    (sum, order) => sum + Number(order.total_sum),
                    0
                );

                const avgCheck =
                    totalOrders > 0 ? totalRevenue / totalOrders : 0;

                setStats({
                    totalOrders,
                    totalRevenue,
                    avgCheck
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Дашборд</h2>

            <div className="grid">
                <div className="card">
                    <h3>Заказы</h3>
                    <p>{stats.totalOrders}</p>
                </div>

                <div className="card">
                    <h3>Выручка</h3>
                    <p>{stats.totalRevenue.toFixed(2)} ₽</p>
                </div>

                <div className="card">
                    <h3>Средний чек</h3>
                    <p>{stats.avgCheck.toFixed(2)} ₽</p>
                </div>
            </div>
        </div>
    );
}
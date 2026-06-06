import { db } from "../db.js";

export const createOrder = (req, res) => {
    const {
        total_sum,
        created_at,
        user_login,
        user_full_name,
        user_number,
        discont,
        user_id,
        items_count
    } = req.body;

    const status = 'paid';
    const payment_method = 'mir';

    const query = `
        INSERT INTO orders 
        (total_sum, created_at, user_login, user_full_name, user_number, discont, user_id, items_count, status, payment_method) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        total_sum,
        created_at,
        user_login,
        user_full_name,
        user_number,
        discont,
        user_id,
        items_count,
        status,
        payment_method
    ];

    db.query(query, values, (err, data) => {
        if (err) {
            console.error(err); // Добавим вывод ошибки для отладки
            return res.status(500).json(err);
        }

        return res.json({
            message: "Оплата прошла успешно"
        });
    });
};



// 1. Общая статистика
export const getGeneralStats = (req, res) => {
    const q = `
        SELECT 
            COUNT(*) AS totalOrders,
            SUM(total_sum) AS totalRevenue,
            AVG(total_sum) AS avgCheck
        FROM orders
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

// 2. Продажи по дням
export const getDailySales = (req, res) => {
    const q = `
        SELECT DATE(created_at) AS date, SUM(total_sum) AS revenue, COUNT(*) AS ordersCount
        FROM orders
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
        LIMIT 30
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// 3. Топ пользователей по сумме заказов
export const getTopUsers = (req, res) => {
    const q = `
        SELECT user_login, SUM(total_sum) AS totalSpent, COUNT(*) AS ordersCount
        FROM orders
        GROUP BY user_login
        ORDER BY totalSpent DESC
        LIMIT 10
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// 4. Фильтрация заказов по дате
export const getOrdersByDate = (req, res) => {
    const { from, to } = req.query; // формат YYYY-MM-DD
    const q = `
        SELECT * 
        FROM orders
        WHERE DATE(created_at) BETWEEN ? AND ?
        ORDER BY created_at DESC
    `;
    db.query(q, [from, to], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};
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
import { db } from "../db.js";

export const createOrder = (req, res) => {
    console.log(req.body);
    const {
        total_sum,
        created_at,
        user_login,
        user_full_name,
        user_number,
        discont,
        user_id,
        items_count,
        items // ✅ массив товаров из фронта
    } = req.body;
console.log(req.body);
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

    // 1️⃣ Сначала создаём заказ
    db.query(query, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        // 2️⃣ Уменьшаем количество купленных товаров
        items.forEach(item => {
            db.query(
                `
                UPDATE products
                SET Product_count = Product_count - ?
                WHERE idProduct = ?
                  AND Product_count >= ?
                `,
                [item.count, item.idProduct, item.count],
                (err2, result) => {
                    if (err2) {
                        console.error(`Ошибка обновления товара ${item.idProduct}:`, err2);
                    } else if (result.affectedRows === 0) {
                        console.warn(`Товар ${item.idProduct} не был списан — недостаточно на складе`);
                    }
                }
            );
        });

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

// statsController.js или внутри твоего existing controller файла

// 5. Процент заказов со скидкой
export const getDiscountStats = (req, res) => {
    const q = `
        SELECT
            COUNT(*) AS totalOrders,
            SUM(CASE WHEN discont = 'TRUE' THEN 1 ELSE 0 END) AS discountOrders
        FROM orders
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        const total = result[0].totalOrders;
        const discount = result[0].discountOrders;
        res.json({
            total,
            discount,
            percent: total > 0 ? ((discount / total) * 100).toFixed(1) : 0
        });
    });
};

// 6. Среднее количество товаров в заказе
export const getItemsStats = (req, res) => {
    const q = `
        SELECT 
            AVG(items_count) AS avgItems,
            MAX(items_count) AS maxItems,
            SUM(items_count) AS totalItems
        FROM orders
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

// 7. Популярный метод оплаты
export const getPopularPayment = (req, res) => {
    const q = `
        SELECT payment_method, COUNT(*) AS total
        FROM orders
        GROUP BY payment_method
        ORDER BY total DESC
        LIMIT 1
    `;
    db.query(q, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0] || { payment_method: "Нет данных", total: 0 });
    });
};
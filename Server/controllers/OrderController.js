import { db } from "../db.js";

export const OrderController = {
    async create(req, res) {
        try {
            const { totalSum, items } = req.body;

            const [orderResult] = await db.query(
                `
                INSERT INTO orders
                (total_sum, created_at)
                VALUES (?, NOW())
                `,
                [totalSum]
            );

            const orderId = orderResult.insertId;

            for (const item of items) {
                await db.query(
                    `
                    INSERT INTO order_items
                    (
                        order_id,
                        product_id,
                        product_title,
                        price,
                        quantity
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        orderId,
                        item.productId,
                        item.title,
                        item.price,
                        item.quantity
                    ]
                );
            }

            res.json({
                success: true,
                orderId
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};
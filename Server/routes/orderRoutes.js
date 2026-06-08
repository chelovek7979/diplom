import { Router } from "express";
import { createOrder } from "../controllers/OrderController.js";
import { getGeneralStats, 
    getDailySales, 
    getTopUsers, 
    getOrdersByDate,
    getDiscountStats,
    getItemsStats,
    getFFull,
    updateOrderStage,
    getPopularPayment } from "../controllers/OrderController.js";

const router = Router();

router.post("/create", createOrder);



router.get("/general", getGeneralStats);
router.get("/daily-sales", getDailySales);
router.get("/top-users", getTopUsers);
router.get("/orders-by-date", getOrdersByDate);
router.get("/discount-stats", getDiscountStats);
router.get("/items-stats", getItemsStats);
router.get("/popular-payment", getPopularPayment);
router.get("/full", getFFull);
router.put("/orders/:id", updateOrderStage);








export default router;
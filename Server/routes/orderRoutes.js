import { Router } from "express";
import { createOrder } from "../controllers/OrderController.js";
import { getGeneralStats, getDailySales, getTopUsers, getOrdersByDate } from "../controllers/OrderController.js";

const router = Router();

router.post("/create", createOrder);


router.get("/general", getGeneralStats);
router.get("/daily-sales", getDailySales);
router.get("/top-users", getTopUsers);
router.get("/by-date", getOrdersByDate);







export default router;
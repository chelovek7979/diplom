import { Router } from "express";
import { createOrder } from "../controllers/OrderController.js";

const router = Router();

router.post("/create", createOrder);

export default router;
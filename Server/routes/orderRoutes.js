import { Router } from "express";
import { createOrder,getStats } from "../controllers/OrderController.js";

const router = Router();

router.post("/create", createOrder);
router.get("/getStats", getStats);

export default router;
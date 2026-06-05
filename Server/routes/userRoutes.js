import express from "express";
import { loginUser,register } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", register);

export default router;
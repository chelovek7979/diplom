import express from "express";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config(); // загружает переменные из .env в process.env

const app = express();

app.use(cors());
app.use(express.json());

// Раздаём статические файлы из uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Роуты
app.use("/api/users", userRoutes);
app.use("/api/diplom_bd", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
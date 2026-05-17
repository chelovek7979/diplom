import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Для получения __dirname
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // загружает переменные из .env

const app = express();

// ES-модули не имеют __dirname, вычисляем вручную
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Раздаём статические файлы из uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Роуты
app.use("/api/users", userRoutes);
app.use("/api/diplom_bd", productRoutes); // полный путь → /api/diplom_bd





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);

  console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API key:", process.env.CLOUDINARY_API_KEY);
  console.log("API secret:", process.env.CLOUDINARY_API_SECRET);
  console.log("проврека на ласт изменения");
});
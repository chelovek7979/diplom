import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// статика
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/diplom_bd", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
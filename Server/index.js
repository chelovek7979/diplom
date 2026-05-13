import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// статика для картинок
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);

/* app.use("/uploads/electronics", express.static("uploads"));
app.use("/uploads/kitchen_items", express.static("uploads")); */

app.use("/api/diplom_bd", productRoutes);


app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});


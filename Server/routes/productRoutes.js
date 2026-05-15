import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,           // контроллер без изображения
  createProductWithImage,  // контроллер с Cloudinary
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";


import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Получение товаров
router.get("/", getProducts);
router.get("/:id", getProductById);

// Создание товара с изображением
router.post("/", upload.single("image"), createProductWithImage);

// Обновление и удаление
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
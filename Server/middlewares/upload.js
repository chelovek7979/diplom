// Server/middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // твоя конфигурация Cloudinary


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // папка на Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // твой cloudinary.js

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // папка в Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export const upload = multer({ storage });
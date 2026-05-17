import { db } from "../db.js";

// 📦 Получить все товары
export const getProducts = (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

// 📦 Получить один товар
export const getProductById = (req, res) => {
  const query = "SELECT * FROM products WHERE idProduct = ?";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};

// ➕ Добавить товар с файлом
export const createProductWithImage = (req, res) => {
  try {
    console.log("Контроллер сработал");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Файл обязателен" });
    }

    const Product_image_url = req.file.path; // URL из CloudinaryStorage

    const query = `
      INSERT INTO products 
        (Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        req.body.Product_title,
        req.body.Product_description,
        req.body.Product_price,
        Product_image_url,
        req.body.Product_category,
        req.body.product_count,
      ],
      (err, result) => {
        if (err) {
          console.error("Ошибка базы данных:", err);
          return res.status(500).json({ message: "Ошибка базы данных" });
        }
        res.status(201).json({
          message: "Товар добавлен",
          id: result.insertId,
          image: Product_image_url,
        });
      }
    );
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ message: "Ошибка сервера", error: err.message });
  }
};

// ✏️ Обновить товар
export const updateProduct = (req, res) => {
  const { Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count } = req.body;

  const query =
    "UPDATE products SET Product_title = ?, Product_description = ?, Product_price = ?, Product_image_url = ?, Product_category = ?, product_count = ? WHERE idProduct = ?";

  db.query(query, [Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар обновлён" });
  });
};

// ❌ Удалить товар
export const deleteProduct = (req, res) => {
  const query = "DELETE FROM products WHERE idProduct = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар удалён" });
  });
};
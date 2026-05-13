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

// ➕ Добавить товар
export const createProduct = (req, res) => {
    const { Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count } = req.body;

  const query =
    "INSERT INTO products (Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [Product_title, Product_description, Product_price,Product_image_url, Product_category,product_count ], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар добавлен", id: result.insertId });
  });
};

// ✏️ Обновить товар
export const updateProduct = (req, res) => {
  const { Product_title, Product_description, Product_price, Product_image_url, Product_category, product_count } = req.body;

  const query =
    "UPDATE products SET Product_title = ?, Product_description = ?, Product_price = ?,Product_image_url = ?, Product_category = ?, product_count = ? WHERE  idProduct = ?";

  db.query(query, [Product_title, Product_description,Product_price,Product_image_url,Product_category,product_count,  req.params.id], (err) => {
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
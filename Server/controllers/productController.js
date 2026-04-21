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
  const query = "SELECT * FROM card WHERE id = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};

// ➕ Добавить товар
export const createProduct = (req, res) => {
  const { name, price, image_url } = req.body;

  const query =
    "INSERT INTO card (name, price, image_ull) VALUES (?, ?, ?)";

  db.query(query, [name, price, image_url], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар добавлен", id: result.insertId });
  });
};

// ✏️ Обновить товар
export const updateProduct = (req, res) => {
  const { name, price } = req.body;

  const query =
    "UPDATE card SET name = ?, price = ? WHERE id = ?";

  db.query(query, [name, price, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар обновлён" });
  });
};

// ❌ Удалить товар
export const deleteProduct = (req, res) => {
  const query = "DELETE FROM card WHERE id = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Товар удалён" });
  });
};
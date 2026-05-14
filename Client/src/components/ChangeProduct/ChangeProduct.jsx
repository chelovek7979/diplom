import { useState } from "react";
import "./ChangeProduct.scss";

export default function EditProduct({ product, onClose, onUpdate }) {
  const [Product_title, setProduct_title] = useState(product.Product_title);
  const [Product_price, setProduct_price] = useState(product.Product_price);
  const [Product_image_url, setProduct_image_url] = useState(product.Product_image_url);
  const [Product_description, setProduct_description] = useState(product.Product_description);
  const [Product_category, setProduct_category] = useState(product.Product_category);
  const [product_count, setproduct_count] = useState(product.product_count);

  const [errors, setErrors] = useState([]);

  const categories = ["Электроника", "Инрумент", "Кухня", "Спорт", "Насадки"];

  // ------------------ Сохранение изменений ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (!Product_title.trim()) validationErrors.push("Название обязательно");
    if (!Product_description.trim()) validationErrors.push("Описание обязательно");
    if (!Product_category) validationErrors.push("Категория обязательна");
    if (!Product_price || Number(Product_price) <= 0) validationErrors.push("Цена должна быть больше 0");
    if (!product_count || Number(product_count) <= 0) validationErrors.push("Количество должно быть больше 0");
    if (!Product_image_url.trim()) validationErrors.push("Путь к картинке обязателен");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      const res = await fetch(`https://diplom-1-54sb.onrender.com/api/diplom_bd/${product.idProduct}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Product_title,
          Product_description,
          Product_price,
          Product_image_url,
          Product_category,
          product_count
        }),
      });

      const data = await res.json();
      alert("Товар обновлён!");
      if (onUpdate) onUpdate(); // обновляем список
      onClose(); // закрываем модалку
    } catch (err) {
      console.error(err);
      alert("Ошибка при обновлении товара");
    }
  };

  // ------------------ Удаление товара ------------------
  const handleDelete = async () => {
    if (!window.confirm(`Вы уверены, что хотите удалить "${product.Product_title}"?`)) return;

    try {
      const res = await fetch(`https://diplom-1-54sb.onrender.com/api/diplom_bd/${product.idProduct}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert("Товар удалён!");
      if (onUpdate) onUpdate(); // обновляем список
      onClose(); // закрываем модалку
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении товара");
    }
  };

  return (
    <div className="edit-product-modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <h2>Редактировать товар</h2>

        <input type="text" placeholder="Название" value={Product_title} onChange={e => setProduct_title(e.target.value)} />
        <input type="text" placeholder="Описание" value={Product_description} onChange={e => setProduct_description(e.target.value)} />
        <select value={Product_category} onChange={e => setProduct_category(e.target.value)}>
          <option value="">Выберите категорию</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="number" placeholder="Цена" value={Product_price} onChange={e => setProduct_price(e.target.value)} />
        <input type="number" placeholder="Количество" value={product_count} onChange={e => setproduct_count(e.target.value)} />
        <input type="text" placeholder="Путь к картинке" value={Product_image_url} onChange={e => setProduct_image_url(e.target.value)} />

        {errors.length > 0 && (
          <div className="form-errors">
            <ul>{errors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>
          </div>
        )}

        <div className="form-buttons">
          <button type="submit">Сохранить</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Отмена</button>
          <button type="button" className="delete-btn" onClick={handleDelete}>Удалить</button>
        </div>
      </form>
    </div>
  );
}
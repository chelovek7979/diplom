import { useState } from "react";
import './addProduct.scss'

export default function AddProduct() {
  const [Product_title, setProduct_title] = useState("");
  const [Product_price, setProduct_price] = useState("");
  const [Product_image_url, setProduct_image_url] = useState("");
  const [Product_description, setProduct_description] = useState("");
  const [Product_category, setProduct_category] = useState("");
  const [product_count, setproduct_count] = useState("");

  const [errors, setErrors] = useState([]); 

  const categories = ["electronics", "kitchen_items", "tool", "sport","Snap-in"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    
    if (!Product_title.trim()) validationErrors.push("Название обязательно");
    if (!Product_description.trim()) validationErrors.push("Описание обязательно");
    if (!Product_category) validationErrors.push("Категория обязательна");
    if (!Product_price || Number(Product_price) <= 0)
      validationErrors.push("Цена должна быть больше 0");
    if (!product_count || Number(product_count) <= 0)
      validationErrors.push("Количество должно быть больше 0");
    if (!Product_image_url.trim()) validationErrors.push("Путь к картинке обязателен");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return; 
    }

    setErrors([]); 

    const res = await fetch("https://diplom-1-54sb.onrender.com/api/diplom_bd", {
      method: "POST",
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
    console.log(data);
    alert("Товар успешно добавлен!");
    
    
    setProduct_title("");
    setProduct_description("");
    setProduct_category("");
    setProduct_price("");
    setproduct_count("");
    setProduct_image_url("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={Product_title}
        onChange={(e) => setProduct_title(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
        value={Product_description}
        onChange={(e) => setProduct_description(e.target.value)}
      />

      {/* Выпадающий список категорий */}
      <select
        value={Product_category}
        onChange={(e) => setProduct_category(e.target.value)}
      >
        <option value="">Выберите категорию</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Цена"
        value={Product_price}
        onChange={(e) => setProduct_price(e.target.value)}
      />
      <input
        type="number"
        placeholder="Количество"
        value={product_count}
        onChange={(e) => setproduct_count(e.target.value)}
      />
      <input
        type="text"
        placeholder="Путь к картинке (/uploads/img.jpg)"
        value={Product_image_url}
        onChange={(e) => setProduct_image_url(e.target.value)}
      />
      <button type="submit" className="green">Добавить</button>

      {/* Отображение ошибок */}
      {errors.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
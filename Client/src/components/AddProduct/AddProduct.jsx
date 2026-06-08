import { useState } from "react";
import './addProduct.scss'
import add from '../../assets/add.svg'

export default function AddProduct() {
  const [Product_title, setProduct_title] = useState("");
  const [Product_price, setProduct_price] = useState("");
  const [Product_image_file, setProduct_image_file] = useState(null); // файл вместо пути
  const [Product_description, setProduct_description] = useState("");
  const [Product_category, setProduct_category] = useState("");
  const [product_count, setproduct_count] = useState("");

  const [errors, setErrors] = useState([]); 

  const categories = ["fourclan", "big", "mail", "shoe","archive"];

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
    if (!Product_image_file)
      validationErrors.push("Выберите файл изображения");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return; 
    }

    setErrors([]);

    // Создаем FormData для отправки файла
    const formData = new FormData();
    formData.append("Product_title", Product_title);
    formData.append("Product_description", Product_description);
    formData.append("Product_price", Product_price);
    formData.append("Product_category", Product_category);
    formData.append("product_count", product_count);
    formData.append("image", Product_image_file); // поле "image" должно совпадать с Multer на сервере

    try {
      for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
}
      const res = await fetch("https://diplom-1-54sb.onrender.com/api/diplom_bd", {
        method: "POST",
        body: formData, // Content-Type будет автоматически multipart/form-data
      });
      
      if (!res.ok) {
        const text = await res.text(); // читаем тело ошибки как текст
        console.error("Ошибка сервера:", text);
        alert("Ошибка при добавлении товара. Проверьте консоль.");
        return;
}

      const data = await res.json();
      console.log(data);
      alert("Товар успешно добавлен!");

      // Очищаем форму
      setProduct_title("");
      setProduct_description("");
      setProduct_category("");
      setProduct_price("");
      setproduct_count("");
      setProduct_image_file(null);
      document.getElementById("imageInput").value = ""; // сброс input type=file
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении товара");
    }
  };

  return (
    <div className="add-flex">
    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={Product_title}
          onChange={(e) => setProduct_title(e.target.value)}
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
        <textarea
          type="text"
          
          placeholder="Описание"
          value={Product_description}
          onChange={(e) => setProduct_description(e.target.value)}
        />

        {/* Поле для загрузки файла */}
        <input
        className="setFile"
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={(e) => setProduct_image_file(e.target.files[0])}
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
      <img src={add} alt="" className="add-img" />
    </div>
  );
}
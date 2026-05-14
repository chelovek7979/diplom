import { useState, useEffect } from "react";
import EditProduct from "./ChangeProduct";
import './ChangePanel.scss'

export default function ChangePanel() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Получение товаров с API
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://diplom-1-54sb.onrender.com/api/diplom_bd");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Ошибка при загрузке товаров");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Кнопка редактирования
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  return (
    <div className="admin-panel">
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th className="left">Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr  key={p.id}>
              <td className="centre"> {p.idProduct}</td>
              <td>{p.Product_title}</td>
              <td className="centre">{p.Product_category}</td>
              <td className="centre">{p.Product_price}</td>
              <td className="centre">{p.product_count}</td>
              <td>
                <button onClick={() => handleEditClick(p)}>Редактировать</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEdit && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setShowEdit(false)}
          onUpdate={fetchProducts}
        />
      )}
    </div>
  );
}
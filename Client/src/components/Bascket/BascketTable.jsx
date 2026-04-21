import { useCart } from "../Card-contecst/CartProvider";
import { useMemo } from "react"; // Добавьте импорт
import './Bascket.scss'

export default function BasketTable() {
  const { cart, updateCart } = useCart();
  const items = Object.values(cart);

  // Подсчет общей суммы
  const totalSum = useMemo(() => {
    return items.reduce((sum, { product, count }) => {
      return sum + (product.Product_price * count);
    }, 0);
  }, [items]);

  return (
    <table>
      <thead>
        <tr>
          <th>Товар</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
      </thead>

      <tbody>
        {items.map(({ product, count }) => (
          <tr key={product.idProduct}>
            <td data-label="Товар">{product.Product_title}</td>
            <td data-label="Цена">{product.Product_price} ₽</td>
            <td data-label="Количество">
              <button onClick={() => updateCart(product, count - 1)}>-</button>
              {count}
              <button onClick={() => updateCart(product, count + 1)}>+</button>
            </td>
            <td data-label="Сумма">{product.Product_price * count} ₽</td>
          </tr>
        ))}

        {/* Итоговая строка */}
        <tr className="total-row">
          <td  data-label="Итого" colSpan="3">Общая сумма:</td>
          <td  data-label="Сумма" className="total">{totalSum} ₽</td>
        </tr>
      </tbody>
    </table>
  );
}
import { useCart } from "../Card-contecst/CartProvider";
import { useMemo } from "react";
import './Bascket.scss'

export default function BasketTable() {
  const { cart, updateCart } = useCart();
  const items = Object.values(cart);

  // Подсчет общей суммы с учетом скидки
  const totalSum = useMemo(() => {
    return items.reduce((sum, { product, count }) => {
      const pricePerUnit = count > 100 ? product.Product_price * 0.9 : product.Product_price;
      return sum + pricePerUnit * count;
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
        {items.map(({ product, count }) => {
          const pricePerUnit = count > 100 ? product.Product_price * 0.9 : product.Product_price;
          const total = pricePerUnit * count;

          return (
            <tr key={product.idProduct}>
              <td data-label="Товар">{product.Product_title}</td>
              <td data-label="Цена">
                {pricePerUnit.toFixed(2)} ₽
                {count > 100 && <span className="discount"> (скидка 10%)</span>}
              </td>
              <td data-label="Количество">
                <button onClick={() => updateCart(product, count - 1)}>-</button>
                {count}
                <button onClick={() => updateCart(product, count + 1)}>+</button>
              </td>
              <td data-label="Сумма">{total.toFixed(2)} ₽</td>
            </tr>
          );
        })}

        {/* Итоговая строка */}
        <tr className="total-row">
          <td data-label="Итого" colSpan="3">Общая сумма:</td>
          <td data-label="Сумма" className="total">{totalSum.toFixed(2)} ₽</td>
        </tr>
      </tbody>
    </table>
  );
}
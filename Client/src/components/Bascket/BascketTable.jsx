import { useCart } from "../Card-contecst/CartProvider";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // <-- добавляем
import './Bascket.scss'

export default function BasketTable() {
  const { cart, updateCart, clearCart } = useCart();
  const navigate = useNavigate(); // <-- для перенаправления
  const items = Object.values(cart);

  const totalSum = useMemo(() => {
    return items.reduce((sum, { product, count }) => {
      const pricePerUnit = count > 100 ? product.Product_price * 0.9 : product.Product_price;
      return sum + pricePerUnit * count;
    }, 0);
  }, [items]);


  const outOfStock = items.filter(item => item.count > item.product.Product_count);
if (outOfStock.length) {
    alert(`Недостаточно товара: ${outOfStock.map(i => i.product.Product_title).join(', ')}`);
    return;
}



const handlePayment = async () => {
    const userRaw = localStorage.getItem("user");

    let user = null;

    try {
        user = JSON.parse(userRaw);
    } catch {
        user = null;
    }

    // 1️⃣ Если пользователь не авторизован
    if (!user) {
        const goRegister = window.confirm(
            "Вы не авторизованы. Чтобы продолжить оплату, нужно зарегистрироваться. Перейти на страницу регистрации?"
        );

        if (goRegister) {
            localStorage.removeItem("cart");
            updateCart({}, 0);
            navigate("/register");
        }

        return;
    }

    

    // 2️⃣ Подтверждение оплаты суммы
    const confirmPay = window.confirm(
        `Подтвердите оплату на сумму ${totalSum.toFixed(2)} ₽`
    );

    if (!confirmPay) return;

    const itemsCount = items.reduce(
        (sum, item) => sum + item.count,
        0
    );

    const hasDiscount = items.some(
        item => item.count > 100
    );

    const orderData = {
        total_sum: totalSum,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        user_login: user.login,
        user_full_name: user.full_name,
        user_number: user.phone,
        discont: hasDiscount ? "10%" : "0%",
        user_id: user.idUsers, 
        items_count: itemsCount,

        items: items.map(item => ({
        idProduct: item.product.idProduct,
        count: item.count
    }))
    };

    try {
        const response = await fetch(
            "https://diplom-1-54sb.onrender.com/api/orders/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Ошибка оплаты");
        }

        alert("Оплата прошла успешно");

        console.log(result);
        clearCart();
        

    } catch (error) {
        console.error(error);
        alert(error.message || "Ошибка оплаты");
    }
};

  return (
    <>
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
                <td data-label="Товар" className="left-text">{product.Product_title}</td>
                <td data-label="Цена">
                  {pricePerUnit.toFixed(2)} ₽
                  {count > 100 && <span className="discount"> (скидка 10%)</span>}
                </td>
                <td data-label="Количество">
                <button onClick={() => updateCart(product, count - 1)}>-</button>
                <span className="span">{count}</span>
                <button onClick={() => updateCart(product, count + 1)}>+</button>
              </td>
                <td data-label="Сумма" >{total.toFixed(2)} ₽</td>
              </tr>
            );
          })}

          <tr className="total-row">
            <td data-label="Итого" colSpan="3" className="left-text">Общая сумма:</td>
            <td data-label="Сумма" className="total">{totalSum.toFixed(2)} ₽</td>
          </tr>
        </tbody>
      </table>

      <div className="parent-btn-by">
        <button onClick={clearCart} disabled={items.length === 0} className="btn-danger">
          Очистить карзину
        </button>
        <button onClick={handlePayment} disabled={items.length === 0} className="btn-by">
          Оплатить
        </button>
        
        </div>    
    </>
  );
}
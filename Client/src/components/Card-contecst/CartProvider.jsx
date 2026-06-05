import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    // Обновление количества товара в корзине
    const updateCart = (product, newCount) => {
        setCart(prev => {
            const updated = { ...prev };

            if (newCount <= 0) {
                delete updated[product.idProduct];
            } else {
                const price = newCount > 100 ? product.Product_price * 0.9 : product.Product_price;

                updated[product.idProduct] = {
                    product,
                    count: newCount,
                    price
                };
            }

            return updated;
        });
    };

    // ✅ Функция очистки корзины
    const clearCart = () => {
        setCart({});
        localStorage.removeItem("cart");
    };

    // Общее количество товаров
    const totalCount = Object.values(cart).reduce(
        (sum, item) => sum + item.count,
        0
    );

    // Общая сумма
    const totalPrice = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    // 👇 В этом месте передаём всё в контекст
    return (
        <CartContext.Provider
            value={{
                cart,
                updateCart,
                clearCart,  // <-- вот здесь!
                totalCount,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Хук для использования контекста корзины
export const useCart = () => useContext(CartContext);
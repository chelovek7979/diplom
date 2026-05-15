import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    const updateCart = (product, newCount) => {
        setCart(prev => {
            const updated = { ...prev };

            if (newCount <= 0) {
                delete updated[product.idProduct];
            } else {
                // Применяем скидку, если количество > 100
                const price = newCount > 100 ? product.Product_price * 0.9 : product.Product_price;

                updated[product.idProduct] = {
                    product,
                    count: newCount,
                    price // цена за единицу с учетом скидки
                };
            }

            return updated;
        });
    };

    // общее количество товаров
    const totalCount = Object.values(cart).reduce(
        (sum, item) => sum + item.count,
        0
    );

    // общая цена корзины
    const totalPrice = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    return (
        <CartContext.Provider value={{ cart, updateCart, totalCount, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    const updateCart = (product, newCount) => {
        setCart(prev => {
            const updated = { ...prev };

            if (newCount <= 0) {
                delete updated[product.idProduct]; // удаляем
            } else {
                updated[product.idProduct] = {
                    product,
                    count: newCount
                };
            }

            return updated;
        });
    };

    // общее количество
    const totalCount = Object.values(cart).reduce(
        (sum, item) => sum + item.count,
        0
    );

    // общая цена
    const totalPrice = Object.values(cart).reduce(
        (sum, item) => sum + item.product.Price * item.count,
        0
    );

    return (
        <CartContext.Provider 
            value={{ cart, updateCart, totalCount, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
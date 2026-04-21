import { useCart } from '../Card-contecst/CartProvider';
import { useState } from 'react'
import './Button-style.scss'

export default function Button({ product }) {
    const { cart, updateCart } = useCart();

    const count = cart[product.idProduct]?.count || 0;

    return (
        <div className="cart_control">
            {count === 0 ? (
                <button onClick={() => updateCart(product, 1)}>
                    Добавить
                </button>
            ) : (
                <div className="counter">
                    <button onClick={() => updateCart(product, count - 1)}>
                        -
                    </button>

                    <span>{count}</span>

                    <button onClick={() => updateCart(product, count + 1)}>
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
import { useState } from "react";
import Button from "./Button";
import { useCart } from "../Card-contecst/CartProvider";

export default function Card({ product }) {
    const { updateCart, cart } = useCart();

    // Локальное состояние количества для ввода
    const [quantity, setQuantity] = useState(1);

    // Проверка и применение скидки
    const getPrice = () => {
        let price = product.Product_price;
        if (quantity > 100) {
            price = price * 0.9; // скидка 10%
        }
        return price;
    };

    const handleAddToCart = () => {
        updateCart(product, quantity);
    };

    return (
        <div className="Card">
            <div className="wrapper">
                <div className="card-photo">
                    <img
                        src={`https://diplom-1-54sb.onrender.com/uploads/${product.Product_image_url}`}
                        alt={product.Product_title}
                    />
                </div>

                <div className="Content">
                    <div className="card-title">
                        <h2>{product.Product_title}</h2>
                    </div>

                    <div className="card-description">
                        <p>{product.Product_description}</p>
                    </div>

                    <div className="card-prise">
                        <span>{getPrice().toFixed(2)} ₽</span>
                        {quantity > 100 && <span className="discount"> (скидка 10%)</span>}
                    </div>

                    <div className="card-count">
                        <span>Осталось товара: {product.product_count}</span>
                    </div>

                    <div className="card-quantity">
                        <label>
                            <span>Количество:</span>
                            <input
                                type="number"
                                min="1"
                                max={product.product_count}
                                value={quantity}
                                onChange={(e) => {
                                    let val = parseInt(e.target.value, 10);
                                    if (isNaN(val) || val < 1) val = 1;
                                    if (val > product.product_count) val = product.product_count;

                                    setQuantity(val);
                                    updateCart(product, val); 
                                }}
                                />
                        </label>
                    </div>

                    <Button onClick={handleAddToCart} product={product}>
                        Добавить в корзину
                    </Button>
                </div>
            </div>
        </div>
    );
}
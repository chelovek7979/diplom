import { useCart } from '../Card-contecst/CartProvider';
import './Button-style.scss'

export default function Button({ product }) {
    const { cart, updateCart } = useCart();
    const count = cart[product.idProduct]?.count || 0;

    const handleAdd = () => {
        if (count < product.product_count) {
            updateCart(product, count + 1);
        } else {
            alert("Больше товара нет в наличии!");
        }
    };

    const handleRemove = () => {
        if (count > 0) {
            updateCart(product, count - 1);
        }
    };

    return (
        <div className="cart_control">
            {count === 0 ? (
                <button 
                    onClick={handleAdd}
                    disabled={product.product_count === 0} 
                >
                    Добавить
                </button>
            ) : (
                <div className="counter">
                    <button 
                        onClick={handleRemove} 
                        disabled={count === 0} 
                    >
                        -
                    </button>

                    <span>{count}</span>

                    <button 
                        onClick={handleAdd} 
                        disabled={count >= product.product_count} 
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
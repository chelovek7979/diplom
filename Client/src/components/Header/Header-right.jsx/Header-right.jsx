import User from '../../../assets/User_cicrle_light.svg'
import Baskett from '../../../assets/Basket_alt_3_light.svg'
import exit from '../../../assets/Vector.svg'
import { useCart } from '../../Card-contecst/CartProvider'
import './Header-right.scss'
import { useNavigate } from "react-router-dom";

export default function Header_right({ bascket }) {

    const { totalCount } = useCart();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload()
    };

    return (
        <div className="header_right">

            {/* 👇 ЕСЛИ НЕТ USER → ПОКАЗЫВАЕМ LOGIN */}
            {!user && (
                <img
                    src={User}
                    alt="login"
                    onClick={() => navigate('/login')}
                    style={{ cursor: "pointer" }}
                />
            )}

            {/* 👇 ЕСЛИ USER ЕСТЬ → ПОКАЗЫВАЕМ LOGOUT */}
            {user && (
                <img
                    src={exit}
                    alt="logout"

                    onClick={handleLogout}
                    className='exit'
                    style={{ cursor: "pointer" }}
                />
            )}

            {/* корзина */}
            <img
                src={Baskett}
                alt="basket"
                onClick={() => bascket('basket')}
                style={{ cursor: "pointer" }}
            />

            <span>{totalCount}</span>

        </div>
    );
}
import { useState, useEffect } from "react";
import Navigate from "../Navigate/Navigate";
import { useNavigate } from "react-router-dom";

export default function Header_left({ bascket, openLogin }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsOpen(false);
        navigate("/login");
        window.location.reload()
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 576) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);






    return (
        <>
            <div className="header_left">
                <h1>Петроснабкартон</h1>
                <Navigate bascket={bascket} />
                <div className="burger" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✕" : "☰"}
                </div>
            </div>

            {isOpen && (
                <div className="mobile_menu">
                    <ul>
                        <li
                            onClick={() => {
                                bascket("market");
                                setIsOpen(false);
                            }}
                        >
                            Наша продукция
                        </li>

                        <li
                            onClick={() => {
                                bascket("landing");
                                setIsOpen(false);
                            }}
                        >
                            О нас
                        </li>

                        <li
                            onClick={() => {
                                bascket("contact");
                                setIsOpen(false);
                            }}
                        >
                            Контакты
                        </li>

                        {/* Личный кабинет / Logout */}
                        {!user && (
                            <li
                                onClick={() => {
                                    navigate('/login')
                                    setIsOpen(false);
                                    openLogin();
                                    
                                }}
                            >
                                Личный кабинет
                            </li>
                        )}

                        {user && (
                            <li
                                onClick={handleLogout}
                            >
                                Выйти
                            </li>
                        )}

                        <li
                            onClick={() => {
                                bascket("basket");
                                setIsOpen(false);
                            }}
                        >
                            Корзина
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
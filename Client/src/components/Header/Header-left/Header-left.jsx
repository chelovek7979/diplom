import { useState, useEffect } from "react";
import Navigate from "../Navigate/Navigate";

export default function Header_left({bascket,openLogin}){

    const [isOpen, setIsOpen] = useState(false);

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

    return(
        <>
            <div className="header_left">
                <h1>Розница</h1>
                <Navigate bascket={bascket}/>
                <div className="burger" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✕" : "☰"}
                </div>
            </div>

            {isOpen && (
                <div className="mobile_menu">
                    <ul>
                        <li onClick={() => {
                            bascket('market');
                            setIsOpen(false);
                            }}>Главная</li>
                        <li onClick={() => setIsOpen(false)}>О нас</li>
                        <li onClick={() => setIsOpen(false)}>Контакты</li>
                        <li onClick={() => { 
                            setIsOpen(false); 
                            openLogin(); 
                            }}>Личный кабинет</li>

                        <li onClick={() => {
                            bascket('basket');
                            setIsOpen(false);
                        }
                            }>Корзина</li>
                    </ul>
                    
                    
                </div>
            )}
        </>

                

            
    )
}
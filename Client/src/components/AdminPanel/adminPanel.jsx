import { useState } from "react";
import "./AdminPanel.scss";
import AddProduct from '../AddProduct/AddProduct'
import EditProduct from "../ChangeProduct/ChangeProduct";
import ChangePanel from "../ChangeProduct/ChangePanel";

export default function AdminPanel() {
    const [activeSection, setActiveSection] = useState("products");

    return (
        <div className="admin-panel">
            {/* Боковая панель */}
            <aside className="sidebar">
                
                <button 
                    className={activeSection === "products" ? "active" : ""} 
                    onClick={() => setActiveSection("products")}
                >
                    Добавить товар
                </button>
                <button 
                    className={activeSection === "orders" ? "active" : ""} 
                    onClick={() => setActiveSection("orders")}
                >
                    Изменить товар
                </button>
                <button 
                    className={activeSection === "users" ? "active" : ""} 
                    onClick={() => setActiveSection("users")}
                >
                    Пользователи
                </button>
                <button 
                    className={activeSection === "settings" ? "active" : ""} 
                    onClick={() => setActiveSection("settings")}
                >
                    Настройки
                </button>
            </aside>

            {/* Основная часть */}
            <main className="content">
                {activeSection === "products" && (
                    <div className="section">
                        <h2>Добавление товаров</h2>
                        <p>Здесь можно добавлять нужный товар</p>
                        <AddProduct/>
                        
                    </div>
                )}
                {activeSection === "orders" && (
                    <div className="section">
                        <h2>Товары</h2>
                        <p>Просмотр, обноление информации и удаление товара</p>
                        <ChangePanel/>
                    </div>
                )}
                {activeSection === "users" && (
                    <div className="section">
                        <h2>Пользователи</h2>
                        <p>Управление аккаунтами пользователей.</p>
                    </div>
                )}
                {activeSection === "settings" && (
                    <div className="section">
                        <h2>Настройки</h2>
                        <p>Общие настройки магазина.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
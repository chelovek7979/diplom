import { useState } from "react";
import "./AdminPanel.scss";
import AddProduct from '../AddProduct/AddProduct'
import EditProduct from "../ChangeProduct/ChangeProduct";
import ChangePanel from "../ChangeProduct/ChangePanel";
import Dashboard from "../dashboard/dashbord";
import OrdersTable from "../orders/FullOrders";
import FullOrdersView from "../FullOrdersView/FullOrdersView";

export default function AdminPanel() {
    const [activeSection, setActiveSection] = useState("products");

    return (
        <div className="admin-panel">
            {/* Боковая панель */}
            <aside className="sidebar">
                
                <button 
                    className={ `left ${activeSection === "products" ? "active" : ""}`} 
                    onClick={() => setActiveSection("products")} 
                    
                >
                    Добавить товар
                </button>
                <button 
                    
                    className={ `left ${activeSection === "orders" ? "active" : ""}`} 
                    onClick={() => setActiveSection("orders")}
                >
                    Изменить товар
                </button>


                <button 
                    
                    className={ `left ${activeSection === "settings" ? "active" : ""}`} 
                    onClick={() => setActiveSection("settings")}
                >
                    Статистика продаж
                </button>

                <button 
                    
                    className={ `left ${activeSection === "change" ? "active" : ""}`} 
                    onClick={() => setActiveSection("change")}
                >
                    Управление заказами
                </button>

                <button 
                    
                    className={ `left ${activeSection === "full" ? "active" : ""}`} 
                    onClick={() => setActiveSection("full")}
                >
                    Все продажи
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
                        <h2>Дашборд</h2>
                        <p>Просмотр информации о покупках</p>
                        <Dashboard/>
                    </div>
                )}

                {activeSection === "change" && (
                    <div className="section">
                        <h2>Заказы</h2>
                        <p>Изменение и мониторинг этапов продажи</p>
                        <OrdersTable/>
                    </div>
                )}

                {activeSection === "full" && (
                    <div className="section">
                        <h2>Заказы</h2>
                        <p>Изменение и мониторинг этапов продажи</p>
                        <FullOrdersView/>
                    </div>
                )}
            </main>
        </div>
    );
}
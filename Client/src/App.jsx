import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Tab_section from './components/Tab-section/Tab-section'
import CardSection from './components/CardSection/CardSection'
import AddProduct from './components/AddProduct/AddProduct'
import Catalog from './components/Catalog/Catalog'
import { CartProvider } from './components/Card-contecst/CartProvider'
import Bascket from './components/Bascket/Bascket'
import Landing from './components/Landing/landing'
import ContactInfo from './components/Landing/ContactInfo'

import AdminPanel from './components/AdminPanel/adminPanel'
import LoginModal from './components/Modal/Modal'

import Login from './components/pages/login'
import Register from './components/pages/register'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [market, bascket] = useState("market");
  
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("user"))
    );

const user_role = user?.role;
  

return (
    <BrowserRouter>
      <CartProvider>
        

        <Routes>

          <Route path="/login" element={<Login setUser={setUser} />}/>
          <Route path="/register" element={<Register  />}/>

          <Route path="/" element={
    <>
      <Header bascket={bascket} />

      {user_role === 'admin' ? (
        <>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}
            className="exitButtom"
          >
            Выйти из панели администратора
          </button>

          <AdminPanel />
        </>
      ) : (
        <>
          {market === "market" && <Catalog />}
          {market === "basket" && <Bascket />}
          {market === "landing" && <Landing />}
          {market === "contact" && <ContactInfo />}
        </>
      )}
    </>
  }
/>

        </Routes>

      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
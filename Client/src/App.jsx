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

import AdminPanel from './components/AdminPanel/adminPanel'
import LoginModal from './components/Modal/Modal'

function App() {

  const [market, bascket] = useState('market')
  
  const [showLogin, setShowLogin] = useState(false)

  const [isAdmin, setIsAdmin] = useState(false)

  

  const handleLogout = () => {
  setIsAdmin(false)
}

  

  return (
  <CartProvider>
    <Header
      bascket={bascket}
      openLogin={() => setShowLogin(true)}
    />

    {isAdmin ? (
      <>
        <button
          onClick={() => setIsAdmin(false)}
          className='exitButtom'
        >
          Выйти из панели администратора 
        </button>

        <AdminPanel />
      </>
    ) : (
      <>
        {market === 'market' && <Catalog />}
        {market === 'basket' && <Bascket />}
        {market === 'landing' && <Landing />}
      </>
    )}

    {showLogin && (
      <LoginModal
        close={() => setShowLogin(false)}
        setAdmin={setIsAdmin}
      />
    )}
  </CartProvider>
)
}

export default App

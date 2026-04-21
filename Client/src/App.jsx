import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Tab_section from './components/Tab-section/Tab-section'
import CardSection from './components/CardSection/CardSection'
import AddProduct from './components/AddProduct/AddProduct'
import Catalog from './components/Catalog/Catalog'
import { CartProvider } from './components/Card-contecst/CartProvider'
import Bascket from './components/Bascket/Bascket'

function App() {

  const [market, bascket] = useState('market')
  

  return (
    <CartProvider>
      <Header bascket={bascket}/>
      {market ==='market' && <Catalog/>}
      {market ==='basket' && <Bascket/>}
      
      
   
      

    </CartProvider>
  )
}

export default App

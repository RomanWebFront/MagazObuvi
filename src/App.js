import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import Navbar from './components/Navbar.js';
import ContactsPage from './pages/ContactsPage.js'
import Banner from './components/Banner.js';
import CatalogPage from './pages/CatalogPage.js';
import AboutPage from './pages/AboutPage.js';
import Footer from './components/Footer.js';
import CartPage from './pages/CartPage.js';
import CardPage from './pages/CardPage.js';
import { CartContext } from './components/CartContext.js';
import {useState } from 'react';


function App() {
  const [currentCart, setCurrentCart] = useState([]);

  return (
    <div className="App">
      <CartContext value={{currentCart, setCurrentCart}}>
        <Navbar />
        <Banner>
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:productId" element={<CardPage />} />
          </Routes>
        </Banner>
        <Footer />
      </CartContext>
    </div>
  );
}

export default App;

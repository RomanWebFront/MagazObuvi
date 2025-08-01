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


function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Banner>
      <Footer/>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage';
import AddToCart from './pages/AddToCart'
import Wishlist from './pages/Wishlist';
import ContactPage from './pages/ContactPage';
import AboutPage  from './pages/AboutPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/addToCart' element={<AddToCart />}/>
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
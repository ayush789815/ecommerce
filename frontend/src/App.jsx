import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage';
import AddToCart from './pages/AddToCart';
import Wishlist from './pages/Wishlist';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/addToCart' element={<AddToCart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/productType' element={<CategoryPage />} /> {/* Ensure this line is present */}
        <Route path='/search' element={<SearchPage />} /> {/* Add the SearchPage route */}
        <Route path='/payment-success' element={<PaymentSuccess />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "./components/ui/spinner";

// Lazy load all pages
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const AddProduct = lazy(() => import('./pages/AddProduct'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AddToCart = lazy(() => import('./pages/AddToCart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductTypePage = lazy(() => import('./pages/ProductTypePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const Orders = lazy(() => import('./pages/Orders'));

// Loading component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Spinner size="xl" />
  </div>
);

// Auth guard component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/productType/:productType' element={<ProductTypePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          
          {/* Protected routes */}
          <Route path="/addproduct" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path='/addToCart' element={
            <ProtectedRoute>
              <AddToCart />
            </ProtectedRoute>
          } />
          <Route path='/wishlist' element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          <Route path='/orders' element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path='/payment-success' element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          } />
          <Route path='/myaccount' element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
    </BrowserRouter>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import ProductCard from '../component/ProductCard';
import { Spinner } from "../components/ui/spinner";


const ProductTypePage = () => {
  const { productType } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
      setProducts([]); 
      setLoading(true);
      setErrorMessage("");
    const fetchProducts = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_URL}/products/productType/${productType}`);
        if (response.data.products.length === 0) {
            setErrorMessage("No products available for this category.");
          }
          setProducts(response.data.products || []);

        } catch (error) {
            setErrorMessage("No products available for this category.");
          }
          setLoading(false);
        };

    fetchProducts();
  }, [productType]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="blue" />
      </div>
    );
  }
  

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-lg font-light mb-8">Product Type: {productType}</h1>

        {/* ✅ Show Loading State */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center text-gray-500 text-xl py-10">{errorMessage}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductTypePage;

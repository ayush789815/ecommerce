import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import ProductCard from '../component/ProductCard';

const CategoryPage = () => {
  const {  productType } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(`producttype ,${productType}`).
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (productType) {
          response = await axios.get(`${import.meta.env.VITE_URL}/products/productType/${productType}`);
        } else if (category) {  // Ensure category fallback works
          response = await axios.get(`${import.meta.env.VITE_URL}/products/category/${category}`);
        }
        console.log('Response:', response);
        setProducts(response?.data?.products || []); // Ensure empty array in case of error
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, productType]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-lg font-light mb-8">Category: {category} {productType && `> ${productType}`}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
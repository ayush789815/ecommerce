import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductCard({ product }) {
  const userId = localStorage.getItem('userId'); // Get userId from local storage
  const [isInWishlist, setIsInWishlist] = useState(''); // State to track if the product is in the wishlist

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/wishlist/${userId}`);
        const wishlist = response.data;
        const productExists = wishlist.products.some(p => p.productId._id === product._id);
        setIsInWishlist(productExists);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, product._id]);

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/wishlist`, {
        userId,
        productId
      });
      console.log("Product Added to Wishlist:", response.data);
      setIsInWishlist(true);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_URL}/wishlist`, {
        data: { userId, productId }
      });
      console.log("Product Removed from Wishlist:", response.data);
      getWishlist(userId); // Refresh the wishlist
      setIsInWishlist(false);

    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };
  return (
    <div className="relative border rounded-lg p-4 group">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-68 object-cover rounded-lg"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded">
            {product.discount}
          </span>
        )}

        <button
          onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100" >
          {isInWishlist ? <FaHeart className="text-red-500" /> : <FiHeart />}
        </button>
        <Link className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          to={`/product/${product._id}`}> Quick View
        </Link>
      </div>

      <div>
        <h3 className="font-medium mb-2">{product.productName}</h3>
        <div className="flex gap-4 mb-2">
          <span className="text-primary font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-medium line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="text-yellow-400 flex flex-col">
          {'★'.repeat(Math.floor(product.rating))}
          <span className="text-gray-medium ">{product.reviews}</span>
        </div>
      </div>
    </div>
  );
}
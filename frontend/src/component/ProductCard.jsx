import React, { useState, useEffect, memo } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getWishlist, addToWishlist as addToWishlistApi, removeFromWishlist as removeFromWishlistApi } from '../axios/axios';

// Optimize with React.memo to prevent unnecessary re-renders
const ProductCard = memo(({ product }) => {
  const userId = localStorage.getItem('userId'); // Get userId from local storage
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWishlist = async () => {
      try {
        const wishlist = await getWishlist(userId);
        if (isMounted && wishlist && wishlist.products) {
          const productExists = wishlist.products.some(p => p.productId && p.productId._id === product._id);
          setIsInWishlist(productExists);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, product._id]);

  const addToWishlist = async (productId) => {
    if (!userId) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    setLoading(true);
    try {
      await addToWishlistApi(userId, productId);
      setIsInWishlist(true);
      toast.success('Product added to wishlist');
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error('Error adding product to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    setLoading(true);
    try {
      await removeFromWishlistApi(userId, productId);
      setIsInWishlist(false);
      toast.success('Product removed from wishlist');
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error('Error removing product from wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Extract first image from image array or use the single image
  const imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <div className="relative p-4 group bg-zinc-100">
      <div className="relative mb-4">
        {!imageLoaded && (
          <div className="w-full h-68 bg-gray-300 animate-pulse"></div>
        )}
        <img
          src={imageUrl}
          alt={product.productName}
          className={`w-full h-68 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded">
            {product.discount}%
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          disabled={loading}
          className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100" >
          {isInWishlist ? <FaHeart className="text-red-500" /> : <FiHeart />}
        </button>
        <Link
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded sm:opacity-100 sm:block md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          to={`/product/${product._id}`}   >          Quick View
        </Link>

      </div>

      <div>
        <h3 className="font-medium mb-2 truncate">{product.productName}</h3>
        <div className="flex gap-4 mb-2">
          <span className="text-primary font-bold">${product.originalPrice || product.price}</span>
          {product.originalPrice && product.price && product.originalPrice !== product.price && (
            <span className="text-gray-medium line-through">
              ${product.price}
            </span>
          )}
        </div>
        <div className="text-yellow-400 flex flex-col">
          {'★'.repeat(Math.min(Math.floor(product.rating || 0), 5))}
          <span className="text-gray-medium ">{product.reviews || '0 reviews'}</span>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
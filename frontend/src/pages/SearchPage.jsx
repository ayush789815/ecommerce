import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header/Header";
import Footer from "../component/Footer";
import ProductCard from "../component/ProductCard";
import { debounce } from "lodash"; // Import lodash debounce

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Debounced API Call
  const fetchProducts = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setProducts([]);
        setNoResults(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/searchProducts?q=${searchTerm}`
        );

        setProducts(response.data.products);
        setNoResults(response.data.products.length === 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms delay before API call
    []
  );

  useEffect(() => {
    fetchProducts(query);
  }, [query, fetchProducts]);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-lg font-light mb-8">Search Results for: {query}</h1>

        {loading && <p>Loading...</p>}
        {!loading && noResults && <p className="text-gray-500">No results found for "{query}".</p>}

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

export default SearchPage;

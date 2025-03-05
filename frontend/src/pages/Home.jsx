import { useEffect, useState } from 'react';
import Header from '../component/Header/Header';
import FlashSale from '../component/sections/FlashSale';
import Categories from '../component/sections/Categories';
import BestSelling from '../component/sections/BestSelling';
import AdBanner from '../component/sections/AdBanner';
import NewArrivals from '../component/sections/NewArrivals';
import Services from '../component/sections/Services';
import Footer from '../component/Footer';
import axios from 'axios';

export default function HomePage() {
  const [product, setProduct] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/getProduct?page=${currentPage}`
        );        setProduct(response.data.products);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchBestSellingProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/bestSelling`);
        setBestSelling(response.data.products);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
      }
    };

    fetchProducts();
    fetchBestSellingProducts();
  }, [currentPage]);

  const categories = [
    { id: 1, name: 'Mobile', icon: '📱' },
    { id: 2, name: 'Computer', icon: '💻' },
    { id: 3, name: 'Smart Watch', icon: '⌚' },
    { id: 4, name: 'Laptop', icon: '💻' },
    { id: 5, name: 'HeadPhones', icon: '🎧' },
    { id: 6, name: 'Gaming', icon: '🎮' }
  ];

  return (
    <div>
      <Header />
      <main className="mx-auto px-4 py-8">
        <AdBanner />
        <FlashSale products={product} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        <Categories categories={categories} />
        <BestSelling products={bestSelling} />
        {/* <NewArrivals /> */}
        <Services />
      </main>
      <Footer />
    </div>
  );
}
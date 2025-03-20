import { useEffect, useState, useMemo, useCallback } from 'react';
import { Suspense, lazy } from 'react';
import Header from '../component/Header/Header';
import { Spinner } from "../components/ui/spinner";
import Footer from '../component/Footer';
import { getAllProducts, getBestSellingProducts } from '../axios/axios';

// Lazy load components
const FlashSale = lazy(() => import('../component/sections/FlashSale'));
const Categories = lazy(() => import('../component/sections/Categories'));
const BestSelling = lazy(() => import('../component/sections/BestSelling'));
const AdBanner = lazy(() => import('../component/sections/AdBanner'));
const Services = lazy(() => import('../component/sections/Services'));

// Loading component
const LoadingSection = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize categories to prevent re-renders
  const categories = useMemo(() => [
    { id: 1, name: 'Mobile', icon: '📱' },
    { id: 2, name: 'Computer', icon: '💻' },
    { id: 3, name: 'Smart Watch', icon: '⌚' },
    { id: 4, name: 'Laptop', icon: '💻' },
    { id: 5, name: 'HeadPhones', icon: '🎧' },
    { id: 6, name: 'Gaming', icon: '🎮' }
  ], []);

  // Handle page change with useCallback
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Fetch products with optimized approach
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        // Use Promise.all to fetch data in parallel
        const [productsResponse, bestSellingResponse] = await Promise.all([
          getAllProducts(currentPage),
          getBestSellingProducts()
        ]);

        if (isMounted) {
          setProducts(productsResponse.products || []);
          setTotalPages(productsResponse.totalPages || 1);
          setBestSellingProducts(bestSellingResponse.products || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <div>
      <Header />
      <main className="mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSection />}>
          <AdBanner />
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {isLoading ? (
            <LoadingSection />
          ) : (
            <FlashSale 
              products={products} 
              currentPage={currentPage} 
              setCurrentPage={handlePageChange} 
              totalPages={totalPages} 
            />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          <Categories categories={categories} />
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {isLoading ? (
            <LoadingSection />
          ) : (
            <BestSelling products={bestSellingProducts} />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          <Services />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
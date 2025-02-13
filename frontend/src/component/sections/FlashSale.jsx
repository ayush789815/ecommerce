import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionTitle from '../SectionTitle';
import Timer from '../Timer';
import ProductCard from '../ProductCard';
import ProductPage from '../../pages/ProductPage';

export default function FlashSale({ products, time }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title="Flash Sales" />
        <Timer initialTime={{ hours: 24, minutes: 0, seconds: 0 }} />
                <div className="flex gap-2">
          <button onClick={handlePrevPage} className="p-2 border rounded-full cursor-pointer" disabled={currentPage === 1}>
            <FiChevronLeft />
          </button>
          <button onClick={handleNextPage} className="p-2 border rounded-full cursor-pointer" disabled={currentPage === totalPages}>
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
     
      
      
    </section>
  );
}
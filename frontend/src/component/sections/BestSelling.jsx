import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import ProductCard from '../ProductCard';

export default function BestSelling({ products }) {
  const [rowsToShow, setRowsToShow] = useState(2); // State to keep track of rows to display
  const productsPerRow = 4;

  const currentProducts = products.slice(0, rowsToShow * productsPerRow);

  const handleShowMore = () => {
    setRowsToShow(rowsToShow + 2); // Increase the number of rows to display by 2
  };

  const handleShowLess = () => {
    if (rowsToShow > 2) {
      setRowsToShow(rowsToShow - 2); // Decrease the number of rows to display by 2
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center ">
        <SectionTitle title="Best Selling Products" />
        <button className="btn-primary">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        {currentProducts.length < products.length && (
          <button onClick={handleShowMore} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Show More
          </button>
        )}
        {rowsToShow > 2 && (
          <button onClick={handleShowLess} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Show Less
          </button>
        )}
      </div>
    </section>
  );
}
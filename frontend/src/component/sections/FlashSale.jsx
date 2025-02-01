import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SectionTitle from '../SectionTitle'
import Timer from '../Timer'
import ProductCard from '../ProductCard'

export default function FlashSale({ products, time }) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title="Flash Sales" />
        <Timer time={time} />
        <div className="flex gap-2">
          <button className="p-2 border rounded-full">
            <FiChevronLeft />
          </button>
          <button className="p-2 border rounded-full">
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <button className="btn-primary mx-auto block">
        View All Products
      </button>
    </section>
  )
}
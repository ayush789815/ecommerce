import SectionTitle from '../SectionTitle'
import ProductCard from '../ProductCard'

export default function BestSelling({ products }) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title="Best Selling Products" />
        <button className="btn-primary">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
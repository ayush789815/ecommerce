import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SectionTitle from '../SectionTitle'
import CategoryCard from '../CategoryCard'

export default function Categories({ categories }) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title="Browse By Category" />
        <div className="flex gap-2">
          <button className="p-2 border rounded-full">
            <FiChevronLeft />
          </button>
          <button className="p-2 border rounded-full">
            <FiChevronRight />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
export default function CategoryCard({ category }) {
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg hover:bg-gray-light transition-colors cursor-pointer">
      <span className="text-4xl mb-2">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}
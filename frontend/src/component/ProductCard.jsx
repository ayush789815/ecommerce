import { FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
export default function ProductCard({ product }) {
  return (
    <div className="relative border rounded-lg p-4 group">
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-68 object-cover rounded-lg"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-100">
          <FiHeart />
        </button>

        <Link className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          to={`/product/${product._id}`}> Quick View
        </Link>
      </div>

      <div>
        <h3 className="font-medium mb-2">{product.productName}</h3>
        <div className="flex gap-4 mb-2">
          <span className="text-primary font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-medium line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="text-yellow-400 flex flex-col">
          {'★'.repeat(Math.floor(product.rating))}
          <span className="text-gray-medium ">{product.reviews}</span>
        </div>
      </div>
    </div>
  )
}
import { FiHeart, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import AddProduct from '../../pages/AddProduct'
import { Link } from 'react-router-dom'
export default function MainHeader() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-b-gray-500 ">
      <div className="text-2xl font-bold">Exclusive</div>

      <nav className="flex gap-8">
        <Link className='text-black' to={'/home'}>Home</Link>
        <Link className="hover:text-primary" to={"/contact"}> Contact</Link>
        <Link className="hover:text-primary" to={"/about"}> About</Link>
        <Link className='text-black' to={'/'}>Sign Up</Link>
        <Link className='text-black' to={'/addproduct'}> Add Product</Link>
      </nav>
      <div className="flex items-center gap-8">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-[300px] px-4 py-2 border rounded"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-6 text-xl">
          <Link to={'/wishlist'}><FiHeart className="cursor-pointer hover:text-primary" /></Link>
          <Link to={'/addToCart'}>  <FiShoppingCart className="cursor-pointer hover:text-primary" /></Link>
          <FiUser className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </div>
  )
}
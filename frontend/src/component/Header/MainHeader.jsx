import { FiHeart, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

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
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px] px-4 py-2 border rounded"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <FiSearch />
          </button>
        </form>

        <div className="flex gap-6 text-xl">
          <Link to={'/wishlist'}><FiHeart className="cursor-pointer hover:text-primary" /></Link>
          <Link to={'/addToCart'}>  <FiShoppingCart className="cursor-pointer hover:text-primary" /></Link>
          <FiUser className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </div>
  )
}
import { FiHeart, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'

export default function MainHeader() {
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div className="text-2xl font-bold">Exclusive</div>
      
      <nav className="flex gap-8">
        <a href="#home" className="hover:text-primary">Home</a>
        <a href="#contact" className="hover:text-primary">Contact</a>
        <a href="#about" className="hover:text-primary">About</a>
        <a href="#signup" className="hover:text-primary">Sign Up</a>
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
          <FiHeart className="cursor-pointer hover:text-primary" />
          <FiShoppingCart className="cursor-pointer hover:text-primary" />
          <FiUser className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </div>
  )
}
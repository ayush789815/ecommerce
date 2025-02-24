import { FiHeart, FiShoppingCart, FiUser, FiSearch, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="flex flex-col bg-white shadow-md">
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-300 bg-gray-50 relative z-50">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold text-gray-900">
          Exclusive
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-[600px]">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
            <FiSearch />
          </button>
        </form>

        {/* Navigation Links & Icons */}
        <div className="flex items-center gap-6 text-xl">
          <Link to="/wishlist">
            <FiHeart className="cursor-pointer hover:text-primary" />
          </Link>
          <Link to="/addToCart">
            <FiShoppingCart className="cursor-pointer hover:text-primary" />
          </Link>
          
          {/* User Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={(e) => {
              if (!dropdownRef.current.contains(e.relatedTarget)) {
                setIsDropdownVisible(false);
              }
            }}
          >
            <FiUser className="cursor-pointer hover:text-primary" />
            <div 
              ref={dropdownRef}
              className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 text-sm transition-opacity duration-300 ${isDropdownVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <Link to="/myaccount" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Account</Link>
              <Link to="/wishlist" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Wishlist</Link>
              <Link to="/addToCart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Order</Link>
              <Link to="/addproduct" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Product</Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Contact</Link>
              <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">About</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
              >
                <FiLogOut className="inline mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-center py-2 ">
        <nav className="flex gap-6 px-8 text-gray-700 text-sm">
          <Link to="/categories/electronics" className="hover:text-primary">Electronics</Link>
          <Link to="/categories/mens" className="hover:text-primary">Men</Link>
          <Link to="/categories/women" className="hover:text-primary">Women</Link>
          <Link to="/categories/home-kitchen" className="hover:text-primary">Home & Kitchen</Link>
          <Link to="/categories/beauty-health" className="hover:text-primary">Beauty & Health</Link>
          <Link to="/categories/jewellery-accessories" className="hover:text-primary">Jewellery & Accessories</Link>
          <Link to="/categories/bags-footwear" className="hover:text-primary">Bags & Footwear</Link>
          <Link to="/categories/sports-fitness" className="hover:text-primary">Sports & Fitness</Link>
          <Link to="/categories/car-motorbike" className="hover:text-primary">Car & Motorbike</Link>
          <Link to="/categories/office-stationery" className="hover:text-primary">Office Supplies & Stationery</Link>
          <Link to="/categories/pet-supplies" className="hover:text-primary">Pet Supplies</Link>
          <Link to="/categories/food-drinks" className="hover:text-primary">Food & Drinks</Link>
          <Link to="/categories/musical-instruments" className="hover:text-primary">Musical Instruments</Link>
        </nav>
      </div>
    </header>
  );
}
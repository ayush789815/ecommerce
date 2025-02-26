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

  const category = [
    {
      name: "Electronics",  
      image: "https://rukminim2.flixcart.com/flap/86/86/image/69c6589653afdb9a.png?q=100"
    },
    {
      name: "Men",
      image: "https://rukminim2.flixcart.com/fk-p-flap/86/86/image/0d75b34f7d8fbcb3.png?q=100"
    },
    {
      name: "Women",
      image: "https://static-gcp.freepikcompany.com/web-app/media/freepik-26-2000.webp"
    },
    {
      name: "Home & Kitchen",
      image: "https://img.freepik.com/free-photo/beautiful-shot-modern-house-kitchen_181624-1846.jpg?t=st=1740483862~exp=1740487462~hmac=87a8d85c88fa4e81285b408a1d4707d133004337a1eb11bbd4ff39b3e78638a9&w=1480"
    },
    {
      name: "Beauty & Health",
      image: "https://img.freepik.com/free-psd/elegant-makeup-collection-cream-foundation-brush-mascara_191095-83817.jpg?t=st=1740483254~exp=1740486854~hmac=bb365d70fc348aa1bbcfe22224f33a80903a7918c51dbfb938130078885e7802&w=996"
    },
    {
      name: "Jewellery & Accessories",
      image: "https://img.freepik.com/free-psd/stunning-emerald-diamond-necklace-display-luxurious-jewelry-exquisite-craftsmanship-precious-gemstones-elegant-design-highend-fashion-accessory-beautiful-green-gems_632498-31163.jpg?t=st=1740483345~exp=1740486945~hmac=ff03b861ed65bb2d77db350e65d951eb09d95ec5bb94b8b9657ff66ef9b46a74&w=996"
    },
    {
      name: "Bags & Footwear",
      image: "https://img.freepik.com/free-photo/stylish-woman-carrying-handbag-ready-shopping_60438-4020.jpg?t=st=1740483494~exp=1740487094~hmac=e58a066b0bf90ccd441c7a9cbd357bc97841c0eaea172a2e678375201853f57a&w=1800"
    },
    {
      name: "Sports & Fitness",
      image: "https://img.freepik.com/free-photo/bodybuilder-training-arm-with-resistance-band_7502-4758.jpg?t=st=1740482724~exp=1740486324~hmac=6f07c412a5ecde7e9f6147dbca34d520c246f56fd04a4913a05ba4aa57cbc50c&w=1480"
    },
    {
      name: "Car & Motorbike",
      image: "https://img.freepik.com/premium-photo/view-motorcycle-with-car_1048944-7925060.jpg?w=1480"
    },
    {
      name: "Office Supplies & Stationery",
      image: "https://img.freepik.com/free-photo/top-view-picture-frame-with-colorful-pencils-dark-surface-art-color-drawing-college-copybook-school-notepad_140725-108970.jpg?t=st=1740481946~exp=1740485546~hmac=0f8fd153fff7756d85d4cdabb448e120734c4f3fc24dd866db9e998595450ab4&w=1480"
    },
    {
      name: "Pet Supplies",
      image: "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1740481688~exp=1740485288~hmac=370083eaa51971fee85e1012f3ff711518fa22f9946cbbf6586d737281d9a596&w=740"
    },
    {
      name: "Food & Drinks",
      image: "https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*"
    },
    {
      name: "Musical Instruments",
      image: "https://img.freepik.com/premium-photo/still-life-percussion-instrument_23-2151602727.jpg?w=1480"
    },
  ]

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
            <FiSearch className="cursor-pointer hover:text-primary" />
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
              className={`absolute right-0 w-56 px-2 py-4 bg-zinc-50 shadow-lg text-sm transition-opacity duration-100 ${isDropdownVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
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
      <div className="flex justify-center py-2 bg-zinc-100">
        <nav className="">

          <div className="flex items-center gap-6 px-8 text-gray-700 text-sm">
            {category.map((cat, index) => (
              <Link key={index} to={`/categories/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="flex items-center justify-center flex-col hover:text-primary">
                <img src={cat.image} className="w-18 h-18 mb-2" alt={cat.name} />
                <span className="flex justify-center text-center">{cat.name}</span>
              </Link>
            ))}

          </div>
        </nav>
      </div>
    </header>
  );
}
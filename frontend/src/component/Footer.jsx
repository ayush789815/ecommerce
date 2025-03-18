import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Exclusive</h3>
            <h4 className="mb-2">Subscribe</h4>
            <p className="mb-4">Get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-l"
              />
              <button className="bg-primary px-4 rounded-r hover:bg-red-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <p className="mb-2">1343,Navjeevan Colony Bhopal</p>
            <p className="mb-2">M.P. 462001 India</p>
            <p className="mb-2">exclusive@gmail.com</p>
            <p>+91 8839042497</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Account</h3>
            <nav className="space-y-2">
              <Link to={'/myaccount'} className="block hover:text-primary">My Account</Link>
              <Link to={'/login'} className="block hover:text-primary">Login / Register</Link>
              <Link to={'/addToCart'} className="block hover:text-primary">Cart</Link>
              <Link to={'/wishlist'} className="block hover:text-primary">Wishlist</Link>
              <Link to={'/home'} className="block hover:text-primary">Shop</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Link</h3>
            <nav className="space-y-2">
              <a href="#privacy" className="block hover:text-primary">Privacy Policy</a>
              <a href="#terms" className="block hover:text-primary">Terms Of Use</a>
              <a href="#faq" className="block hover:text-primary">FAQ</a>
              <Link to={'/contact'} className="block hover:text-primary">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
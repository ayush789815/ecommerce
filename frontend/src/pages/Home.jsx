import { useState } from 'react'
import Header from '../component/Header/Header'
import FlashSale from '../component/sections/FlashSale'
import Categories from '../component/sections/Categories'
import BestSelling from '../component/sections/BestSelling'
import MusicBanner from '../component/sections/MusicBanner'
import NewArrivals from '../component/sections/NewArrivals'
import Services from '../component/sections/Services'
import Footer from '../component/Footer'

export default function HomePage() {
  const [flashSaleTime] = useState({
    hours: 3,
    minutes: 23,
    seconds: 19
  })

  const flashSaleProducts = [
    {
      id: 1,
      name: 'HAVIT HV-G92 Gamepad',
      price: 120,
      originalPrice: 160,
      rating: 4.5,
      reviews: 88,
      discount: '-35%',
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 2,
      name: 'AK-900 Wired Keyboard',
      price: 200,
      originalPrice: 250,
      rating: 4.7,
      reviews: 75,
      discount: '-25%',
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 3,
      name: 'IPS LCD Gaming Monitor',
      price: 370,
      originalPrice: 400,
      rating: 4.8,
      reviews: 99,
      discount: '-30%',
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 4,
      name: 'RGB liquid CPU Cooler',
      price: 160,
      originalPrice: 170,
      rating: 4.6,
      reviews: 65,
      image: 'https://via.placeholder.com/200x200'
    }
  ]

  const categories = [
    { id: 1, name: 'Phones', icon: '📱' },
    { id: 2, name: 'Computers', icon: '💻' },
    { id: 3, name: 'SmartWatch', icon: '⌚' },
    { id: 4, name: 'Camera', icon: '📸' },
    { id: 5, name: 'HeadPhones', icon: '🎧' },
    { id: 6, name: 'Gaming', icon: '🎮' }
  ]

  const bestSelling = [
    {
      id: 1,
      name: 'The north coat',
      price: 260,
      originalPrice: 360,
      rating: 5,
      reviews: 65,
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 2,
      name: 'Gucci duffle bag',
      price: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 3,
      name: 'RGB liquid CPU Cooler',
      price: 160,
      originalPrice: 170,
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/200x200'
    },
    {
      id: 4,
      name: 'Small BookShelf',
      price: 360,
      rating: 4.5,
      reviews: 65,
      image: 'https://via.placeholder.com/200x200'
    }
  ]

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4">
        <FlashSale products={flashSaleProducts} time={flashSaleTime} />
        <Categories categories={categories} />
        <BestSelling products={bestSelling} />
        <MusicBanner />
        <NewArrivals />
        <Services />
      </main>
      <Footer />
    </div>
  )
}
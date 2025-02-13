import { useEffect, useState } from 'react'
import Header from '../component/Header/Header'
import FlashSale from '../component/sections/FlashSale'
import Categories from '../component/sections/Categories'
import BestSelling from '../component/sections/BestSelling'
import MusicBanner from '../component/sections/MusicBanner'
import NewArrivals from '../component/sections/NewArrivals'
import Services from '../component/sections/Services'
import Footer from '../component/Footer'
import axios from 'axios'

export default function HomePage () {
 
  const [product, setProduct] = useState([])

 
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/getProduct`)
      setProduct(response.data.products)  
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  fetchProducts()
}, []) 

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
      image: 'https://images.unsplash.com/photo-1602081918793-f518aee5ff8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5vcnRoJTIwY29hdHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 2,
      name: 'Gucci duffle bag',
      price: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8R3VjY2klMjBkdWZmbGUlMjBiYWd8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 3,
      name: 'RGB liquid CPU Cooler',
      price: 160,
      originalPrice: 170,
      rating: 4.5,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=200&dpr=1&crop=entropy&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 4,
      name: 'Small BookShelf',
      price: 360,
      rating: 4.5,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1614350048512-98ef79f6f829?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNtYWxsJTIwQm9va1NoZWxmfGVufDB8fDB8fHww'
    }
  ]

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4">
        <FlashSale products={product}  />
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
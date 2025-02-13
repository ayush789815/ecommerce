import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import {addToCart} from '../axios/axios';

function ProductPage() {
    const { productId } = useParams()
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('white');
    const userId = localStorage.getItem('userId'); // Get user ID from local storage

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL}/getProduct/${productId}`)
                setProduct(response.data.product)
                localStorage.setItem('userId' ,userId)
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct()
    }, [productId])
    if (!product) {
        return <div>Loading...</div>
    }
    const images = product.image;
    const handleAddToCart = async ()=>{
        try{ 
            await addToCart(userId,productId,quantity)
            alert("product added to cart")
        } catch(error){
            console.error('Error adding product to cart:', error);
            alert("faild to addd product to cart")
        }
    }
    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <div className="mb-4">
                            <img
                                src={images[selectedImage]}
                                alt="Product"
                                className="w-full h-96 object-center object-cover rounded-lg" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`border rounded-lg p-2 ${selectedImage === index ? 'border-red-500' : ''}`}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
                        <div className="flex flex-col  mb-4">
                            <div className="flex  text-yellow-400">
                                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                            </div>
                            <span className="text-gray-500 ">{product.reviews}</span>
                            <span className="text-green-500 ">In Stock</span>
                        </div>
                        <div className="text-2xl font-bold mb-6">${product.price}</div>
                        <p className="text-gray-600 mb-6">
                            {product.description}
                        </p>
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Colors:</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedColor('white')}
                                    className={`w-8 h-8 rounded-full bg-white border ${selectedColor === 'white' ? 'ring-2 ring-red-500' : ''
                                        }`}
                                />
                                <button
                                    onClick={() => setSelectedColor('pink')}
                                    className={`w-8 h-8 rounded-full bg-pink-500 ${selectedColor === 'pink' ? 'ring-2 ring-red-500' : ''
                                        }`}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                           
                            <button className="p-2 border rounded-lg hover:border-red-500">
                                <Heart className="h-6 w-6" />
                            </button>
                            <button className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600">
                                Buy Now
                            </button>
                        </div>

                        <div className='pb-4 flex gap-4'>
                        <div className="flex items-center border rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <button  onClick={()=>handleAddToCart()} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                                Add To Cart
                            </button>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-4">Free Delivery</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Enter your postal code for Delivery Availability
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    className="border rounded px-3 py-2 flex-grow"
                                />
                                <button className="text-red-500 font-semibold">Check</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductPage

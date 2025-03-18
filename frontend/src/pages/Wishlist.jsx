import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from "../components/ui/spinner";

function Wishlist() {
    const [wishlist, setWishlist] = useState(null);
    const userId = localStorage.getItem('userId');

    const getWishlist = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/wishlist/${userId}`);
            setWishlist(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            toast.error('Error fetching wishlist');
        }
    };

    useEffect(() => {
        if (userId) {
            getWishlist(userId);
        }
    }, [userId]);

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL}/wishlist`, {
                data: { userId, productId }
            });
            toast.success('Product removed from wishlist');
            getWishlist(userId); // Refresh the wishlist
        } catch (error) {
            console.error("Error removing product from wishlist:", error);
            toast.error('Error removing product from wishlist');
        }
    };

    // ✅ Show Spinner While Loading
    if (wishlist === null) {
        return (
            <div className="flex justify-center items-center py-8">
                <Spinner size="lg" color="blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Wishlist Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="grid grid-cols-5 gap-6 mb-4 pb-4 border-b">
                                <div className="col-span-2">Product</div>
                                <div>Price</div>
                                <div>Actions</div>
                            </div>

                            {wishlist?.products?.length === 0 ? (
                                <div className="text-center text-gray-500 text-xl py-10">
                                    No products in wishlist 😔
                                </div>
                            ) : (
                                wishlist.products.map(product => (
                                    product.productId && (
                                        <div key={product.productId._id} className="grid grid-cols-5 gap-6 items-center mb-6 pb-6 border-b">
                                            <div className="col-span-2 flex items-center space-x-4">
                                                <img src={product.productId.image} alt={product.productId.productName} className="w-20 h-20 object-cover rounded" />
                                                <span>{product.productId.productName}</span>
                                            </div>
                                            <div>${product.productId.price}</div>
                                            <div>
                                                <button className="text-gray-400 hover:text-gray-600" onClick={() => removeFromWishlist(product.productId._id)}>
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Header from '../component/Header/Header';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Spinner } from "../components/ui/spinner";
import { toast } from 'react-toastify';

function AddToCart() {
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState(null);
    const userId = localStorage.getItem('userId');

    // ✅ Fetch Cart Items
    const getCart = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getCart/${userId}`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Error fetching cart');
        }
    };

    useEffect(() => {
        if (userId) {
            getCart(userId);
        }
    }, [userId]);

    // ✅ Update Product Quantity
    const updateQuantity = async (productId, value) => {
        const newQuantity = Math.max(0, value);
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));

        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/updateCart`, {
                userId,
                productId,
                quantity: newQuantity
            });
            toast.success('Cart updated successfully');
            getCart(userId);
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error('Error updating cart');
        }
    };

    // ✅ Remove Product from Cart (Without Refresh)
    const removeProduct = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_URL}/removeFromCart`, {
                data: { userId, productId }
            });
            toast.success('Product removed from cart');

            // ✅ Manually remove product from cart state
            setCart(prevCart => ({
                ...prevCart,
                products: prevCart.products.filter(product => product.productId._id !== productId)
            }));
        } catch (error) {
            console.error("Error removing product from cart:", error);
            toast.error('Error removing product from cart');
        }
    };

    // ✅ Calculate Total Price
    const calculateTotal = () => {
        return cart?.products?.reduce((total, product) => {
            return total + ((product.productId?.price || 0) * product.quantity);
        }, 0);
    };

    // ✅ Show Spinner While Loading
    if (!cart) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="blue" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Cart Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="grid grid-cols-5 gap-6 mb-4 pb-4 border-b">
                                <div className="col-span-2">Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Subtotal</div>
                            </div>

                            {/* ✅ Show Message if No Products in Cart */}
                            {cart.products.length === 0 ? (
                                <div className="text-center text-gray-500 text-xl py-10">
                                    Your cart is empty 🛒
                                </div>
                            ) : (
                                cart.products.map(product => (
                                    product.productId && (
                                        <div key={product.productId._id} className="grid grid-cols-5 gap-6 items-center mb-6 pb-6 border-b">
                                            <div className="col-span-2 flex items-center space-x-4">
                                                <button className="text-gray-400 hover:text-gray-600" onClick={() => removeProduct(product.productId._id)}>
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <img src={product.productId.image} alt={product.productId.productName} className="w-20 h-20 object-cover rounded" />
                                                <span>{product.productId.productName}</span>
                                            </div>
                                            <div>${product.productId.price}</div>
                                            <div>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantities[product.productId._id] || product.quantity}
                                                    onChange={(e) => updateQuantity(product.productId._id, parseInt(e.target.value) || 1)}
                                                    className="w-16 border rounded px-2 py-1"
                                                />
                                            </div>
                                            <div>${product.productId.price * product.quantity}</div>
                                        </div>
                                    )
                                ))
                            )}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <Link to={'/home'} className='px-6 py-2 border border-gray-300 rounded hover:bg-gray-50'>
                                Return To Shop
                            </Link>
                            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                                Update Cart
                            </button>
                        </div>
                    </div>

                    {/* Cart Total */}
                    {cart.products.length > 0 && (
                        <div className="w-96">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Cart Total</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between pb-3 border-b">
                                        <span>Subtotal:</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between pb-3 border-b">
                                        <span>Shipping:</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>

                            <div className="mt-6">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        className="flex-1 border rounded-l px-4 py-2"
                                    />
                                    <button className="bg-red-500 text-white px-6 py-2 rounded-r hover:bg-red-600 transition-colors">
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddToCart;

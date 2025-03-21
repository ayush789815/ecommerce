import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../axios/axios';
import { toast } from 'react-toastify';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Spinner } from "../components/ui/spinner";
import { ChevronDown, ChevronUp, ShoppingBag, Calendar, CreditCard, Check } from 'lucide-react';

// Sample data for testing when API fails
const SAMPLE_ORDERS = [
  {
    _id: "sample-order-1",
    createdAt: new Date().toISOString(),
    totalAmount: 129.99,
    status: "delivered",
    products: [
      {
        productId: {
          _id: "sample-product-1",
          productName: "Sample Product",
          price: 49.99,
          image: "https://via.placeholder.com/150",
        },
        quantity: 2
      }
    ],
    shippingAddress: {
      street: "123 Sample St",
      city: "Sample City",
      state: "Sample State",
      zip: "12345",
      country: "Sample Country"
    },
    paymentMethod: "Credit Card",
    paymentId: "SAMPLE-PAY-123",
    subtotal: 99.98,
    shippingFee: 10.00,
    tax: 20.01
  }
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [useBackupData, setUseBackupData] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (!userId) {
          toast.error('Please login to view your orders');
          return;
        }
        const data = await getUserOrders(userId);
        setOrders(data);
        setUseBackupData(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Unable to connect to orders service. Showing sample data for demonstration.');
        // Use sample data for demonstration
        setOrders(SAMPLE_ORDERS);
        setUseBackupData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <Spinner size="xl" />
        </div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders found</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link to="/home" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          
          {useBackupData && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p className="font-bold">Demo Mode</p>
              <p>Unable to connect to the orders service. Showing sample data for demonstration purposes.</p>
            </div>
          )}
          
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-100 px-4 py-3 flex flex-wrap items-center justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <div>
                      <span className="text-sm text-gray-500">Order Placed:</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="font-medium">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total:</span>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        <span className="font-medium">${(order.totalAmount || 0).toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Order #:</span>
                      <span className="font-medium ml-1">{order._id.substring(0, 8)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleOrderExpand(order._id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {expandedOrder === order._id ? (
                      <>
                        <span>Hide Details</span>
                        <ChevronUp className="h-5 w-5 ml-1" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </button>
                </div>
                
                {/* Order Status */}
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      {order.status === 'delivered' ? 'Delivered' : 
                       order.status === 'shipped' ? 'Shipped' : 
                       order.status === 'processing' ? 'Processing' : 'Order Placed'}
                    </span>
                  </div>
                </div>
                
                {/* Order Items (expanded view) */}
                {expandedOrder === order._id && (
                  <div className="px-4 py-3">
                    <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                    <div className="divide-y">
                      {order.products && order.products.map((item, index) => (
                        <div key={item.productId?._id || index} className="py-4 flex flex-col sm:flex-row">
                          <div className="sm:w-24 mb-3 sm:mb-0">
                            <img 
                              src={item.productId && Array.isArray(item.productId.image) ? item.productId.image[0] : (item.productId?.image || 'https://via.placeholder.com/150')} 
                              alt={item.productId?.productName || 'Product'}
                              className="w-full h-24 object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 sm:ml-4">
                            <h4 className="font-medium">{item.productId?.productName || 'Product'}</h4>
                            <div className="text-gray-600 mt-1">
                              <p>Quantity: {item.quantity || 1}</p>
                              <p className="mt-1">Price: ${(item.productId?.price || 0).toFixed(2)}</p>
                            </div>
                            {item.productId?._id && (
                              <Link 
                                to={`/product/${item.productId?._id}`}
                                className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Product
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div className="mt-4 border-t pt-4">
                        <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                        <address className="not-italic">
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                          {order.shippingAddress.country}
                        </address>
                      </div>
                    )}
                    
                    {/* Payment Info */}
                    <div className="mt-4 border-t pt-4">
                      <h3 className="font-semibold text-lg mb-2">Payment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Payment Method:</p>
                          <p className="font-medium">{order.paymentMethod || 'Online Payment'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment ID:</p>
                          <p className="font-medium">{order.paymentId || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div className="mt-4 border-t pt-4">
                      <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>${(order.subtotal || order.totalAmount || 0).toFixed(2)}</span>
                        </div>
                        {order.shippingFee !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span>${(order.shippingFee || 0).toFixed(2)}</span>
                          </div>
                        )}
                        {order.tax !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax:</span>
                            <span>${(order.tax || 0).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total:</span>
                          <span>${(order.totalAmount || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/home" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
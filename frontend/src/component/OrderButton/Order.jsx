import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = ({ productId, amount }) => {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);

    try {
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_URL}/getkey`);
      console.log('key', key);

      const response = await axios.post(`${import.meta.env.VITE_URL}/checkout`, { amount });
      const { order } = response.data;
      console.log('Order created:', order);
      toast.success('Order created successfully');

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Abhishek Maheshwari",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/paymentVerification",
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleOrder}
      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
};

export default Order;
import React from 'react';
import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference_no = searchParams.get("reference_no");

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-600 px-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
        <p className="text-xl mb-4">Thank you for your purchase!</p>
        <p className="text-lg">Your payment has been processed successfully.</p>
        <p className="text-lg font-semibold mt-4">Reference No: {reference_no}</p>
        <button
          onClick={() => window.location.href = '/home'}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
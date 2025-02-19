import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { addProduct } from "../axios/axios";

const initialProduct = {
  productName: '',
  category: '',
  price: '',
  discount: '',
  originalPrice: '',
  description: '',
  image: [], // Retain the name as image
  rating: '',
  reviews: ''
};

export default function AddProduct() {
  const [product, setProduct] = useState(initialProduct);
  const [currentStep, setCurrentStep] = useState(4);
  const [totalSteps] = useState(7);
  const [expandedSections, setExpandedSections] = useState({
    stock: true,
    instructions: true,
    certificate: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate discount price when price or discount changes
    if (name === 'price' || name === 'discount') {
      const price = name === 'price' ? parseFloat(value) : parseFloat(product.price);
      const discount = name === 'discount' ? parseFloat(value) : parseFloat(product.discount);

      if (!isNaN(price) && !isNaN(discount)) {
        const originalPrice = price - (price * (discount / 100));
        setProduct(prev => ({
          ...prev,
          originalPrice: originalPrice.toFixed(2)
        }));
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newImages).then(images => {
      setProduct(prev => ({
        ...prev,
        image: [...prev.image, ...images]
      }));
    });
  };

  const handleRemoveImage = (index) => {
    setProduct(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct(product);
      console.log('Product added successfully:', response);
      alert('Product added successfully');
      setProduct(initialProduct); // Reset the form
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{currentStep}/{totalSteps}</span>
            <button type="button" className="ml-4">
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Product Image */}
            <div>
              <h2 className="text-lg font-medium mb-4">Product Images</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {product.image.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {product.image.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-64 object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow text-red-500 hover:bg-red-50"
                            onClick={() => handleRemoveImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer inline-flex flex-col items-center space-y-2"
                      >
                        <div className="p-3 bg-blue-50 rounded-full">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-blue-600 hover:text-blue-700">Add Product Images</span>
                        <span className="text-sm text-gray-500">or drag and drop</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - General Information */}
            <div>
              <h2 className="text-lg font-medium mb-4">General Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Category</label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="moisturizer">Moisturizer</option>
                      <option value="cleanser">Cleanser</option>
                      <option value="serum">Serum</option>
                      <option value="toner">Toner</option>
                      <option value="mask">Face Mask</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Original Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Discount</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Final Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        name="discountPrice"
                        value={product.originalPrice}
                        readOnly
                        className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Product Description</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product description..."
                    maxLength={500}
                  />
                  <div className="text-right text-sm text-gray-500">
                    {product.description.length}/500
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="mt-8 space-y-4">
            {/* Manage Stock */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('stock')}
                className="w-full px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium">Manage Stock</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    2/2
                  </span>
                </div>
                {expandedSections.stock ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedSections.stock && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter stock quantity"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">SKU</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter SKU"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setProduct(initialProduct)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
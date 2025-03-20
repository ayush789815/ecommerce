import axios from 'axios';

const API_URL = import.meta.env.VITE_URL;

// Auth endpoints
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Product endpoints
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/api/getProduct/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/api/product`, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getAllProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/api/getProduct?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/api/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/api/getProductsByCategory/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getProductsByType = async (productType) => {
  try {
    const response = await axios.get(`${API_URL}/api/getProductsByType/${productType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by type:', error);
    throw error;
  }
};

// Cart endpoints
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/getCart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/api/addToCart`, { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/api/updateCart`, { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/removeFromCart`, {
      data: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Wishlist endpoints
export const getWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const response = await axios.post(`${API_URL}/api/wishlist`, { userId, productId });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/wishlist`, {
      data: { userId, productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Payment endpoints
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/create-order`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/verify`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Best selling products
export const getBestSellingProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/bestSelling`);
    return response.data;
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw error;
  }
};

// User profile
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/api/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Health check endpoint
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Server health check failed:', error);
    throw error;
  }
};

// Configure axios defaults and interceptors
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axios;

import axios from 'axios';

const API_URL = import.meta.env.VITE_URL;

// Create an axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Product endpoints
export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/getProduct/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await api.post('/product', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getAllProducts = async (page = 1) => {
  try {
    const response = await api.get(`/getProduct?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/getProductsByCategory/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getProductsByType = async (productType) => {
  try {
    const response = await api.get(`/getProductsByType/${productType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by type:', error);
    throw error;
  }
};

// Cart endpoints
export const getCart = async (userId) => {
  try {
    const response = await api.get(`/getCart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post('/addToCart', { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCart = async (userId, productId, quantity) => {
  try {
    const response = await api.put('/updateCart', { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await api.delete('/removeFromCart', {
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
    const response = await api.get(`/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    const response = await api.post('/wishlist', { userId, productId });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await api.delete('/wishlist', {
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
    const response = await api.post('/payment/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/payment/verify', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Best selling products
export const getBestSellingProducts = async () => {
  try {
    const response = await api.get('/bestSelling');
    return response.data;
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw error;
  }
};

// User profile
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await api.put(`/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Order endpoints
export const getUserOrders = async (userId) => {
  try {
    // Try several possible endpoints based on API patterns
    try {
      // First attempt: orders by user ID
      const response = await api.get(`/orders/user/${userId}`);
      return response.data;
    } catch (firstError) {
      console.log("First attempt failed, trying another endpoint format");
      
      try {
        // Second attempt: get orders from user endpoint
        const response = await api.get(`/user/${userId}/orders`);
        return response.data;
      } catch (secondError) {
        try {
          // Third attempt: using order history endpoint
          const response = await api.get(`/order-history/${userId}`);
          return response.data;
        } catch (thirdError) {
          try {
            // Fourth attempt: using the payment history endpoint
            const response = await api.get(`/payment/history/${userId}`);
            return response.data;
          } catch (fourthError) {
            // All attempts failed, throw the original error
            throw firstError;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/details/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// Health check endpoint
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Server health check failed:', error);
    throw error;
  }
};

// Export the configured axios instance
export default api;

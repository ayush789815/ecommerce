import axios from 'axios';

const API_URL = import.meta.env.VITE_URL;

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/addToCart`, { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/product`, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

const express = require('express');
const router = express.Router();
const productModel = require('../models/product.Model');

// Route to get best-selling products

exports.bestSelling = async (req, res) => {
    try {
        // Fetch products sorted by sales or any other criteria
        const bestSellingProducts = await productModel.aggregate([{ $sample: { size: 10 } }]);
        res.json({ products: bestSellingProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

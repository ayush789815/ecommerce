const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    discount: {
        type: String
    },
    originalPrice: {
        type: String
    },
    reviews: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true // Ensure productType is required
    },
    addwishlist: {
        type: Boolean
    }
});
module.exports = mongoose.model('Product', productSchema);
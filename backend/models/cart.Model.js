const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId
    },
    productName:{
        type:String,
    },
    quantity: {
        type: Number,
        default: 1, // Default to 1 if no quantity is provided
        min: [1, 'Quantity must be at least 1'] // Ensures quantity is at least 1
    }
})
module.exports = mongoose.model('Cart', cartSchema);
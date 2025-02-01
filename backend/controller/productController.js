const productModel = require('../models/product.Model');
const Cart = require('../models/cart.Model');
exports.createProduct = async (req, res) => {
    const { productName, discription, price } = req.body;
    try {
        const newProduct = await productModel.create({
            productName,
            discription,
            price
        })
        res.status(201).json({product:newProduct, message: 'Product created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
        
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
exports.addToCart = async (req, res) => {
    const { productId, productName, quantity } = req.body;
    console.log(productId, productName, quantity);
    
    // Validate quantity
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            // If product already in cart, increase quantity
            cartItem.quantity += quantity;
        } else {
            // Otherwise, create new cart item
            cartItem = new Cart({
                productId,
                productName,
                quantity
            });
        }

        await cartItem.save();
        res.json({ message: 'Product added to cart', cartItem });

    } catch (error) {
        console.log("Error in addToCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// exports.getCartItems = async (req, res) => {
//     try {
//         const cartItems = await Cart.find();
//         res.status(200).json({cartItems});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }
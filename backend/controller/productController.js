const productModel = require('../models/product.Model');
const Cart = require('../models/cart.Model');
exports.createProduct = async (req, res) => {
    try {
        const { productName, image, price, rating, discount, originalPrice, reviews, category, productType, addwishlist } = req.body;
        const formattedProductType = Array.isArray(productType) ? productType : [productType];
        const newProduct = await productModel.create({
            productName,
            image,
            price,
            rating,
            discount,
            originalPrice,
            reviews,
            category,
            productType: formattedProductType,
            addwishlist
        })
        res.status(201).json({ product: newProduct, message: 'Product created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }
}
// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await productModel.find();
//         res.status(200).json({ products });
//         // console.log(products)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }
exports.getAllProducts = async (req, res) => {
    try {
        let { page } = req.query;
        page = parseInt(page) || 1; // Default page = 1

        const limit = 8; // Products per page
        const skip = (page - 1) * limit;

        const products = await productModel.find().skip(skip).limit(limit);

        const totalProducts = await productModel.countDocuments(); // Total products count
        const totalPages = Math.ceil(totalProducts / limit); // Total pages

        res.status(200).json({
            page,
            totalPages,
            totalProducts,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ product })
        // console.log(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from req.params

        const cart = await Cart.findOne({ userId })
            .populate("products.productId", "productName price image addwishlist");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Find product and update quantity
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();
        res.json({ message: "Cart updated successfully", cart });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(product => product.productId.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    console.log('Category:', category); // Debugging log
    try {
        const products = await productModel.find({ category });
        console.log('Products Found:', products); // Debugging log

        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getProductsByProductType = async (req, res) => {
    try {
        const { productType } = req.params;

        // Ensure productType is treated correctly for filtering
        const products = await productModel.find({
            productType: { $in: productType.split(',') } // Allow multiple types in URL
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this product type" });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error("Error in getProductsByProductType:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

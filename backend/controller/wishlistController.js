const mongoose = require("mongoose");
const Product = require("../models/product.Model");
const Wishlist = require("../models/wishlist.Model");

exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.findOne({ userId })
            .populate("products.productId", "productName price image addwishlist");

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Validate productId as ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // If wishlist does not exist, create a new one and add the product
            wishlist = new Wishlist({ userId, products: [{ productId }] });
            await wishlist.save();

            // Update product's addwishlist status to true
            await Product.findByIdAndUpdate(productId, { addwishlist: true });

            return res.status(200).json({ message: "Product added to wishlist", wishlist });
        }

        const productIndex = wishlist.products.findIndex(product => product.productId.toString() === productId);

        if (productIndex > -1) {
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();

            await Product.findByIdAndUpdate(productId, { addwishlist: false });

            return res.status(200).json({ message: "Product removed from wishlist", wishlist });
        } else {
            wishlist.products.push({ productId });
            await wishlist.save();

            await Product.findByIdAndUpdate(productId, { addwishlist: true });

            return res.status(200).json({ message: "Product added to wishlist", wishlist });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(product => product.productId.toString() !== productId);

        await wishlist.save();
        await Product.findByIdAndUpdate(productId, { addwishlist: false });

        res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
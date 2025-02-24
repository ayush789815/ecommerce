const instance = require("../utils/razorpayInstance");

exports.checkout = async (req, res, next) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

exports.paymentVerification = async (req, res, next) => {
    try {
        console.log(req.body);
        
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Error payment verification:', error);
        res.status(500).json({
            success: false,
            message: 'Error payment verification',
            error: error.message
        });
    }
};

exports.getKey = async (req, res, next) => {
    try {
     
        res.status(200).json({
            key:process.env.RAZORPAY_API_KEY
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while accessing key',
            error: error.message
        });
    }
};



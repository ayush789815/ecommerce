const User = require( "../models/userModel")
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res, next) => {
    
    
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: "token is required"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            console.log('decoded is not found');
            
        }
        const user = await User.findById(decoded.userId).select('-password')
        if(!user) {
            console.log('user not found');

        }
        req.user = user

        return next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"})
    }
}

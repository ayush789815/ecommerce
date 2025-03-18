const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });   
        await newUser.save();  
        return res.status(201).json({ message: "User registered successfully", newUser });

    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = async (req,res)=> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "User logged in successfully",token,userId: user._id});
        

    }
    catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error('Error in user logout:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log('Fetching user with ID:', userId); // Add logging

        const user = await User.findById(userId).select('-password');
        if (!user) {
            console.log('User not found'); // Add logging
            return res.status(404).json({ message: "User not found" });
        }
        // console.log('User fetched successfully:', user); // Add logging
        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error('Error in fetching user:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUserProfile = async (req, res, next) => {
    if (!req.user) {
        console.log('User not authenticated'); // Add logging
        return res.status(401).json({ message: "User not authenticated" });
    }
    res.status(200).json({message: "User profile fetched successfully",user:req.user});
}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, profileImage, address, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, profileImage, address, phone },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
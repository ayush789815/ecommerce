const User = require('../models/userModel');
const bcrypt = require('bcrypt');
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

        
        return res.status(201).json({ message: "User registered successfully" });

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
        return res.status(200).json({ message: "User logged in successfully" });
        

    }
    catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
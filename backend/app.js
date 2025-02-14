const express = require('express');
const  dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const wishlistRoute = require('./routes/wishlistRoute')
app.use(express.json());
app.use(cors());
connectDB()


app.use('/api', authRoute)
app.use('/api', productRoute)
app.use("/api", wishlistRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
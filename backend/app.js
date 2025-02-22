const express = require('express');
const  dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const wishlistRoute = require('./routes/wishlistRoute')
const bestSellingRoute = require('./routes/bestSellingRoute')
app.use(cors())
app.use(express.json({ limit: '50mb' })); // Increase JSON body size limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase URL encoded body limit

connectDB()


app.use('/api', authRoute)
app.use('/api', productRoute)
app.use("/api", wishlistRoute)
app.use("/api", bestSellingRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
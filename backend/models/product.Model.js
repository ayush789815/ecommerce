const mongoose = require('mongoose');
const  productSchema = new mongoose.Schema({
    
    productName:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
    
    discription:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Product',productSchema)
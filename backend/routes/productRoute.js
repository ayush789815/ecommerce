const { Router } = require('express');
const { createProduct, getAllProducts,getProductById, addToCart,getCart,updateCart,removeFromCart,getProductsByCategory,getProductsByProductType,searchProducts} = require('../controller/productController');
const router = Router();

router.post('/product', createProduct)
router.get('/getProduct', getAllProducts)
router.get('/getProduct/:id',getProductById)
router.post('/addToCart', addToCart)
router.get('/getCart/:userId', getCart);
router.put('/updateCart' , updateCart)// Add this line
router.delete('/removeFromCart', removeFromCart); // Add this line
router.get('/products/category/:category', getProductsByCategory); // Add this line
router.get('/products/productType/:productType', getProductsByProductType); // Add this line
router.get("/searchProducts", searchProducts);

module.exports = router;
const { Router } = require('express');
const { createProduct, getAllProducts, addToCart } = require('../controller/productController');
const router = Router();

router.post('/product', createProduct)
router.get('/getProduct', getAllProducts)
router.post('/addToCart', addToCart)

module.exports = router;
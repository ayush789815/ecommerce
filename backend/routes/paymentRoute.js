const { Router } = require('express');
const { checkout,paymentVerification,getKey } = require('../controller/paymentController');
const router = Router();

router.post('/checkout', checkout)
router.get('/paymentverification', paymentVerification)
router.get('/getkey', getKey)

module.exports = router;
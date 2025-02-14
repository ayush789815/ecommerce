const { Router } = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controller/wishlistController');
const router = Router();

router.get('/wishlist/:userId', getWishlist);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist', removeFromWishlist);

module.exports = router;
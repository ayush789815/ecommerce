const { Router } = require('express');
const router = Router();
const { register ,login,logout} = require('../controller/authController');

router.post('/auth/register',register)
router.post('/auth/login', login)
router.post('/auth/logout', logout); // Add this line

module.exports = router;
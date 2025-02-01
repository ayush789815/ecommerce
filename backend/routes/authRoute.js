const { Router } = require('express');
const router = Router();
const { register ,login} = require('../controller/authController');

router.post('/auth/register',register)
router.post('/auth/login', login)

module.exports = router;
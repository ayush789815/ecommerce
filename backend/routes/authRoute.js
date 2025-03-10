const { Router } = require('express');
const router = Router();
const { register ,login,logout, getUser, getUserProfile, updateProfile} = require('../controller/authController');
const { authUser } = require('../middleware/auth.middleware');


router.post('/auth/register',register)
router.post('/auth/login', login)
router.post('/auth/logout', logout);
router.get('/auth/getuser/:userId',authUser, getUser); 
router.get('/auth/getprofile', authUser, getUserProfile); 
router.put('/auth/updateprofile', authUser, updateProfile); // Add this line

module.exports = router;
const { Router } = require('express');
const { bestSelling } = require("../controller/bestSelling")

const router = Router()


router.get('/bestSelling', bestSelling)

module.exports = router;
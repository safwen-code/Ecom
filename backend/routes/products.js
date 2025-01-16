const express = require('express')

const router = express.Router()

const { addProduct } = require('../controller/productController')
const protect = require('../middelware/authMiddel')

//add product
router.post('/addproduct', protect, addProduct)

module.exports = router

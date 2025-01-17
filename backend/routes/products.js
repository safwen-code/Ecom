const express = require('express')

const router = express.Router()

const { addProduct } = require('../controller/productController')
const protect = require('../middelware/authMiddel')
const upload = require('../middelware/uploadMiddel')
//add product
router.post('/addproduct', protect, upload.single('image'), addProduct)

module.exports = router

const express = require('express')

const router = express.Router()

const {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controller/productController')
const protect = require('../middelware/authMiddel')
const upload = require('../middelware/uploadMiddel')
//add product
router.post('/addproduct', protect, upload.single('image'), addProduct)

//get all products
router.get('/allProducts', allProducts)

//get product
router.get('/:id', protect, getProduct)

//upload product
router.put('/update/:id', protect, upload.single('image'), updateProduct)

//delete product
router.delete('/delete/:id', protect, deleteProduct)

//add review
router.post('/:id/review', protect, addReview)

module.exports = router

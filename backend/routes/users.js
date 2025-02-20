//create route and use its in server.js
//get function
// add middelware user
// add middelware Admin

const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getAllUser,
  getUserId,
  updatedUser,
  deleteUser,
} = require('../controller/userController')

const protect = require('../middelware/authMiddel')
const isAdmin = require('../middelware/adminMiddel.js')

router.post('/register', registerUser)
router.get('/auth', loginUser)
// add admin middel ******
router.get('/all', isAdmin, getAllUser)
router.get('/:id', protect, getUserId)
router.put('/update/:id', protect, updatedUser)
router.delete('/delete/:id', deleteUser)
// add admin middel ******

module.exports = router

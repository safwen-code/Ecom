//create route and use its in server.js
//get function
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

router.post('/register', registerUser)
router.post('/auth', loginUser)
router.get('/all', protect, getAllUser)
router.get('/:id', protect, getUserId)
router.put('/update/:id', protect, updatedUser)
router.delete('/delete/:id', deleteUser)

module.exports = router

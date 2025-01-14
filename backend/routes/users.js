//create route and use its in server.js
//get function
const express = require('express')
const router = express.Router()

const {
  addUser,
  getAllUser,
  getUserId,
  updatedUser,
  deleteUser,
} = require('../controller/userController')

router.get('/all', getAllUser)
router.get('/:id', getUserId)
router.post('/login', addUser)
router.put('/update/:id', updatedUser)
router.delete('/delete/:id', deleteUser)

module.exports = router

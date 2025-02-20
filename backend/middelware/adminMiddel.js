const asyncHandler = require('express-async-handler')
const { pool } = require('../connectdb')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'safwen1234'

const isAdmin = asyncHandler(async (req, res, next) => {
  let token
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)

      const query = `SELECT * FROM "users" WHERE id=$1 `
      const result = await pool.query(query, [decoded.id])

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      req.user = result.rows[0]
      req.user.isadmin = true && next()
    } else {
      return res.status(401).json({ message: 'No token provided' })
    }
  } catch (error) {
    console.error('Error verifying token:', error.message)

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = isAdmin

const asynchandler = require('express-async-handler')
const { pool } = require('../connectdb')
const path = require('path')
const fs = require('fs')
// Add product
const addProduct = asynchandler(async (req, res) => {
  try {
    // Ensure req.user._id exists and is valid
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User not authenticated' })
    }

    // Extract and validate user ID
    const user_id = parseInt(req.user.id, 10)
    if (isNaN(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    //check if req.file not null
    if (!req.file) {
      res.status(404).json('no file uploads')
    }
    //add filename to uploads doc
    const filename = req.file.filename
    const imagePath = path.join('uploads', filename)

    // Extract product details from the request body
    const {
      name,
      price,
      category,
      countInStock,
      numReviews,
      description,
    } = req.body

    // Validate required fields
    if (!name || !price || !imagePath || !category || !description) {
      return res
        .status(400)
        .json({ message: 'Missing required fields in the request body' })
    }

    // Prepare values for the query
    const vls = [
      name,
      user_id,
      imagePath,
      category,
      countInStock || 0, // Default to 0 if not provided
      numReviews || 0, // Default to 0 if not provided
      price,
      description,
    ]

    // SQL query
    const query = `
      INSERT INTO "products" 
      (name, user_id, image, category, count_in_stock, num_reviews, price, description) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `

    // Execute the query
    const result = await pool.query(query, vls)

    // Check result and respond
    if (result.rowCount === 0) {
      fs.unlinkSync(imagePath)
      return res.status(400).json({ message: 'Product could not be added' })
    }

    res.status(200).json(result.rows[0]) // Return the inserted row
  } catch (error) {
    console.error('Error adding product:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = { addProduct }

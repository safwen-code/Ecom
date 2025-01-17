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

//get all products
const allProducts = asynchandler(async (req, res) => {
  try {
    //query
    let query = `SELECT * FROM "products" `
    //get from pool
    const result = await pool.query(query)
    result.rowCount === 0
      ? res.status(404).json('no Porduct add some data')
      : res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json('message error')
  }
})

//get by id
const getProduct = asynchandler(async (req, res) => {
  try {
    let id = req.params.id
    const query = `SELECT * FROM "products" WHERE id = $1`
    const vls = [id]
    const result = await pool.query(query, vls)
    res.json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json('server error')
  }
})

const updateProduct = asynchandler(async (req, res) => {
  try {
    //id product
    const id = req.params.id

    if (!req.file) {
      return res.status(404).json('no file')
    }
    //set the new image
    let imagePath = path.join('uploads', req.file.filename)

    //get the old image
    let query1 = `SELECT  *  FROM "products" WHERE id = ${id}`

    const result1 = await pool.query(query1)
    if (result1.rowCount === 0) {
      fs.unlinkSync(imagePath)
      return res.status(404).json('No product by this id')
    }

    const oldimage = result1.rows[0].image
    const {
      name,
      category,
      description,
      rating,
      num_reviews,
      price,
      count_in_stock,
    } = req.body

    const query = `UPDATE  "products" SET
      name=$1, image=$2, category=$3, description=$4, rating=$5, num_reviews=$6, price=$7, count_in_stock =$8
    WHERE id = ${id} RETURNING *`
    const vls = [
      name,
      imagePath,
      category,
      description,
      rating,
      num_reviews,
      price,
      count_in_stock,
    ]
    const result = await pool.query(query, vls)
    console.log(result.rows[0])
    result.rowCount === 0
      ? res.status(404).json('some problem no data updated')
      : res.status(201).json(result.rows[0])
    //delete old image
    if (oldimage && fs.existsSync(oldimage)) {
      fs.unlinkSync(oldimage)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('take loook for clg')
  }
})

module.exports = { addProduct, allProducts, getProduct, updateProduct }

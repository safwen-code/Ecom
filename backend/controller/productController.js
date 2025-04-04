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
    console.log(req.file)
    //add filename to uploads doc
    const filename = req.file.filename
    const imagePath = path.join('uploads', filename)

    // Extract product details from the request body
    const {
      name,
      category,
      description,
      price,
      countInStock,
      numReviews,
    } = req.body
    console.log(req.body)

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

    res.status(200).json(result.rows[0]) // Return data
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
    const newRes = result.rows.map((product) => {
      const newImg = product.image.replace(/\\/g, '/')
      return {
        ...product,
        image: `${req.protocol}://${req.get('host')}/${newImg}`,
      }
    })
    result.rowCount === 0
      ? res.status(404).json('no Porduct add some data')
      : res.status(200).json(newRes)
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

//update by id and delete file if exist
const updateProduct = asynchandler(async (req, res) => {
  try {
    //id product
    const id = req.params.id

    // Ensure req.user._id exists and is valid
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User not authenticated' })
    }

    // Extract and validate user ID
    const user_id = parseInt(req.user.id, 10)
    if (isNaN(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

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
     user_id=$1, name=$2, image=$3, category=$4, description=$5, rating=$6, num_reviews=$7, price=$8, count_in_stock =$9
    WHERE id = ${id} RETURNING *`
    const vls = [
      user_id,
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

//delete products and his file
const deleteProduct = asynchandler(async (req, res) => {
  try {
    const id = req.params.id
    let query = `delete from "products" where id = ${id} RETURNING image `
    const result = await pool.query(query)
    if (result.rowCount === 0) {
      res.status(404).json('problem in delete thing')
    } else {
      res.status(200).json('product deleted')

      if (result.rows[0].image && fs.existsSync(result.rows[0].image)) {
        fs.unlinkSync(result.rows[0].image)
      }
    }
  } catch (error) {
    console.error(error)
  }
})

// add some reviews
//:id/reviews
//to do
const addReview = asynchandler(async (req, res) => {
  try {
    const { rating, comment } = req.body
    //check user exist
    if (!req.user) {
      res.status(500).json('not authentification')
    }
    let {
      rows: productRow,
    } = await pool.query(`SELECT * FROM "products" WHERE id = $1`, [
      req.params.id,
    ])
    let product = productRow
    if (!product) {
      res.status(404).json('no product found')
    }
    //check if user already review this product
    const {
      rows: reviewsRow,
    } = await pool.query(
      `SELECT * FROM "reviews" WHERE user_id = $1 AND product_id = $2`,
      [req.user.id, req.params.id],
    )
    if (reviewsRow.length > 0) {
      res.status(400).json('you already review this product')
    } else {
      //add review
      await pool.query(
        'INSERT INTO "reviews" (product_id, user_id, name, rating, comment, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          req.params.id,
          req.user.id,
          req.user.name,
          rating,
          comment,
          new Date(),
        ],
      )

      // Recalculate the product rating
      const {
        rows: updatedReviews,
      } = await pool.query(
        'SELECT rating FROM "reviews" WHERE product_id = $1',
        [req.params.id],
      )

      const newRating =
        updatedReviews.reduce((acc, item) => acc + parseFloat(item.rating), 0) /
        updatedReviews.length
      //update data
      await pool.query('UPDATE "products" SET rating = $1 WHERE id = $2', [
        newRating,
        req.params.id,
      ])

      res.status(201).json({ message: 'Review added successfully' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('take look of clg')
  }
})

// get top product by rating

module.exports = {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
}

const express = require('express')
const serveIndex = require('serve-index')

const path = require('path')
const app = express()
const { ConnectionDb, pool } = require('./connectdb')

//require route
const users = require('./routes/users')
const products = require('./routes/products')
//cnt to db
ConnectionDb()

//setup middelware to read req.body
// Middleware to parse JSON
app.use(express.json())

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

// ********** Setup Routes **********
app.use('/api/users', users)
app.use('/api/products', products)

// get access to folder upload
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/uploads', serveIndex(path.join(__dirname, '../uploads')))

// ********** Start Server **********
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000/')
})

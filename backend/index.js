const express = require('express')

const app = express()
const { ConnectionDb, pool } = require('./connectdb')

//require route
const users = require('./routes/users')

//cnt to db
ConnectionDb()

//setup middelware to read req.body
// Middleware to parse JSON
app.use(express.json())

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

// ********** Setup Routes **********
app.use('/api/users', users)

// ********** Start Server **********
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/')
})

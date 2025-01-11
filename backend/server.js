const express = require('express')
const { Client } = require('pg')

const app = express()

// ********** Connect to DB (pgAdmin) **********
const connectdb = new Client({
  user: 'postgres',
  password: 'pascal',
  host: 'localhost',
  database: 'Ecom',
  port: 5432,
})

// Establish connection to the database
connectdb
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database')
  })
  .catch((err) => {
    console.error('Failed to connect to database', err)
    process.exit(1) // Exit the process if DB connection fails
  })

// ********** Setup Routes **********
app.get('/home', (req, res) => {
  res.send('<h1>Hello</h1>') // Display "hello" in an HTML heading
})

// ********** Start Server **********
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/home')
})

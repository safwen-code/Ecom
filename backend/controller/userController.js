const { pool } = require('../connectdb.js')
const asyncHandler = require('express-async-handler')
const hashpassword = require('../utils/hashpasword.js')
const generatetoken = require('../utils/generatetoken.js')

//Add user
const addUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if the user exists
    let test = `SELECT id, name, email, password FROM "user" WHERE email = $1`
    const userExist = await pool.query(test, [email])

    if (userExist.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash the password
    let newpass = hashpassword(password)

    // Insert new user
    const insert = `
      INSERT INTO "user" (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const values = [name, email, newpass]
    const rest = await pool.query(insert, values)

    const { id } = rest.rows[0]

    // Send  response
    res.status(201).json({
      name,
      email,
      password,
      token: generatetoken(id),
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

//display user by id
const getUserId = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    let test = `SELECT * FROM "user" WHERE id = ${id}`
    const result = await pool.query(test)
    console.log(result.rows)
    res.send('<h1>hello from id</h1>')
  } catch (error) {
    console.log(error.message)
  }
})
//display users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    let test = 'SELECT * FROM "user" '
    const resut = await pool.query(test)
    console.log(resut.rows)
    res.send('<h1>Hello</h1>') // Display "hello" in an HTML heading
  } catch (error) {
    console.log(error.message)
  }
})
//update user by id
const updatedUser = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id
    const { name, email, password } = req.body
    const upd = `UPDATE "user" SET name=$1, email=$2, password=$3 where id = ${id};`
    const vls = [name, email, password]
    const reslt = await pool.query(upd, vls)
    console.log(reslt.rows)
    res.send('update user')
  } catch (error) {
    console.log(error.message)
  }
})
//delete user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id
    const del = `delete from "user" where id = ${id}`
    const reslt = await pool.query(del)
    console.log(reslt)
    res.send('delete user')
  } catch (error) {
    console.log(error.message)
  }
})
module.exports = { addUser, getUserId, getAllUser, updatedUser, deleteUser }

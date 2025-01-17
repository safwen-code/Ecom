const { pool } = require('../connectdb.js')
const asyncHandler = require('express-async-handler')
const { hashpassword, camparePassword } = require('../utils/hashpasword.js')
const generatetoken = require('../utils/generatetoken.js')

//register user
//status : done
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if the user exists
    let test = `SELECT id, name, email, password 
    FROM "users" WHERE email = $1`
    const userExist = await pool.query(test, [email])

    if (userExist.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash the password
    let newpass = hashpassword(password)

    // Insert new user
    const insert = `
      INSERT INTO "users" (name, email, password)
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

//login User
//status : done
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body
    let test = 'SELECT id, name, email , password FROM "users" WHERE email = $1'
    const rest = await pool.query(test, [email])
    const user = rest.rows[0]
    if (user && camparePassword(password, user.password)) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generatetoken(user.id),
      })
    }
  } catch (error) {
    console.error(error.message)
  }
})

//display user by id
//status : done
const getUserId = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    let test = `SELECT * FROM "users" WHERE id = $1`
    const result = await pool.query(test, [id])
    const user = result.rows[0]
    user
      ? res.status(200).json({
          name: user.name,
          email: user.email,
          password: user.password,
        })
      : res.status(400).json('user not found by his id')
  } catch (error) {
    console.log(error.message)
  }
})

//display users
//status : done
const getAllUser = asyncHandler(async (req, res) => {
  try {
    let test = 'SELECT * FROM "users" '
    const resut = await pool.query(test)
    const users = resut.rows
    res.status(200).json(users)
  } catch (error) {
    console.log(error.message)
  }
})

//update user by id
//status : done
const updatedUser = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id
    const { name, email, password } = req.body
    const upd = `UPDATE "users" SET name=$1, email=$2, password=$3 where id = ${id} RETURNING  name, email, password;`
    const vls = [name, email, password]
    const reslt = await pool.query(upd, vls)
    reslt.rowCount === 0
      ? res.status(400).json('some problem')
      : res.status(201).json({
          name: name,
          email: email,
          password: hashpassword(password),
          token: generatetoken(id),
        })
    res.send('update user')
  } catch (error) {
    console.log(error.message)
  }
})
//delete user
//status : done
const deleteUser = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id
    const del = `delete from "users" where id = ${id} RETURNING  name, email, password`
    const reslt = await pool.query(del)
    const user = reslt && reslt.rows[0]
    reslt.rowCount === 0
      ? res.status(404).json('user not found')
      : res.status(200).json({
          name: user.name,
          email: user.email,
        })
  } catch (error) {
    console.log(error.message)
  }
})
module.exports = {
  registerUser,
  loginUser,
  getUserId,
  getAllUser,
  updatedUser,
  deleteUser,
}

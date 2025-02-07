const { pool } = require('../connectdb.js')
const asyncHandler = require('express-async-handler')
const { hashpassword, camparePassword } = require('../utils/hashpasword.js')
const generatetoken = require('../utils/generatetoken.js')
const bcrypt = require('bcrypt')
//register user
//status : done
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, isadmin } = req.body

    // Check if the user exists
    let test = `SELECT id, name, email, password, isadmin
    FROM "users" WHERE email = $1`
    const userExist = await pool.query(test, [email])

    if (userExist.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    // Hash the password
    let newpass = hashpassword(password)

    // Insert new user
    const insert = `
      INSERT INTO "users" (name, email, password, isadmin)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    const values = [name, email, newpass, isadmin]
    const rest = await pool.query(insert, values)

    const { id } = rest.rows[0]

    // Send  response
    res.status(201).json({
      id,
      name,
      email,
      password,
      isadmin,
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
    const { email, password } = req.query

    // Query user from the database
    const query =
      'SELECT id, name, email, password, isadmin FROM "users" WHERE email = $1 '
    const result = await pool.query(query, [email])
    const user = result.rows[0]

    let isMatch = await bcrypt.compareSync(password, user.password)

    if (user && isMatch) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isadmin: user.isadmin,
        token: generatetoken(user.id), // Assuming `generatetoken` generates a JWT
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Internal Server Error' })
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
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          isadmin: user.isadmin,
        })
      : res.status(400).json('user not found by his id')
  } catch (error) {
    console.log(error.message)
  }
})

//update user by id
//status : done
const updatedUser = asyncHandler(async (req, res) => {
  try {
    let id = req.user.id
    const { name, email, password } = req.body
    const upd = `UPDATE "users" SET name=$1, email=$2, password=$3 where id = ${id} RETURNING  name, email, password;`
    const vls = [name, email, hashpassword(password)]
    const reslt = await pool.query(upd, vls)
    reslt.rowCount === 0
      ? res.status(400).json('some problem')
      : res.status(201).json({
          name: name,
          email: email,
          password: hashpassword(password),
          token: generatetoken(id),
        })
    res.status(200).json({ msg: 'update user' })
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

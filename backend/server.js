const express = require('express')

const app = express()
const { ConnectionDb, pool } = require('./connectdb')

//cnt to db
ConnectionDb()

// ********** Setup Routes **********
app.get('/home', async (req, res) => {
  let test = 'SELECT * FROM "user" '
  const resut = await pool.query(test)
  console.log(resut.rows)
  res.send('<h1>Hello</h1>') // Display "hello" in an HTML heading
})

app.post('/add', async (req, res) => {
  const insert = `
  INSERT INTO "user" (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
`
  const values = ['ahmed', 'ahmed@gmail.com', 'pascal.html']
  const rest = await pool.query(insert, values)
  console.log(rest)
})

app.delete('/delete/:id', async (req, res) => {
  let id = req.params.id
  const del = `delete from "user" where id = ${id}`
  const reslt = await pool.query(del)
  console.log(reslt)
})

app.put('/upd/:id', async (req, res) => {
  let id = req.params.id
  const upd = `UPDATE "user" SET name=$1, email=$2, password=$3 where id = ${id};`
  const vls = ['siwar', 'siwar@gmail.com', '123456']
  const reslt = await pool.query(upd, vls)
  console.log(reslt.rows)
})

// ********** Start Server **********
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/home')
})

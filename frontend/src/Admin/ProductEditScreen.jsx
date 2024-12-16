import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { Container, TextField, Typography, Box, Button } from '@mui/material'
import { products } from '../utils/data'

const ProductEditeScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setprice] = useState(0)
  const [image, setimage] = useState('')
  const [brand, setbrand] = useState('')
  const [category, setcategory] = useState('')
  const [countInStock, setcountInStock] = useState(0)
  const [description, setdescription] = useState('')
  const [uploading, setuploading] = useState(false)

  const loading = false
  const error = false
  const product = products.find((product) => product._id === id)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setprice(product.price)
      setimage(product.image)
      setbrand(product.brand)
      setcategory(product.category)
      setcountInStock(product.counsetcountInStock)
      setdescription(product.description)
    }
  }, [product])

  const submitHandler = (e) => {
    e.preventDefault()
    //update product
  }
  const uploadFileHandler = async (e) => {
    // const file = e.target.files
    // const formData = new FormData()
    // formData.append('image', file[0])
    // setuploading(true)
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    //   const { data } = await axios.post('/api/upload', formData, config)
    //   setimage(data)
    //   setuploading(false)
    // } catch (error) {
    //   console.error(error)
    //   setuploading(false)
    // }
    //upload file
  }

  return (
    <Container maxWidth="sm">
      <Button
        component={Link}
        to="/admin/productlist"
        variant="contained"
        color="primary"
      >
        Go Back
      </Button>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : product ? (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Price"
              name="email"
              autoComplete="email"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Image"
                name="image"
                autoComplete="email"
                value={image}
                onChange={(e) => setimage(e.target.value)}
              />
              <Button variant="contained" component="label" color="primary">
                Choose File
                <input type="file" hidden onChange={uploadFileHandler} />
              </Button>
              {uploading && <Loader />}
            </>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="brand"
              name="brand"
              autoComplete="email"
              value={brand}
              onChange={(e) => setbrand(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="count in stock"
              name="count"
              autoComplete="email"
              value={countInStock}
              onChange={(e) => setcountInStock(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="category"
              name="category"
              autoComplete="email"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="description"
              name="description"
              autoComplete="email"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit product
            </Button>
          </>
        ) : (
          <Message variant="error">product not found</Message>
        )}
      </Box>
    </Container>
  )
}

export default ProductEditeScreen

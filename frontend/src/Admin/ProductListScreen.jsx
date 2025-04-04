import React, { useState, useEffect } from 'react'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Stack,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addproduct, diplayProducts } from '../Actions/prdActions.js'
import { useNavigate } from 'react-router-dom'
import { ADD_PRODUCT_REQUEST } from '../Constants/prdConstants.js'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  const cltLogin = useSelector((state) => state.cltLogin)
  const { userInfo } = cltLogin
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [productData, setProductData] = useState({
    user_id: '',
    name: '',
    category: '',
    description: '',
    rating: '',
    num_reviews: '',
    price: '',
    count_in_stock: '',
    image: null,
  })
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!userInfo || !userInfo.isadmin) {
      navigate('/login')
    } else {
      dispatch(diplayProducts())
    }
    dispatch({ type: ADD_PRODUCT_REQUEST })
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      // Delete product logic here
    }
  }

  const createProductHandler = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setProductData({
      user_id: '',
      name: '',
      category: '',
      description: '',
      rating: '',
      num_reviews: '',
      price: '',
      count_in_stock: '',

      image: null,
    })
    setPreview(null)
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('category', productData.category)
    formData.append('description', productData.description)
    formData.append('numReviews', productData.num_reviews)
    formData.append('price', productData.price)
    formData.append('countInStock', productData.count_in_stock)
    formData.append('image', productData.image)

    dispatch(addproduct(formData))
    handleClose()
  }

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProductData({ ...productData, image: file })
    setPreview(URL.createObjectURL(file))
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Typography variant={isMobile ? 'h6' : 'h4'} component="h1">
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={createProductHandler}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : isMobile ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} key={product._id}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price} | {product.category}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton
                    component={Link}
                    to={`/admin/product/${product._id}/edit`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>IMAGE</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>BRAND</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/admin/product/${product._id}/edit`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for Adding Product */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                size="small"
                value={productData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.rating}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Number of Reviews"
                name="num_reviews"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.num_reviews}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Stock Count"
                name="count_in_stock"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                value={productData.count_in_stock}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Upload Product Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            {preview && (
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Image Preview
                </Typography>
                <Box mt={1}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '5px',
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductListScreen

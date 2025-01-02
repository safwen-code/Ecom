import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  Typography,
  Paper,
  Container,
  Divider,
  Rating,
  Select,
  MenuItem,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { motion } from 'framer-motion'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { useDispatch, useSelector } from 'react-redux'
import { displayProductby } from '../Actions/prdActions'

const ProductScreen = () => {
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [wishlist, setWishlist] = useState(false)

  let { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(displayProductby(id))
    }
  }, [id, dispatch])

  const productID = useSelector((state) => state.productID)
  const { loading, error, product } = productID

  const navigate = useNavigate()

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Review submitted:', { rating, comment })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <Container>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Grid container spacing={4} mt={3}>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card elevation={6}>
                  <CardMedia
                    sx={{ height: 300 }}
                    image={product.image}
                    title={product.name}
                  />
                  <Box display="flex" justifyContent="center" mt={2}>
                    <IconButton
                      onClick={toggleWishlist}
                      color={wishlist ? 'secondary' : 'default'}
                      aria-label="add to wishlist"
                    >
                      {wishlist ? (
                        <FavoriteIcon fontSize="large" />
                      ) : (
                        <FavoriteBorderIcon fontSize="large" />
                      )}
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card sx={{ padding: 2 }} elevation={4}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Divider />
                  <Box display="flex" alignItems="center" mt={2}>
                    <Rating
                      name="read-only"
                      value={product.rating}
                      readOnly
                      precision={0.5}
                    />
                    <Typography sx={{ ml: 2 }}>
                      {product.numReviews} reviews
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                    Price: ${product.price}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{product.description}</Typography>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Paper sx={{ padding: 3 }} elevation={6}>
                  <Typography variant="h6">Price: ${product.price}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography>
                    Status:{' '}
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Typography>
                  {product.countInStock > 0 && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography>Qty:</Typography>
                      <FormControl fullWidth sx={{ ml: 2 }}>
                        <Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          <Grid container spacing={4} mt={4}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5">Reviews</Typography>
                {product.reviews.length === 0 ? (
                  <Message>No reviews yet</Message>
                ) : (
                  <List>
                    {product.reviews.map((review) => (
                      <ListItem key={review._id} sx={{ mb: 2 }}>
                        <ListItemText
                          primary={
                            <>
                              <Typography variant="h6">
                                {review.name}
                              </Typography>
                              <Rating value={review.rating} readOnly />
                            </>
                          }
                          secondary={review.comment}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5">Write a Review</Typography>
                <Paper elevation={4} sx={{ padding: 3, mt: 2 }}>
                  <form onSubmit={submitHandler}>
                    <Rating
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Comment"
                      multiline
                      rows={4}
                      fullWidth
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" fullWidth>
                      Submit Review
                    </Button>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      )}
    </Container>
  )
}

export default ProductScreen

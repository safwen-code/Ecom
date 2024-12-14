import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
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
} from '@mui/material'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { products, users } from '../utils/data'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setrating] = useState(0)
  const [comment, setcomment] = useState('')

  let { id } = useParams()
  // product
  const product = products.find((product) => product._id === id)
  const loading = false
  const error = false

  const addToCartHandler = () => {
    console.log('add to cart')
  }

  const submitHandler = (e) => {
    // e.preventDefault()
    // add review
    console.log('add review')
  }
  return (
    <Container>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button
          style={{ marginTop: '4px', marginLeft: '2px' }}
          variant="outlined"
        >
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          {/* <Metas title={product.name} /> */}
          <Grid container spacing={2} mt={5}>
            <Grid item xs={12} sm={6} md={4}>
              <CardMedia
                sx={{ height: 300, width: '100%' }}
                image={product.image}
                title={product.name}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.name}
                  </Typography>
                  <Divider variant="middle" component="div" />
                  <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                    <Box display="flex" alignItems="center">
                      <Rating
                        name="half-rating-read"
                        value={product.rating || 0}
                        precision={0.5}
                        readOnly
                      />
                      <Box ml={1}>{product.numReviews} reviews</Box>
                    </Box>
                  </Typography>
                  <Divider variant="middle" component="div" />
                  <Typography variant="body2" sx={{ mt: 1.5, mb: 1.5 }}>
                    Price: ${product.price}
                  </Typography>
                  <Divider variant="middle" component="div" />
                  <Typography variant="body2" sx={{ mt: 1.5, mb: 1.5 }}>
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Paper elevation={6} sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ mt: 1.5, mb: 1.5 }}>
                  Price: ${product.price}
                </Typography>
                <Divider component="div" />
                <Typography variant="span" sx={{ pt: 1.5, pb: 1.5 }}>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Divider component="div" />
                {product.countInStock > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <Typography variant="span">Qty</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={qty}
                        label="Qty"
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
                <Divider component="div" />
                <Button
                  sx={{ mt: 1.5, mb: 1.5 }}
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  fullWidth
                >
                  Add To Cart
                </Button>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Typography variant="h4" gutterBottom>
                Reviews
              </Typography>
              {product.reviews.length === 0 ? (
                <Message variant="error">No reviews</Message>
              ) : (
                <List>
                  {product.reviews.map((review) => (
                    <ListItem
                      key={review._id}
                      alignItems="flex-start"
                      sx={{ mb: 2 }}
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" flexDirection="column">
                            <Typography variant="h6" component="span">
                              {review.name}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={0.5}>
                              <Rating value={review.rating} readOnly />
                              {/* <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                {review.createdAt.substring(0, 10)}
                              </Typography> */}
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Typography component="p" sx={{ mt: 1 }}>
                            {review.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>

            {/* <Grid item xs={12} md={4} lg={3}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Write a Customer Review
                </Typography>
                {errorProductReview && (
                  <Message variant="error"> {errorProductReview}</Message>
                )}
                {userInfo ? (
                  <AddReviews
                    rating={rating}
                    comment={comment}
                    setrating={setrating}
                    setcomment={setcomment}
                    submitHandler={submitHandler}
                  />
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </Box>
            </Grid> */}
          </Grid>
        </>
      )}
    </Container>
  )
}

export default ProductScreen

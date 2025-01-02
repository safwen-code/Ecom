import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AddToCart, removeFromCart } from '../Actions/cartaction'

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (id) {
      dispatch(AddToCart(id, qty))
    }
  }, [id, dispatch, qty])

  const removeFromCartHandler = (id) => {
    console.log(id)
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {}

  const { cartItems } = useSelector((state) => state.cart)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        px: 2, // Added horizontal padding for better spacing
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box>
          <Typography variant="body1">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 1200 }}>
          <Grid container spacing={3}>
            {/* Cart items list */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 2,
                    backgroundColor: 'white',
                    overflowX: 'auto', // Added to handle overflow for smaller screens
                  }}
                >
                  <List>
                    {cartItems.map((item) => (
                      <ListItem
                        key={item.product}
                        alignItems="flex-start"
                        divider
                        sx={{ py: 1 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                            sx={{ width: 60, height: 60 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Link
                              to={`/product/${item.product}`}
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
                              }}
                            >
                              <Typography variant="body1" noWrap>
                                {item.name}
                              </Typography>
                            </Link>
                          }
                          secondary={`$ ${item.price}`}
                          sx={{ ml: 2 }}
                        />
                        <FormControl
                          variant="outlined"
                          sx={{
                            mx: 1,
                            minWidth: 80,
                            maxWidth: '100%', // Ensure it adapts to available space
                            '& .MuiSelect-select': {
                              py: 0.5,
                              fontSize: '14px',
                            },
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '4px',
                            },
                            '& .MuiSelect-icon': {
                              color: 'black',
                            },
                            '@media (max-width:600px)': {
                              minWidth: 60,
                              '& .MuiSelect-select': {
                                fontSize: '12px',
                                py: '4px',
                              },
                              '& .MuiOutlinedInput-root': {
                                fontSize: '12px',
                              },
                            },
                          }}
                        >
                          <Select
                            value={item.qty}
                            onChange={(e) => {
                              dispatch(
                                AddToCart(item.product, Number(e.target.value)),
                                console.log(item.product),
                              )
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem
                                key={`${item.product}-${x + 1}`}
                                value={x + 1}
                              >
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <IconButton
                          onClick={() => removeFromCartHandler(item._id)}
                          sx={{ color: 'red' }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </motion.div>
            </Grid>

            {/* Cart summary */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ borderRadius: '8px', boxShadow: 2 }}>
                  <CardContent>
                    <List>
                      <ListItem>
                        <Typography variant="h6">
                          SubTotal{' '}
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                          Items
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + item.price * item.qty,
                              0,
                            )
                            .toFixed(2)}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                          Proceed To Checkout
                        </Button>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default CartScreen

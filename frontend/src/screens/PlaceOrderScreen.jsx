import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../layout/Message'
import CheckoutSteps from './CheckoutSteps'
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'

import { cart, orders } from '../utils/data.js'
const PlaceOrderScreen = () => {
  //calculate prices
  const addDecimals = (num) => {
    return +(Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  // Corrected calculation of totalPrice
  cart.totalPrice =
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

  const success = true
  const error = false
  const order = orders[0]

  const navigate = useNavigate()
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, order, success])

  const placeOrderHandler = () => {
    //create order in bd
  }
  return (
    <Box sx={{ padding: 2 }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Shipping</Typography>
              <Typography>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h5">Payment Method</Typography>
              <Typography>
                <strong>Method:</strong> {cart.paymentMethod}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h5">Order Items</Typography>
              {cart.cartItems.length === 0 ? (
                <Message variant="body1">Your cart is empty</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', borderRadius: '8px' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Typography variant="body1">{item.name}</Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body1">
                            {item.qty} * ${item.price} = $
                            {item.qty * item.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Order Summary</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Items" />
                  <Typography>${cart.itemsPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Shipping" />
                  <Typography>${cart.shippingPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Tax" />
                  <Typography>${cart.taxPrice}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography>${cart.totalPrice}</Typography>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  {error && <Message variant="error">{error}</Message>}
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                sx={{ marginTop: 2 }}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PlaceOrderScreen

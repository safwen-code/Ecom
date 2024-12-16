import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Container,
} from '@mui/material'
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from '../actions/orderActions'
// import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
// import {
//   ORDER_PAY_RESET,
//   ORDER_DELIVER_RESET,
// } from '../constants/orderConstants'
import { orders } from '../utils/data'
const OrderScreen = () => {
  const { id } = useParams()

  //   const orderDetails = useSelector((state) => state.orderDetails)
  //   const { order, loading, error } = orderDetails

  //   const dispatch = useDispatch()
  //   const [sdkReady, setsdkReady] = useState(false)

  //   const orderPay = useSelector((state) => state.orderPay)
  //   const { loading: loadingPay, success: successPay } = orderPay

  //   const orderDeliver = useSelector((state) => state.orderDeliver)
  //   const { loading: loadingdeliver, success: successdeliver } = orderDeliver

  //   const userLogin = useSelector((state) => state.userLogin)
  //   const { userInfo } = userLogin

  //   const navigate = useNavigate()
  //   useEffect(() => {
  //     if (!userInfo) {
  //       navigate('/login')
  //     }
  //     const addPayPalScript = async () => {
  //       try {
  //         const { data: clientId } = await axios.get('/api/config/paypal')
  //         console.log('Client ID:', clientId)
  //         const script = document.createElement('script')
  //         script.type = 'text/javascript'
  //         script.src = `https://sandbox.paypal.com/sdk/js?client-id=${clientId}`
  //         script.async = true
  //         script.onload = () => {
  //           setsdkReady(true)
  //           console.log('PayPal SDK Loaded')
  //         }
  //         script.onerror = () => {
  //           console.error('PayPal SDK failed to load')
  //         }
  //         document.body.appendChild(script)
  //       } catch (error) {
  //         console.error('Error loading PayPal SDK:', error)
  //       }
  //     }
  //     if (!order || successPay || successdeliver) {
  //       dispatch({ type: ORDER_PAY_RESET })
  //       dispatch({ type: ORDER_DELIVER_RESET })

  //       dispatch(getOrderDetails(id))
  //     } else if (!order.isPaid) {
  //       if (!window.paypal) {
  //         addPayPalScript()
  //       } else {
  //         setsdkReady(true)
  //       }
  //     }
  //   }, [dispatch, id, successPay, order, successdeliver, userInfo, navigate])

  //   const successHandler = (paymentResult) => {
  //     console.log(paymentResult)
  //     dispatch(payOrder(id, paymentResult))
  //   }
  //   const deliverHandler = () => {
  //     dispatch(deliverOrder(order))
  //   }

  const loading = false
  const error = false
  const order = orders.find((order) => (order._id = id))
  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Adjust font size for different screen sizes
              textAlign: 'center',
              padding: { xs: 1, sm: 2, md: 3 },
            }}
          >
            Order {order._id}
          </Typography>
          <Grid container spacing={3}>
            {/* Left Side: Order Details */}
            <Grid item xs={12} md={8}>
              {/* Shipping Details */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Shipping
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Name:Safwen </strong> {order.user.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Email: safwendjebbi1234@gmail.com</strong>{' '}
                    <a
                      href={`mailto:${order.user.email}`}
                      style={{ color: 'inherit' }}
                    >
                      {order.user.email}
                    </a>
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Address:</strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </Typography>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="error">Not Delivered</Message>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Method:</strong> {order.paymentMethod}
                  </Typography>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="error">Not Paid</Message>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Items
                  </Typography>
                  {order.orderItems.length === 0 ? (
                    <Message variant="body1">Your order is empty</Message>
                  ) : (
                    <List>
                      {order.orderItems.map((item, index) => (
                        <ListItem key={index}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4} sm={3} md={2}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '100%', borderRadius: '8px' }}
                              />
                            </Grid>
                            <Grid item xs={8} sm={6} md={8}>
                              <Link
                                to={`/product/${item.product}`}
                                style={{ textDecoration: 'none' }}
                              >
                                <Typography variant="body1">
                                  {item.name}
                                </Typography>
                              </Link>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                              <Typography variant="body1">
                                {item.qty} x ${item.price} = $
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

            {/* Right Side: Order Summary */}
            {/* <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Summary
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Items" />
                      <Typography>${order.itemsPrice}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Shipping" />
                      <Typography>${order.shippingPrice}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Tax" />
                      <Typography>${order.taxPrice}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Total" />
                      <Typography>${order.totalPrice}</Typography>
                    </ListItem>
                    {!order.isPaid && (
                      <ListItem>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successHandler}
                          />
                        )}
                      </ListItem>
                    )}
                  </List>
                  {loadingdeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <List>
                        <ListItem>
                          <Button
                            type="button"
                            onClick={deliverHandler}
                            variant="contained"
                            color="primary"
                          >
                            Mark As Delivered
                          </Button>
                        </ListItem>
                      </List>
                    )}
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default OrderScreen

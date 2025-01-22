import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { orders } from '../utils/data'
import { useSelector, useDispatch } from 'react-redux'
import { GetUserId, UpdateUserId } from '../Actions/cltActions'
import { USER_UPDATE_PROFILE_RESET } from '../Constants/cltConstants'

const ProfileScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  //get orders
  const loadingOrders = false
  const errorOrders = false

  //get lohin user
  const cltLogin = useSelector((state) => state.cltLogin)
  const { userInfo } = cltLogin

  // get user detail
  const cltDetails = useSelector((state) => state.cltDetails)
  const { loading, error, user } = cltDetails || {}

  // get updated user
  const cltUpdate = useSelector((state) => state.cltUpdate)
  const { success } = cltUpdate

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(userInfo.id)
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(GetUserId(userInfo.id))
      } else {
        setName(user.name || userInfo.name)
        setEmail(user.email || userInfo.email)
      }
    }
  }, [userInfo, navigate, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      //update Profile
      dispatch(
        UpdateUserId({
          id: user.id,
          name: name,
          email: email,
          password: password,
        }),
      )
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Profile Update Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                User Profile
              </Typography>
              {message && <Message variant="error">{message}</Message>}
              {error && <Message variant="error">{error}</Message>}
              {/* {loading && <Loader />} */}
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
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              My Orders
            </Typography>
            {/* Add order list component here */}
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="error">{errorOrders}</Message>
            ) : (
              <TableContainer component={Paper}>
                <Table size="small" aria-label="orders table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Delivered</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <HighlightOffIcon sx={{ color: 'red' }} />
                          )}
                        </TableCell>
                        <TableCell>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <HighlightOffIcon sx={{ color: 'red' }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            to={`/order/${order._id}`}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfileScreen

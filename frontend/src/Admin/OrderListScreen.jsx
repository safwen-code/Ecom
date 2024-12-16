import React from 'react'
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
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link } from 'react-router-dom'
import { orders } from '../utils/data'

const OrderListScreen = () => {
  const loading = false
  const error = false
  const ordersList = orders

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant={isMobile ? 'h6' : 'h4'} gutterBottom>
        Orders List
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small" aria-label="orders list table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL PRICE</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user && order.user.name}</TableCell>
                  <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
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
                    <IconButton
                      component={Link}
                      to={`/order/${order._id}`}
                      color="primary"
                    >
                      Details
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default OrderListScreen

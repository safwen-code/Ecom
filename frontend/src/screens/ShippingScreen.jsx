import React, { useState } from 'react'

import { TextField, Button, Container, Typography, Grid } from '@mui/material'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { shippingAddress } from '../utils/data'

const ShippingScreen = () => {
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    //save ship
    navigate('/payment')
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <CheckoutSteps step1 step2 />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shipping
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              sx={{ mb: 2 }} // Add margin bottom for spacing
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }} // Adjust padding for better button appearance
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ShippingScreen

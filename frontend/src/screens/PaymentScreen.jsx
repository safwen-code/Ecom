import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import CheckoutSteps from './CheckoutSteps'
import { shippingAddress } from '../utils/data'

const PaymentScreen = () => {
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    //save payment
    navigate('/placeorder')
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <CheckoutSteps step1 step2 step3 />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Payment Method
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend">Select Method</FormLabel>
              <RadioGroup
                aria-label="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mt: 2 }} // Margin top for spacing
              >
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal or Credit Card"
                />
                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                />
              </RadioGroup>
            </FormControl>
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

export default PaymentScreen

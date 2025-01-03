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
import { motion } from 'framer-motion'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePayMethod } from '../Actions/cartaction'

const PaymentScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    // Save payment method logic here
    dispatch(savePayMethod(paymentMethod))
    navigate('/placeorder')
  }

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <CheckoutSteps step1 step2 step3 />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Payment Method
        </Typography>
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Select Method</FormLabel>
                  <RadioGroup
                    aria-label="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    sx={{ mt: 2 }}
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
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 3,
                  }}
                >
                  Continue
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </motion.form>
      </Container>
    </motion.div>
  )
}

export default PaymentScreen

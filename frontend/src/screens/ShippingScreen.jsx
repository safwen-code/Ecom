import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Grid } from '@mui/material'
import { motion } from 'framer-motion'
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
    // save shipping info logic here
    navigate('/payment')
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CheckoutSteps step1 step2 />
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
          Shipping
        </Typography>
        <motion.form onSubmit={submitHandler} variants={containerVariants}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
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
      </motion.div>
    </Container>
  )
}

export default ShippingScreen

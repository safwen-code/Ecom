import React from 'react'
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { label: 'Sign In', link: '/login', active: step1 },
    { label: 'Shipping', link: '/shipping', active: step2 },
    { label: 'Payment', link: '/payment', active: step3 },
    { label: 'Place Order', link: '/placeorder', active: step4 },
  ]

  return (
    <Box sx={{ width: '100%', mb: 4, mt: 4 }}>
      <Stepper alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} active={step.active} completed={step.active}>
            <StepLabel>
              {step.active ? (
                <Button component={RouterLink} to={step.link}>
                  {step.label}
                </Button>
              ) : (
                <Button disabled>{step.label}</Button>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default CheckoutSteps

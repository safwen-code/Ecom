import React, { useEffect, useState } from 'react'
import { Stack, Alert } from '@mui/material'

const Message = ({ variant, children }) => {
  const [visible, setVisible] = useState(true)
  const [timestamp, setTimestamp] = useState('')

  // Function to get the current timestamp
  const getCurrentTimestamp = () => {
    const date = new Date()
    return date.toLocaleString() // Formats the timestamp as date and time
  }

  // Set the timestamp and initiate the hide timer
  useEffect(() => {
    setTimestamp(getCurrentTimestamp())

    // Hide the message after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000) // 3000 milliseconds = 3 seconds

    // Clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer)
  }, []) // Runs only once when the component mounts

  // If not visible, return null (do not render anything)
  if (!visible) {
    return null
  }

  return (
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Alert severity={variant}>
        {children}
        <br />
        <small>{`Timestamp: ${timestamp}`}</small>
      </Alert>
    </Stack>
  )
}

Message.defaultProps = {
  variant: 'success',
}

export default Message

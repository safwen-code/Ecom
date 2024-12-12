import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email, password)
  }
  const error = ''
  const loading = false
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && <Message variant="error">{error}</Message>}
        {loading && <Loader />}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setemail(e.target.value)}
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
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              //   to={redirect ? `/register?redirect=${redirect}` : '/register'}
              variant="body2"
              style={{ cursor: 'pointer' }}
            >
              New Customer? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login

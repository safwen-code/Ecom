import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

const Register = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [message, setmessage] = useState(null)

  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      setmessage('password is not the same')
    } else {
      console.log(name, email, password)
    }
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
          Sign Up
        </Typography>
        {message && <Message variant="error">{message}</Message>}
        {error && <Message variant="error">{error}</Message>}
        {loading && <Loader />}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="name "
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm password"
          label="confirm password"
          type="confirm password"
          id="confirm password"
          autoComplete="current-confirm-password"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              variant="body2"
              style={{ cursor: 'pointer' }}
            >
              Have Account ? LogIn
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register

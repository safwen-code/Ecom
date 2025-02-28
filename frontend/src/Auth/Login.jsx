import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../Actions/cltActions'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  //redirect path if user is login or not
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const cltLogin = useSelector((state) => state.cltLogin)
  const { loading, userInfo, error } = cltLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(LoginUser(email, password))
  }

  // Framer motion variants
  const formVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 0.4 },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  }

  return (
    <Container maxWidth="sm">
      <motion.div initial="hidden" animate="visible" variants={formVariant}>
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
          <motion.div
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </motion.div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                variant="body2"
                style={{ cursor: 'pointer' }}
              >
                New Customer? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  )
}

export default Login

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
import { RegisterUser } from '../Actions/cltActions'

const Register = () => {
  const dispatch = useDispatch()

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [message, setmessage] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const cltRegister = useSelector((state) => state.cltRegister)
  const { userInfo } = cltRegister
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      setmessage('password is not the same')
    } else {
      dispatch(RegisterUser(name, email, password))
    }
  }
  const error = ''
  const loading = false

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
              Register
            </Button>
          </motion.div>
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
      </motion.div>
    </Container>
  )
}

export default Register

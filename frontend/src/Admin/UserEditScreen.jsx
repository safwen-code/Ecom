import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { GetUserId } from '../Actions/cltActions.js'
import { USER_UPDATE_PROFILE_RESET } from '../Constants/cltConstants.js'

const UserEditScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Local state for form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  // Get user details from Redux state
  const cltDetails = useSelector((state) => state.cltDetails)
  const { loading, user, error } = cltDetails

  const cltUpdate = useSelector((state) => state.cltUpdate)
  const { success: successUpdate } = cltUpdate

  useEffect(() => {
    dispatch(GetUserId(id))
  }, [dispatch, id])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isadmin)
    }
  }, [user])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submitting:', { name, email, isAdmin })
    // Update user logic here
  }

  return (
    <Container maxWidth="sm">
      <Button
        component={Link}
        to="/admin/userList"
        variant="contained"
        color="primary"
      >
        Go Back
      </Button>
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
          Edit User
        </Typography>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : user ? (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="Admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit User
            </Button>
          </>
        ) : (
          <Message variant="error">User not found</Message>
        )}
      </Box>
    </Container>
  )
}

export default UserEditScreen

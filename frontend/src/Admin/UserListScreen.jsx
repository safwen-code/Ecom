import React, { useEffect } from 'react'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  Box,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { users } from '../utils/data'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, listUsers } from '../Actions/cltActions'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const cltLogin = useSelector((state) => state.cltLogin)
  const { userInfo } = cltLogin
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && userInfo.isadmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }
  }, [userInfo, navigate, dispatch])

  const usersList = useSelector((state) => state.usersList)
  const { loading, error, users } = usersList
  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
      dispatch(listUsers())
    }
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        User List
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              sx={{ maxWidth: '100%', overflowX: 'auto' }}
            >
              <Table size="small" aria-label="user list table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>ADMIN</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </TableCell>
                      <TableCell>
                        {user.isadmin ? (
                          <CheckCircleIcon sx={{ color: 'green' }} />
                        ) : (
                          <HighlightOffIcon sx={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          component={Link}
                          to={`/admin/user/${user._id}/edit`}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteHandler(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default UserListScreen

import React from 'react'
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
import { Link } from 'react-router-dom'

const UserListScreen = () => {
  const loading = false
  const error = false
  const usersList = users

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //delete Users
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
                  {usersList.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </TableCell>
                      <TableCell>
                        {user.isAdmin ? (
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
                          onClick={() => deleteHandler(user._id)}
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

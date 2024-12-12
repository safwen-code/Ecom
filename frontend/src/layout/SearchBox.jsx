import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('serach')
  }

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: { xs: '100%', sm: '80%', md: '400px' },
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TextField
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            paddingRight: 0,
            '& fieldset': {
              border: 'none',
            },
          },
          input: {
            padding: '10px',
            fontSize: isMobile ? '14px' : '16px', // Adjust font size based on screen size
          },
        }}
        InputProps={{
          startAdornment: !isMobile && (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      {isMobile ? (
        // IconButton for Mobile Devices
        <IconButton
          type="submit"
          color="primary"
          sx={{
            padding: '8px',
            borderRadius: '0 4px 4px 0',
          }}
        >
          <SearchIcon />
        </IconButton>
      ) : (
        // Full Button for Larger Screens
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '0 4px 4px 0',
            padding: { xs: '8px 16px', md: '10px 24px' },
            fontWeight: 'bold',
            minWidth: { xs: 'auto', md: '120px' },
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            boxShadow: 'none',
            height: '100%',
            whiteSpace: 'nowrap',
            textTransform: 'none',
          }}
        >
          Search
        </Button>
      )}
    </Box>
  )
}

export default SearchBox

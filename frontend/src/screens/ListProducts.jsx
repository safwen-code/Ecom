import React from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'

import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { Link } from 'react-router-dom'
// import ProductCarousel from './ProductCarousel'
// import Metas from '../Layout/Metas'
import { products } from '../utils/data'
import Product from './Product'

const ListProducts = () => {
  const loading = false
  const error = false
  const productList = products && products
  return (
    <Box sx={{ width: '100%' }} style={{ marginTop: '5px' }}>
      {/* <Metas />
      <ProductCarousel /> */}
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Back
      </Button>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mt: 4,
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '28px', sm: '36px', md: '42px' },
          color: '#333',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            width: '80px',
            height: '4px',
            backgroundColor: '#FF4081',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        }}
      >
        Latest Products
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div style={{ margin: '20px' }}>
          {' '}
          <Grid container spacing={4} alignItems="stretch">
            {productList.map((product, index) => (
              <React.Fragment key={product._id}>
                <Product product={product} />
                {index % 4 === 3 && index !== products.length - 1 && (
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        my: 2,
                        borderColor: 'divider',
                        borderBottomWidth: 2,
                      }}
                    />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  )
}

export default ListProducts

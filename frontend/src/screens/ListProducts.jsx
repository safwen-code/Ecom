import React from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'

import Loader from '../layout/Loader'
import Message from '../layout/Message'
import ProductCarousel from '../layout/ProductCarousel'
// import Metas from '../Layout/Metas'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { diplayProducts } from '../Actions/prdActions'
const ListProducts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(diplayProducts())
  }, [dispatch])
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  console.log(typeof products)

  return (
    <Box sx={{ width: '100%' }} style={{ marginTop: '5px' }}>
      {/* <Metas />
       */}
      {/* <Button component={Link} to="/" variant="contained" color="primary">
        Go Back
      </Button> */}
      <ProductCarousel />
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
            {products.map((product, index) => (
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

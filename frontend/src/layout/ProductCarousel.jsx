import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Message from '../layout/Message'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { products } from '../utils/data'

const ProductCarousel = () => {
  const loading = false
  const error = false
  const productTopRated = products

  if (!productTopRated || productTopRated.length === 0) {
    return null
  }

  return loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="300px"
    >
      <CircularProgress />
    </Box>
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px', // Ensure minimum height
        width: '100%',
        background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)', // Modern gradient background
        py: 4, // Add some vertical padding
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' }, // Centered and responsive width
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for a premium look
          overflow: 'hidden', // Rounded corners
        }}
      >
        <Swiper
          pagination={{ dynamicBullets: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {productTopRated.map((product, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundColor: '#fff',
                  p: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)', // Slight zoom effect on hover
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: '180px', sm: '250px', md: '300px' }, // Adjust image height for responsive design
                    overflow: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', // Stronger image shadow
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontSize: { xs: '16px', sm: '18px', md: '20px' },
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    textTransform: 'uppercase', // Uppercase for a premium look
                    letterSpacing: '1px', // Slight letter spacing for readability
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontSize: { xs: '14px', sm: '16px' },
                    color: '#666',
                    textAlign: 'center',
                  }}
                >
                  {product.price} USD
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default ProductCarousel

import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
} from '@mui/material'
import { motion } from 'framer-motion'

// Styled Paper component to serve as a container for the Card
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
  },
}))

const Product = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Item>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'none',
              background: 'transparent',
            }}
          >
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 150, sm: 180 },
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                  image={product.image || '/path/to/default/image.jpg'}
                  alt={product.name}
                />
              </motion.div>
            </Link>
            <CardContent
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: (theme) => theme.spacing(2),
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                  }}
                >
                  {product.name}
                </Typography>
              </Link>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Rating
                  name={`product-rating-${product._id}`}
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    ml: { sm: 1 },
                    mt: { xs: 0.5, sm: 0 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  }}
                >
                  {product.numReviews} reviews
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Item>
      </motion.div>
    </Grid>
  )
}

export default Product

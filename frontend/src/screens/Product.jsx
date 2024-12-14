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

// Styled Paper component to serve as a container for the Card
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: theme.spacing(4),
}))

const Product = ({ product }) => {
  //   console.log(product)
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Item>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'none',
          }}
        >
          <Link
            // to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CardMedia
              component="img"
              sx={{
                height: { xs: 180, md: 200 },
                objectFit: 'cover',
                borderRadius: '8px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              image={product.image || '/path/to/default/image.jpg'}
              alt={product.name}
            />
          </Link>
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
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
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'secondary.main',
                  },
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
              }}
            >
              <Rating
                name={`product-rating-${product._id}`}
                value={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.numReviews} reviews
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 'bold' }}
            >
              ${product.price}
            </Typography>
          </CardContent>
        </Card>
      </Item>
    </Grid>
  )
}

export default Product

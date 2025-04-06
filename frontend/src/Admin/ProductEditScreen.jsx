// components/ProductEditScreen.jsx
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material'

const ProductEditScreen = ({ open, handleClose, product, handleUpdate }) => {
  const [editedProduct, setEditedProduct] = useState(product || {})
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    setEditedProduct(product)
    if (product?.image) {
      setPreview(product.image)
    }
  }, [product])

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setEditedProduct({ ...editedProduct, image: file })
    setPreview(URL.createObjectURL(file))
  }

  const submitHandler = () => {
    handleUpdate(editedProduct)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              size="small"
              value={editedProduct?.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              size="small"
              value={editedProduct?.price || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Category"
              name="category"
              fullWidth
              size="small"
              value={editedProduct?.category || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              fullWidth
              size="small"
              value={editedProduct?.description || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Product Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          {preview && (
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2" sx={{ mt: 1 }}>
                Image Preview
              </Typography>
              <Box mt={1}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: '100px', borderRadius: '5px' }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={submitHandler} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductEditScreen

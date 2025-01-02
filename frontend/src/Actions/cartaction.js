import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/cartConstants'
import { products } from '../utils/data.js'

export const AddToCart = (id, qty) => async (dispatch, getState) => {
  //get prd
  const product = products.find((prd) => prd._id === id)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      countInStock: product.countInStock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

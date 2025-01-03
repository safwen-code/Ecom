import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../Constants/cartConstants'
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

export const addShippingAdress = (data) => async (dispatch) => {
  if (data) {
    // console.log(data)
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  } else {
    throw new Error()
  }
}

export const savePayMethod = (data) => async (dispatch) => {
  if (data) {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  } else {
    throw new Error()
  }
}

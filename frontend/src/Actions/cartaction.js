import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../Constants/cartConstants'
import axios from 'axios'
export const AddToCart = (id, qty) => async (dispatch, getState) => {
  //get prd
  const { data } = await axios.get(`/api/products/${id}`)
  if (data) {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        countInStock: data.countInStock,
        qty,
      },
    })
  }
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

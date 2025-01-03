import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../Constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action,
) => {
  const { type, payload } = action

  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find((item) => item._id === payload._id)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? payload : x,
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          loading: false,
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      }
    default:
      return state
  }
}

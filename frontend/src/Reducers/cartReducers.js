import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
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

    default:
      return state
  }
}

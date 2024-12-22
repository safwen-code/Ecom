import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../Constants/prdConstants'

export const prdListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }

    default:
      return state
  }
}

export const prdDetailsReducer = (
  state = { product: { reviews: [] } },
  action,
) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: false, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_RESET,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
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

export const addProductReducer = (state = { product: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true, ...state }
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, product: payload, success: true }
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case ADD_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const EditeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: false, ...state }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: false, ...state }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

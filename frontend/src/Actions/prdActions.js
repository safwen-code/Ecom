import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../Constants/prdConstants'
import { products } from '../utils/data'

export const diplayProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST })
  try {
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: products,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: 'no data',
    })
  }
}

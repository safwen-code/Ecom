import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../Constants/prdConstants'
import { products } from '../utils/data'

//all prd
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

//prd by id
export const displayProductby = (id) => async (dispatch) => {
  console.log(id)
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const prd = products.find((el) => el._id === id)
    console.log(prd)
    if (prd) {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: prd })
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: 'no data',
    })
  }
}

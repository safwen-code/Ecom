import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../Constants/prdConstants'
import axios from 'axios'
//all prd
export const diplayProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST })
  try {
    const { data } = await axios.get('/api/products/allProducts')
    console.log(data)
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
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
  // try {
  //   dispatch({ type: PRODUCT_DETAILS_REQUEST })
  //   const prd = products.find((el) => el._id === id)

  //   if (prd) {
  //     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: prd })
  //   }
  // } catch (error) {
  //   dispatch({
  //     type: PRODUCT_DETAILS_FAIL,
  //     payload: 'no data',
  //   })
  // }
}

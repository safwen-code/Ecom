import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//addproduct
export const addproduct = (formData) => async (dispatch, getState) => {
  console.log('from prd act', formData)
  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
    })
    const {
      cltLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/products/addproduct`,
      formData,
      config,
    )
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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

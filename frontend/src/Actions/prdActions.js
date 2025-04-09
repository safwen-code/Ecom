import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  Add_REVIEW_FAIL,
  Add_REVIEW_SUCCESS,
  Add_REVIEW_REQUEST,
} from '../Constants/prdConstants'
import axios from 'axios'

//all prd
export const diplayProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
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

//edite prd
export const editproduct = (formData) => async (dispatch, getState) => {
  // console.log('from prd act', formData)
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
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
    const { data } = await axios.put(
      `/api/products/update/${formData.id}`,
      formData,
      config,
    )
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//delete prd
export const deleteproduct = (id) => async (dispatch, getState) => {
  // console.log('from prd act', id)
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    })
    const {
      cltLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/products/delete/${id}`, config)
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
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
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    console.log(data)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// add reviwe in product
//take id of prd
export const addReview = ({ id, rating, comment }) => async (
  dispatch,
  getState,
) => {
  // console.log('prd', id, rating, comment)
  try {
    const {
      cltLogin: { userInfo },
    } = getState()
    dispatch({ type: Add_REVIEW_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/products/${id}/review`,
      { rating, comment },
      config,
    )
    dispatch({ type: Add_REVIEW_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: Add_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../Constants/orderConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  console.log('order from action', order)

  //   try {
  //     dispatch({
  //       type: ORDER_CREATE_REQUEST,
  //     })
  //     const {
  //       userLogin: { userInfo },
  //     } = getState()
  //     // console.log(userInfo.token)
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `bearer ${userInfo.token}`,
  //       },
  //     }
  //     const { data } = await axios.post(`/api/orders`, order, config)
  //     dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  //   } catch (error) {
  //     dispatch({
  //       type: ORDER_CREATE_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     })
  //   }
}

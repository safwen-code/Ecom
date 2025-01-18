import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../Constants/cltConstants'
import { users } from '../utils/data'
import axios from 'axios'

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.get('/api/users/auth', {
      params: { email, password },
    })
    console.log(data)
    if (data) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      //add to storage
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error })
  }
}

export const RegisterUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const user = { name, email, password }
    if (user) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: user })
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
  }
}

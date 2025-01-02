import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../Constants/cltConstants'
import { users } from '../utils/data'

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    const user =
      users.find(
        (user) => user.email === email && user.password === password,
      ) || null
    console.log(user)
    dispatch({ type: USER_LOGIN_REQUEST })
    if (user) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user })
      //add to storage
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
    if (!user) {
      dispatch({ type: USER_LOGIN_FAIL, payload: 'No User Found' })
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
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

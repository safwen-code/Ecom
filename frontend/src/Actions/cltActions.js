import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../Constants/cltConstants'
import { users } from '../utils/data'

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const user =
      users.find(
        (user) => user.email === email && user.password === password,
      ) || null
    console.log(user)
    if (user) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user })
      //add to storage
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
  }
}

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../Constants/cltConstants'

export const loginReducer = async (state = {}, action) => {
  const { type } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: false, ...state }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
import {
  LIST_ALL_USERS_FAIL,
  LIST_ALL_USERS_REQUEST,
  LIST_ALL_USERS_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../Constants/cltConstants'

export const loginReducer = (state = {}, action) => {
  const { type } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, ...state }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const registerReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, ...state }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userIdReducer = (state = { user: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

//admin part
export const usersList = (state = { users: [] }, action) => {
  switch (action.type) {
    case LIST_ALL_USERS_REQUEST:
      return { loading: true }
    case LIST_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    case LIST_ALL_USERS_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LOGOUT,
  LIST_ALL_USERS_REQUEST,
  LIST_ALL_USERS_SUCCESS,
  LIST_ALL_USERS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../Constants/cltConstants'
import axios from 'axios'

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.get('/api/users/auth', {
      params: { email, password },
    })
    // console.log(data)
    if (data) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      //add to storage
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const RegisterUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }
    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config,
    )
    console.log(data, 'from regisetr fc')
    if (data) {
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
  }
}

//get user profile
export const GetUserId = (id) => async (dispatch, getState) => {
  try {
    const {
      cltLogin: { userInfo },
    } = getState()
    if (!userInfo || !userInfo.token) {
      console.log('no token is here')
    }
    const token = userInfo.token

    dispatch({ type: USER_DETAILS_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)
    console.log(data)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//update user profile
export const UpdateUserId = (user) => async (dispatch, getState) => {
  try {
    const {
      cltLogin: { userInfo },
    } = getState()
    if (!userInfo || !userInfo.token) {
      console.log('no token exist')
    } else {
      const token = userInfo.token
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      if (user) {
        const { data } = await axios.put(
          `/api/users/update/${user.id}`,
          user,
          config,
        )

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
      }
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logoutuser = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT,
  })
}

//liste users
export const listUsers = () => async (dispatch, getState) => {
  try {
    const {
      cltLogin: { userInfo },
    } = getState()

    if (!userInfo || !userInfo.token) {
      throw new Error('No authorization token available')
    }

    const token = userInfo.token

    dispatch({ type: LIST_ALL_USERS_REQUEST })
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(`/api/users/all`, config)
    dispatch({ type: LIST_ALL_USERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LIST_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//delete user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
    const {
      cltLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/users/delete/${id}`, config)
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data.payload,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
//update user

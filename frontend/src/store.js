import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

//import reducers
import { prdDetailsReducer, prdListReducer } from './Reducers/prdReducers'
import { loginReducer } from './Reducers/cltReducers'

//create Reducers
const reducer = combineReducers({
  //add reducers here exp
  productList: prdListReducer,
  productID: prdDetailsReducer,
  cltLogin: loginReducer,
})

//get some storage data

const userLoginfromstorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//create initialState
const initialState = {
  //add initial state here exp
  cltLogin: { userInfo: userLoginfromstorage },
}

//create middel
const middleware = [thunk]

//create Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store

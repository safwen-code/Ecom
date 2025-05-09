import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

//import reducers
import {
  prdDetailsReducer,
  prdListReducer,
  addProductReducer,
  EditeProductReducer,
  deleteProductReducer,
} from './Reducers/prdReducers'
import {
  loginReducer,
  registerReducer,
  userDeleteReducer,
  userIdReducer,
  userUpdateProfileReducer,
  usersList,
} from './Reducers/cltReducers'
import { cartReducer } from './Reducers/cartReducers'

//create Reducers
const reducer = combineReducers({
  //add reducers here exp
  productList: prdListReducer,
  productID: prdDetailsReducer,
  //product
  //client
  cltLogin: loginReducer,
  cltRegister: registerReducer,
  cltDetails: userIdReducer,
  cltUpdate: userUpdateProfileReducer,
  //client
  cart: cartReducer,
  //admin Part
  usersList,
  userdelete: userDeleteReducer,
  addProduct: addProductReducer,
  updateProduct: EditeProductReducer,
  deleteProduct: deleteProductReducer,
})

//get some storage data

const userLoginfromstorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAdressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null

//create initialState
const initialState = {
  //add initial state here exp
  cltLogin: { userInfo: userLoginfromstorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAdressFromStorage,
  },
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

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

//import reducers
import { prdDetailsReducer, prdListReducer } from './Reducers/prdReducers'

//create Reducers
const reducer = combineReducers({
  //add reducers here exp
  productList: prdListReducer,
  productID: prdDetailsReducer,
})

//create some storage data

//create initialState
const initialState = {
  //add initial state here exp
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

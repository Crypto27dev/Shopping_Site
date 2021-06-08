import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
  productCategoryReducer,
  productsubCategoryReducer,
  productSearchReducer,
  productReviewCreateReducer,
} from './reducers/productReducers'
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  productsubCategory: productsubCategoryReducer,
  productSearch: productSearchReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  productReviewCreate: productReviewCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInformation')
  ? JSON.parse(localStorage.getItem('userInformation'))
  : null
const initialState = { userLogin: { userInformation: userInfoFromStorage } }

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

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
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productImageReducer,
} from './reducers/productReducers'
import {
  orderCreateReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

import {
  userRegisterReducer,
  userLoginReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  productsubCategory: productsubCategoryReducer,
  productSearch: productSearchReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  productEdit: productEditReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  uploadImage: productImageReducer,
  updateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const userInfoFromStorage = localStorage.getItem('userInformation')
  ? JSON.parse(localStorage.getItem('userInformation'))
  : null
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInformation: userInfoFromStorage },
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

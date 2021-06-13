import {
  PRODUCT_CATEGORY_DETAILS_CLEAR,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_CLEAR,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_CLEAR,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPLOADIMAGE_FAIL,
  PRODUCT_UPLOADIMAGE_REQUEST,
  PRODUCT_UPLOADIMAGE_SUCCESS,
  PRODUCT_SEARCH_CLEAR,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SUBCATEGORY_DETAILS_CLEAR,
  PRODUCT_SUBCATEGORY_DETAILS_FAIL,
  PRODUCT_SUBCATEGORY_DETAILS_REQUEST,
  PRODUCT_SUBCATEGORY_DETAILS_SUCCESS,
  PRODUCT_EDIT_RESET,
} from '../constants/ProductConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_LIST_CLEAR:
      return {}
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}
export const productCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_DETAILS_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_CATEGORY_DETAILS_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CATEGORY_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}

export const productsubCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SUBCATEGORY_DETAILS_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_SUBCATEGORY_DETAILS_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_SUBCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_SUBCATEGORY_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_SEARCH_CLEAR:
      return {}
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { loading: true }
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_EDIT_RESET:
      return {}
    default:
      return state
  }
}
export const productImageReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPLOADIMAGE_REQUEST:
      return { loading: true }
    case PRODUCT_UPLOADIMAGE_SUCCESS:
      return { loading: false, Img: action.payload }
    case PRODUCT_UPLOADIMAGE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

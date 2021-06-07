import {
  PRODUCT_CATEGORY_DETAILS_CLEAR,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  PRODUCT_DETAILS_CLEAR,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_CLEAR,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SEARCH_CLEAR,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SUBCATEGORY_DETAILS_CLEAR,
  PRODUCT_SUBCATEGORY_DETAILS_FAIL,
  PRODUCT_SUBCATEGORY_DETAILS_REQUEST,
  PRODUCT_SUBCATEGORY_DETAILS_SUCCESS,
} from '../constants/ProductConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
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

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
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
      return { loading: true, products: [] }
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

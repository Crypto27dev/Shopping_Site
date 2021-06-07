import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import {
  PRODUCT_SEARCH_CLEAR,
  PRODUCT_DETAILS_CLEAR,
} from '../constants/ProductConstants'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails
  const productId = match.params.id

  useEffect(() => {
    dispatch({ type: PRODUCT_SEARCH_CLEAR })
    dispatch(listProductDetails(productId))
  }, [productId])

  return (
    <div className='product-screen-outermost'>
      {loading ? (
        <Loading />
      ) : (
        product && (
          <div className='product-screen'>
            <div className='product-screen-top'>
              <img src={product.image} alt={product.brandName} />
              <div className='description'>
                <h3>{product.brandName}</h3>
                <div className='underline'></div>
                {console.log(product.reviews)}
                <span className='star-section star-section1'>
                  {product.stars && (
                    <Rating className='star-edit' value={product.stars} />
                  )}
                  {product.reviews.length > 0 ? product.reviews.length : 0}{' '}
                  reviews
                </span>
                <div className='underline'></div>

                <div className='price1'>
                  <span>
                    {product.discount
                      ? 'Rs.' +
                        Math.floor(
                          `${
                            product.cost -
                            (product.discount / 100) * product.cost
                          }`
                        )
                      : `Rs. ${product.cost}`}
                  </span>
                  {product.discount && (
                    <div className='discounted-section'>
                      <p className='previous-price'>{product.cost}</p>
                      <p className='dpercent'>-{product.discount}%</p>
                    </div>
                  )}
                </div>
                <div className='underline'></div>

                <span className='product-desc'>{product.description}</span>
              </div>
              <div className='cart-option'>
                <h3>Add to Cart</h3>
                <div className='underline'></div>
                <div>
                  <div className='form-control'>
                    <span>Price</span>
                    <span>
                      {product.discount
                        ? 'Rs.' +
                          Math.floor(
                            `${
                              product.cost -
                              (product.discount / 100) * product.cost
                            }`
                          )
                        : `Rs. ${product.cost}`}
                    </span>
                  </div>
                  <div className='underline'></div>

                  <div className='form-control'>
                    <span>Status</span>
                    <span>
                      {product.quantity < 1 ? 'Out of Stock' : 'In Stock'}
                    </span>
                  </div>
                  <div className='underline'></div>

                  <div className='form-control'>
                    <span>Quantity</span>
                    <select>
                      {[...Array(product.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}{' '}
                    </select>
                  </div>
                  <div className='underline'></div>

                  <div className='form-control'>
                    <button>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='product-screen-bottom'>
              <div className='reviews'>
                <h3>Customer Reviews</h3>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <div className='reviews-inner' key={review._id}>
                      <span>{review.reviewedBy}</span>
                      <span className='star-section'>
                        <Rating value={review.stars} />
                      </span>
                      <span>{review.date}</span>
                      <span>{review.description}</span>
                      <div className='underline'></div>
                    </div>
                  ))}
              </div>
              <div className='your-review'>
                <h3>Write your review</h3>
                <select name='' id=''>
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </select>
                <textarea name='' id='' cols='4' rows='4'></textarea>{' '}
                <button>Submit</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ProductScreen

import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { PRODUCT_SEARCH_CLEAR } from '../constants/ProductConstants'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/ProductConstants'
import Message from '../components/Message'
import Rating from '../components/Rating'
const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const {
    loading: loadingLogin,
    error: errorLogin,
    userInformation,
  } = userLogin
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate
  const productId = match.params.id
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(productId, {
        stars,
        description,
      })
    )
  }
  const [qty, setQty] = useState(1)

  const [stars, setStars] = useState(0)
  const [description, setDescription] = useState('')
  useEffect(() => {
    if (successProductReview) {
      setStars(0)
      setDescription('')
    }
    dispatch({ type: PRODUCT_SEARCH_CLEAR })
    dispatch(listProductDetails(productId))

    if (product && product._id !== productId) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [productId, successProductReview, dispatch])
  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }
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
                  {product.reviews?.length > 0 ? product.reviews.length : 0}{' '}
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
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}{' '}
                    </select>
                  </div>
                  <div className='underline'></div>

                  <div className='form-control'>
                    <button
                      onClick={addToCartHandler}
                      disabled={product.quantity === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='product-screen-bottom'>
              <div className='reviews'>
                <h3>Customer Reviews</h3>
                {product.reviews ? (
                  product.reviews.map((review) => (
                    <div className='reviews-inner' key={review._id}>
                      <span>{review.reviewedBy}</span>
                      <span className='star-section'>
                        <Rating value={review.stars} />
                      </span>
                      <span>
                        {review.createdAt && review.createdAt.substring(0, 10)}
                      </span>
                      <span>{review.description}</span>
                      <div className='underline'></div>
                    </div>
                  ))
                ) : (
                  <span>Be the first to review this product</span>
                )}
              </div>
              <div className='your-review'>
                <h3>Write your review</h3>
                {userInformation ? (
                  <>
                    {loadingProductReview && <Loading />}
                    {errorProductReview && (
                      <Message message={errorProductReview} color='red' />
                    )}
                    {successProductReview && (
                      <Message message='Successfully reviewed' color='green' />
                    )}
                    <select
                      name=''
                      id=''
                      value={stars}
                      onChange={(e) => setStars(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </select>
                    <textarea
                      name=''
                      id=''
                      cols='4'
                      rows='4'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>{' '}
                    <button onClick={submitHandler}>Submit</button>
                  </>
                ) : (
                  <>
                    <span>
                      You must{' '}
                      <Link to='/login'>
                        <span style={{ color: 'green' }}>Log In</span>
                      </Link>{' '}
                      to comment
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ProductScreen

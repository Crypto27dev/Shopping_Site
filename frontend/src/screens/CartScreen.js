import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Loading from '../components/Loading'
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const removeFromCartHandler = (id) => {
    console.log('this ran')
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div className='cartScreen-outer'>
      <button
        style={{ marginBottom: '10px', background: 'rgb(97,63,153)' }}
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
      <div className='cartScreen-inner'>
        <div className='cartScreen-left'>
          <span style={{ fontSize: '20px', textTransform: 'uppercase' }}>
            Your Shopping Cart
          </span>
          <br />
          <br />
          {cartItems.length < 1 ? (
            <span>You have not added any items to cart</span>
          ) : (
            cartItems.map((item) => (
              <>
                <div className='cart-controller' key={item.product}>
                  <Link
                    to={`/category/${item.category}/${item.subCategory}/${item.product}`}
                  >
                    <img src={item.image} alt='' />
                  </Link>
                  <span>{item.name}</span>
                  <span>Rs. {item.price}</span>

                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                    name=''
                    id=''
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <i
                    onClick={() => removeFromCartHandler(item.product)}
                    className='fas fa-trash'
                  ></i>
                </div>
                <div
                  style={{ marginLeft: '10px', width: '70%' }}
                  className='underline'
                ></div>
              </>
            ))
          )}
        </div>
        <div className='cartScreen-right'>
          <span>
            SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            ITEMS
          </span>
          <span>
            Rs.{' '}
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}{' '}
          </span>
          <button
            className='checkout-btn'
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen

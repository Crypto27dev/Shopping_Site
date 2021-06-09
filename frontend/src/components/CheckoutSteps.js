import React from 'react'
import { Link } from 'react-router-dom'
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className='checkoutContainer'>
      <div className='checkout-inner'>
        {step1 ? (
          <Link to='/login' className='enabledCursor'>
            Sign In{' '}
          </Link>
        ) : (
          <Link
            to='/login'
            onClick={(event) => event.preventDefault()}
            className='disabledCursor'
          >
            Sign In
          </Link>
        )}
      </div>
      <div className='checkout-inner'>
        {step2 ? (
          <Link to='/shipping' className='enabledCursor'>
            Shipping
          </Link>
        ) : (
          <Link
            to='/shipping'
            onClick={(event) => event.preventDefault()}
            className='disabledCursor'
          >
            Shipping
          </Link>
        )}
      </div>{' '}
      <div className='checkout-inner'>
        {step3 ? (
          <Link to='/payment' className='enabledCursor'>
            Payment
          </Link>
        ) : (
          <Link
            to='/payment'
            onClick={(event) => event.preventDefault()}
            className='disabledCursor'
          >
            Payment
          </Link>
        )}
      </div>{' '}
      <div className='checkout-inner'>
        {step4 ? (
          <Link to='/placeorder' className='enabledCursor'>
            Place Order
          </Link>
        ) : (
          <Link
            to='/placeorder'
            onClick={(event) => event.preventDefault()}
            className='disabledCursor'
          >
            Place Order
          </Link>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps

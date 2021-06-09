import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('Pay On Delivery')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  if (!shippingAddress.address) {
    history.push('/shipping')
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  useEffect(() => {
    !userInfo && history.push('/')
  }, [userInfo])
  return (
    <div className='payment-outer'>
      <CheckoutSteps step1 step2 step3 />
      <div className='form-control-payment'>
        <span style={{ textAlign: 'center' }}>Select Method of Payment</span>
        <div className='pay'>
          <span>You can pay us on your order delivery for now</span>
        </div>
        <button onClick={submitHandler} className='payButton'>
          Continue
        </button>
      </div>
    </div>
  )
}

export default Payment

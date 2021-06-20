import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import axios from 'axios'
import Loading from '../components/Loading'
const OrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.13 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error, loading } = orderCreate
  const paymentInfo = {
    amt: parseInt(cart.itemsPrice),
    psc: 0,
    pdc: parseInt(cart.shippingPrice),
    txAmt: parseInt(cart.taxPrice),
    tAmt: parseInt(cart.totalPrice),
    pid: 'ee2c3ca1-696b-4cc5-a6be-2c40d929d453',
    scd: 'EPAYTEST',
    su: 'localhost:3000/merchant.com.np/page/esewa_payment_success',
    fu: 'localhost:3000/merchant.com.np/page/esewa_payment_failed',
  }
  console.log('paymentInfo', paymentInfo)
  const payNowHandler = async () => {
    console.log('hello')
    // const config = {
    //   withCredentials: false,

<<<<<<< HEAD
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    // const { data } = await axios.post(
    //   `https://cors-anywhere.herokuapp.com/https://uat.esewa.com.np/epay/main`,
    //   {
    //     paymentInfo,
    //     config,
    //   }
    // )
    // data && history.push('https://uat.esewa.com.np/epay/main')
    // console.log('the data is', data)
    // console.log('the error is', error)
=======
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'https://cors-anywhere.herokuapp.com/https://uat.esewa.com.np/epay/main',

      paymentInfo,
      config
    )
    console.log('the data is', data)
>>>>>>> new_master
  }
  useEffect(() => {
    !userInfo && history.push('/')
    dispatch({ type: ORDER_CREATE_RESET })
    success && history.push(`/myorders/${userInfo._id}`)
  }, [userInfo, success, history])
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <div className='orderscreen-outer'>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading ? (
        <Loading />
      ) : (
        <div className='orderscreen-outermost'>
          <div className='orderscreen-inner-left'>
            <div className='orderscreen-controller'>
              <span>SHIPPING ADDRESS</span>
              <span>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode} near{' '}
                {cart.shippingAddress.country}
              </span>
              <span>
                <i style={{ color: 'green' }} className='fas fa-phone'></i>{' '}
                {cart.shippingAddress.phoneNumber}
              </span>
            </div>
            <div className='underline'></div>
            <div className='orderscreen-controller'>
              <span>PAYMENT METHOD</span>
              <span className='gd'>{cart.paymentMethod}</span>
            </div>
            <div className='underline'></div>
            <div className='orderscreen-controller'>
              <span>ORDER ITEMS</span>
              <br />
              {cart.cartItems.map((item) => (
                <>
                  <div className='cart-controller' key={item.product}>
                    <img src={item.image} alt='' />

                    <span>{item.name}</span>
                    <span>
                      {item.qty}x{item.price} = Rs. {item.price * item.qty}
                    </span>
                  </div>
                  <div
                    style={{ marginLeft: '10px', width: '70%' }}
                    className='underline'
                  ></div>
                </>
              ))}
            </div>
          </div>
          <div className='orderscreen-inner-right'>
            <span className='ordersum'>ORDER SUMMARY</span>
            <div className='orderscreen-controller-right'>
              <span>Items</span>
              <span>Rs. {cart.itemsPrice}</span>
            </div>
            <div className='underline'></div>
            <div className='orderscreen-controller-right'>
              <span>Shipping</span>
              <span>Rs. {cart.shippingPrice}</span>
            </div>
            <div className='underline'></div>
            <div className='orderscreen-controller-right'>
              <span>Tax</span>
              <span>Rs. {cart.taxPrice}</span>
            </div>
            <div className='underline'></div>
            <div className='orderscreen-controller-right'>
              <span>Total</span>
              <span>Rs. {cart.totalPrice}</span>
            </div>
            <button
              className='placeorder-btn'
              disabled={cart.paymentMethod !== 'Esewa'}
              onClick={payNowHandler}
            >
              Pay Now
            </button>
            <button
              className='placeorder-btn'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderScreen

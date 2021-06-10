import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import axios from 'axios'

const OrderDetails = ({ history, match }) => {
  const [orderdetails, setOrderdetails] = useState('')
  const [loading, setLoading] = useState(false)
  console.log(match.params.id)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  useEffect(() => {
    !userInfo && history.push('/')
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const loadData = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `/api/orders/admin/order/${match.params.id}`,
        config
      )
      setOrderdetails(data)
      setLoading(false)
      console.log('order is', orderdetails)
    }
    loadData()
  }, [userInfo, history])
  return (
    <div className='orderscreen-outer'>
      {console.log('order is', orderdetails)}
      {loading ? (
        <Loading />
      ) : (
        <div className='orderscreen-outermost'>
          {orderdetails && (
            <>
              <div className='orderscreen-inner-left'>
                <div className='orderscreen-controller'>
                  <span>SHIPPING ADDRESS</span>
                  <span>
                    {orderdetails.shippingAddress.address},
                    {orderdetails.shippingAddress.city},
                    {orderdetails.shippingAddress.postalCode} near{' '}
                    {orderdetails.shippingAddress.country}
                  </span>
                  <span>
                    <i style={{ color: 'green' }} className='fas fa-phone'></i>{' '}
                    {orderdetails.shippingAddress.phoneNumber}
                  </span>
                </div>
                <div className='underline'></div>
                <div className='orderscreen-controller'>
                  <span>PAYMENT METHOD</span>
                  <span className='gd'>{orderdetails.paymentMethod}</span>
                </div>
                <div className='underline'></div>
                <div className='orderscreen-controller'>
                  <span>ORDER ITEMS</span>
                  <br />
                  {orderdetails.orderItems.map((item) => (
                    <>
                      <div
                        className='data-controller'
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                        key={item._id}
                      >
                        <img
                          style={{ width: '50px', height: '50px' }}
                          src={item.image}
                          alt=''
                        />

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
                {/* <div className='orderscreen-controller-right'>
                  <span>Items</span>
                  <span>Rs. {orderdetails.itemsPrice}</span>
                </div> */}
                <div className='underline'></div>
                <div className='orderscreen-controller-right'>
                  <span>Shipping</span>
                  <span>Rs. {orderdetails.shippingPrice}</span>
                </div>
                <div className='underline'></div>
                <div className='orderscreen-controller-right'>
                  <span>Tax</span>
                  <span>Rs. {orderdetails.taxPrice}</span>
                </div>
                <div className='underline'></div>
                <div className='orderscreen-controller-right'>
                  <span>Total</span>
                  <span>Rs. {orderdetails.totalPrice}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderDetails

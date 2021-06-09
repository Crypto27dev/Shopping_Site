import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [phoneNumber, setphoneNumber] = useState(shippingAddress.phoneNumber)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        phoneNumber,
      })
    )
    history.push('/payment')
  }
  useEffect(() => {
    !userInfo && history.push('/')
  }, [userInfo])
  return (
    <div className='shipping-outer'>
      <CheckoutSteps step1 step2 />
      <div className='form-outer'>
        <div className='form-outermost'>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Enter your district'
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter your City'
                required
              />
            </div>

            <div className='form-control'>
              <input
                type='Tole'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder='Enter your Tole Name'
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                placeholder='Enter your Contact number'
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Enter the nearest landmark'
                required
              />
            </div>

            <button type='submit'>Continue</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping

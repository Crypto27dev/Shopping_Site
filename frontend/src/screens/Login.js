import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { USER_LOGIN_CLEAR } from '../constants/userConstants'
const Login = ({ history }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInformation } = userLogin
  console.log('redirect', history)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (error) {
      dispatch({
        type: USER_LOGIN_CLEAR,
      })
    }
    if (userInformation) {
      window.history.back()
    }
  }, [history, userInformation])
  return (
    <div className='form-outer'>
      <div className='form-outermost'>
        <span>SIGN IN</span>
        {}
        {loading && <Loading />}
        {error && <Message message={error} color='red' />}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your Email'
            />
          </div>

          <div className='form-control'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your Password'
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <span>Or, login with</span>
        <button className='google-btn'>
          <img src='/Images/google1.jpg' alt='' />
          <span className="g-text"> Log In with Google</span>
        </button>

        <span>Not Registered Yet?</span>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  )
}

export default Login

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { USER_REGISTER_CLEAR } from '../constants/userConstants'
import { Link } from 'react-router-dom'
const Register = ({ location, history }) => {
  const [message, setMessage] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordagain, setPasswordagain] = useState('')
  const [username, setUsername] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(null)
    if (password !== passwordagain) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(username, email, password, 'formfillup'))
    }
  }
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInformation } = userRegister
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const redirect = location.search && location.search.split('=')[1]

  useEffect(() => {
    if (error) {
      dispatch({
        type: USER_REGISTER_CLEAR,
      })
    }
    userInformation && redirect
      ? history.push(redirect)
      : userInformation && window.history.back()
  }, [history, userInformation])

  return (
    <div className='form-outer'>
      <div className='form-outermost'>
        <span>SIGN UP</span>
        {loading && <Loading />}
        {message && <Message message={message} color='red' />}
        {error && <Message message={error} color='red' />}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your Name'
            />
          </div>
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
          <div className='form-control'>
            <input
              type='password'
              value={passwordagain}
              onChange={(e) => setPasswordagain(e.target.value)}
              placeholder='Enter your Password again'
            />
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        <span>Already Have an Account?</span>
        <Link to={`/login?redirect=${redirect}`}>Login</Link>
      </div>
    </div>
  )
}

export default Register

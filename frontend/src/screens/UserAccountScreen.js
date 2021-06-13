import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from '../constants/userConstants'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
const UserAccountScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInformation: userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const updateProfile = useSelector((state) => state.updateProfile)
  const { loading: loadingUpdate, error: errorUpdate, success } = updateProfile
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUserProfile({ name, email, password }))
  }
  useEffect(() => {
    !userInfo && history.push('/')
    success &&
      dispatch({ type: USER_DETAILS_RESET }) &&
      dispatch({ type: USER_UPDATE_PROFILE_RESET }) &&
      history.push('/')
    if (!user.name || match.params.id !== user._id) {
      dispatch(getUserDetails(match.params.id))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [userInfo, history, match.params.id, user, success])
  return (
    <div className='userScreen'>
      <span className='head'>Your Account</span>
      {success && <Message message='Updated' color='green' />}
      <form onSubmit={submitHandler}>
        <div className='user-form'>
          <span>UserID</span>
          <span>{user._id}</span>
        </div>
        <div className='user-form'>
          <span>Account Created</span>
          <span>{user.createdAt?.substring(0, 10)}</span>
        </div>
        <div className='user-form'>
          <span>Username</span>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{' '}
        </div>

        <div className='user-form'>
          <span>Email</span>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='user-form'>
          <span>Password</span>
          <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='userUpdate' type='submit'>
          Update Info
        </button>
      </form>
    </div>
  )
}

export default UserAccountScreen

import React from 'react'

const Message = ({ message, color }) => {
  return (
    <div className='message'>
      <span style={{ background: color }}>{message}</span>
    </div>
  )
}

export default Message


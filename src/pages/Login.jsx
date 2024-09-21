import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
      <h1>Login page</h1>
      <p className='text-black font-medium'>Don't have an account! please <Link to="/signup" className='text-blue-600'>Sign up</Link></p>
    </div>
  )
}

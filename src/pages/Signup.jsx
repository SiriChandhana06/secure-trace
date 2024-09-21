import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div>
      <h1>Signup page</h1>
      <p className='text-black font-medium'>Already have an account! please <Link to="/login" className='text-blue-600'>Login</Link></p>
    </div>
  )
}

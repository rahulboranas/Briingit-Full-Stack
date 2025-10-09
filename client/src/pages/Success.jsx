import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location= useLocation()
    
  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded flex flex-col justify-center items-center gap-5 mx-auto'>
      
      <p className='text-green-800 font-semibold text-lg text-center '>{Boolean(location.state.text)?location.state.text:"Payment"}      Successfully</p>
    <Link to='/' className='border border-green-900 bg-green-100 text-green-900 hover:text-white hover:bg-green-900 rounded transition-all px-4 py-1 '>Go To Home</Link>
    </div>
  )
}

export default Success

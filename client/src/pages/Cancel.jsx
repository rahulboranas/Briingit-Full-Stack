import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
   <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded flex flex-col justify-center items-center gap-5 mx-auto'>
      
      <p className='text-red-800 font-semibold text-lg text-center '>Order Cancel</p>
    <Link to='/' className='border border-red-900 bg-red-100 text-red-900 hover:text-white hover:bg-red-900 rounded transition-all px-4 py-1 '>Go To Home</Link>
    </div>
  )
}

export default Cancel

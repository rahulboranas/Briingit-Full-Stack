import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center'>
      <div className='bg-white w-full max-w-md p-4 rounded'>
        <div className='flex justify-between items-center gap-3'>
            <h1 className='font-semibold'>Permenent Delete</h1>
            <button className='text-gray-400 hover:text-gray-950' onClick={close} >
                <IoCloseOutline size={25}/>
            </button> 
        </div>
        <p className='my-4'>Are you Sure Permenent delete ?</p>
  
      <div className='w-fit ml-auto gap-3 flex items-center'>
      <button onClick={cancel} className='px-4 py-1 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white  rounded'>Cancel</button>
      <button onClick={confirm} className='px-4 py-1 text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded'>Confirm</button>
      </div>
          </div>
    </div>
  )
}

export default ConfirmBox










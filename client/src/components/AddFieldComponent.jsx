import React from 'react'
import { IoClose } from "react-icons/io5";
const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/60 z-50 flex justify-center items-center'>
        <div className='bg-white rounded w-full max-w-md p-4 m-3'>
 <div className=' flex items-center justify-between gap-3' >
      <h1 className='font-medium'>Add Field</h1>
      <button onClick={close} className='text-gray-500 hover:bg-gray-200 rounded-full p-0.5 hover:text-gray-700'>
          <IoClose size={22}/>
      </button>
    </div>
    <input className='outline-none my-3 bg-blue-50 rounded border border-yellow-400 w-full p-2'
    placeholder='enter the field name'
    value={value}
    onChange={onChange}/>
    <button onClick={submit} className='font-medium bg-yellow-300 px-4 py-2 rounded mx-auto w-fit block hover:bg-yellow-400'>
         Add Field
    </button>
  
        </div>
       
    </section>
   
  )
}

export default AddFieldComponent

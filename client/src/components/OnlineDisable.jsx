import React from 'react'
import { IoMdClose } from "react-icons/io";


const OnlineDisable = ({close}) => {
  return (
    <section>
      <div className='flex bg-blue-50  my-1 p-1 lg:px-3 m-auto shadow-md shadow-blue-600 justify-between '>
       <p className='font-semibold text-blue-700 '>Payment Notice</p> 
      
        <button className='hover:text-blue-900 rounded-full px-1 text-blue-500 hover:bg-blue-200 cursor-pointer' onClick={close}><IoMdClose size={18}/></button>
      </div>
        <p className='bg-blue-50 p-2 mt-3 rounded border border-blue-300 text-blue-700'>⚡ Online payment is coming soon! For now, please choose Cash on Delivery to complete your order. We’re working hard to bring you more payment options shortly. Thanks for supporting us! ❤️</p>
    </section>
  )
}

export default OnlineDisable

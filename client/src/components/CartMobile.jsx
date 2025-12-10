

// import React from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
// import { FaCartShopping } from "react-icons/fa6";

// import { Link } from 'react-router-dom'
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { useSelector } from 'react-redux';


// const CartMobileLink = () => {
//     const {totalPrice , totalQty} = useGlobalContext()
//     const cartItem = useSelector(state => state.cartItem.cart)
//   return (
//     <Link to={"/cart"}>
//     {
//         cartItem[0]&& (
//  <div className='p-2 sticky bottom-4'>
//  <div className='bg-green-600 hover:bg-green-700 px-2 flex  py-1 text-white lg:hidden rounded items-center justify-between gap-3 text-sm p-2'>
//         <div className='flex  items-center gap-2'>
//           <div className='p-2 text-white animate-bounce bg-green-500 rounded w-fit '>
//             <FaCartShopping size={20} />
//           </div>
      
//         <div className='text-xs'>
//           <p>{totalQty} items</p>
//           <p>{DisplayPriceInRupees(totalPrice)}</p>
//         </div>
//           </div>
//           <div className='flex  items-center gap-1'>
//           <span className='text-sm hover:text-green-50'>View Cart</span>
//         <MdKeyboardArrowRight/>
//           </div>
//       </div>
//     </div>
//         )
//     }
//     </Link>
   
     
//   )
// }

// export default CartMobileLink


import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import { FaCartShopping } from "react-icons/fa6";

import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';


const CartMobileLink = () => {
    const {totalPrice , totalQty} = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
  return (
    <Link to={"/cart"}>
    {
        cartItem[0]&& (
 <div className='p-2 sticky bottom-4'>
  <div className='bg-green-600 hover:bg-green-700 px-3 flex py-2 text-white lg:hidden rounded-xl items-center justify-between gap-3 shadow-lg transition-all duration-200'>
    <div className='flex items-center gap-3'>
      <div className='p-2 text-white bg-green-500 rounded-full w-fit flex justify-center items-center animate-bounce shadow-md'>
        <FaCartShopping size={20} />
      </div>
      <div className='text-xs flex flex-col'>
        <p className='font-medium'>{totalQty} items</p>
        <p className='font-semibold'>{DisplayPriceInRupees(totalPrice)}</p>
      </div>
    </div>
    <div className='flex items-center gap-1 text-sm font-medium'>
      <span className='hover:text-green-100 transition-colors'>View Cart</span>
      <MdKeyboardArrowRight />
    </div>
  </div>
</div>

        )
    }
    </Link>
   
     
  )
}

export default CartMobileLink


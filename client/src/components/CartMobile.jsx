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
//     <>
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
//           <Link to={"/cart"} className='flex  items-center gap-1'>
//           <span className='text-sm hover:text-green-50'>View Cart</span>
//         <MdKeyboardArrowRight/>
//           </Link>
//       </div>
//     </div>
//         )
//     }
//     </>
   
     
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
 <div className='bg-green-600 hover:bg-green-700 px-2 flex  py-1 text-white lg:hidden rounded items-center justify-between gap-3 text-sm p-2'>
        <div className='flex  items-center gap-2'>
          <div className='p-2 text-white animate-bounce bg-green-500 rounded w-fit '>
            <FaCartShopping size={20} />
          </div>
      
        <div className='text-xs'>
          <p>{totalQty} items</p>
          <p>{DisplayPriceInRupees(totalPrice)}</p>
        </div>
          </div>
          <div className='flex  items-center gap-1'>
          <span className='text-sm hover:text-green-50'>View Cart</span>
        <MdKeyboardArrowRight/>
          </div>
      </div>
    </div>
        )
    }
    </Link>
   
     
  )
}

export default CartMobileLink


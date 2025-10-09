import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe';
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/PricewithDiscount';
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast';


const DisplayCartItem = ({close}) => {
    const {notDiscountPrice,totalPrice,totalQty} = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
   const redirectToCheckoutPage = ()=>{
      if(user?._id){
          navigate("/checkout")
          if(close){
            close()
          }
          return
      }
      toast("Please Login")
   }
  return (
    <section className='bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50'>
       <div className='bg-white w-full max-w-sm min-h-screen ml-auto'>
           <div className='flex items-center p-4 shadow-md gap-3 justify-between '>
<h2 className='font-semibold'>Cart</h2>
<Link to={"/"} className='lg:hidden  p-0.5 rounded-full hover:bg-gray-200 hover:text-black  text-gray-500 '>
 <IoCloseSharp size={20}/> 
</Link>
<button onClick={close} className='hidden p-0.5 rounded-full hover:bg-gray-200 hover:text-black text-gray-500  lg:block'>
   <IoCloseSharp size={25}/>
    
</button>
           </div>
           <div className='max-h-[calc(100vh-180px)] bg-blue-50 p-2 flex flex-col gap-4 h-full lg:min-h-[82vh] min-h-[80vh] '>
            {/***display items */}
            {

                cartItem[0] ? (
<>
  <div className='flex items-center p-2 bg-blue-100 px-4 py-2 text-blue-600 rounded-full justify-between'>
                   <p>Your Total savings</p>
           <p>{DisplayPriceInRupees(notDiscountPrice - totalPrice)}</p>
            </div>
            <div className='bg-white overflow-auto scrollbar scrollbar-custom-list-b rounded-lg p-4 grid gap-3'>
                {
                    cartItem[0] && (
                        cartItem.map((item,index)=>{
                            return(
                                <div key={item+"_cart_Item"+index} className='flex w-full gap-2  '>
                                      <div className='w-16 min-w-16 min-h-16  h-16 bg-white border border-gray-300 rounded'>
                                        <img src={item?.productId?.image[0]} className='h-full w-full object-scale-down scale-98 '/>
                                      </div>
                                      <div className='w-full max-w-sm text-xs'>
                                        <p className='text-xs text-black text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                        <p className='text-slate-400'>{item?.productId?.unit}</p>
                                        <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                        {
                                            item?.productId?.discount >=1 &&  (
                                                     <p className='font-semibold line-through  text-gray-400'>{DisplayPriceInRupees(item?.productId?.price)}</p>
                                            )
                                        }
                                        
                                        </div>

                                        <div className='flex justify-center items-center '>
                                            <AddToCartButton data={item?.productId}/>
                                            </div>
                                    </div>
                            )
                        })
                    )
                }

            </div>  
            <div className='bg-white p-4'>
                <h3 className='flex font-semibold mb-1'>Bill details</h3>
                <div className='flex text-sm gap-4 justify-between'>
                    <p>Items total</p>
                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                </div>
                <div className='flex gap-4 text-sm justify-between'>
                    <p>Total qty</p>
                    <p className='flex items-center gap-2'>{totalQty} item</p>
                </div>
                  <div className='flex text-sm gap-4 justify-between'>
                    <p>Dilevery Charges</p>
                    <p className='flex items-center gap-2'>{DisplayPriceInRupees(0)}</p>
                </div>
                     <div className='flex font-semibold gap-4 mt-1 justify-between'>
                    <p>GrandTotal</p>
                    <p className='flex items-center gap-2'>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
            </div>
            </>
                ):(
                    <div className='bg-white flex flex-col justify-center items-center'> 
                        <img src={imageEmpty} className='w-full h-full object-scale-down'  alt='cart is empty '/>
                        <Link to={"/"} onClick={close} className='block font-base border  text-white bg-green-600 px-2 py-1 my-2 rounded hover:bg-green-700'>Shop Now</Link>
                        </div>
                )
            }
          
         
           </div>
           {
            cartItem[0] && (
 <button onClick={redirectToCheckoutPage} className='p-2 w-full'>
 <div className='bg-green-600  hover:bg-green-700 text-neutral-100 font-semibold p-2 py-4 rounded bottom-2 text-sm lg:text-base static flex gap-3 justify-between'>
            <div>
                {DisplayPriceInRupees(totalPrice)}
            </div>
          
            <div  className='flex items-center gap-1'>Proceed 
                <span><FaCaretRight/></span>
            </div>
          </div>
           </button>
            )
           }
          
         
       </div>
    </section>
  )
}

export default DisplayCartItem

// import React from 'react'
// import { IoCloseSharp } from "react-icons/io5";
// import { Link, useNavigate } from 'react-router-dom';
// import { useGlobalContext } from '../provider/GlobalProvider';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe';
// import { FaCaretRight } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import AddToCartButton from './AddToCartButton';
// import { pricewithDiscount } from '../utils/PricewithDiscount';
// import imageEmpty from '../assets/empty_cart.webp'
// import toast from 'react-hot-toast';


// const DisplayCartItem = ({close}) => {
//     const {notDiscountPrice,totalPrice,totalQty} = useGlobalContext()
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const user = useSelector(state => state.user)
//     const navigate = useNavigate()
//    const redirectToCheckoutPage = ()=>{
//       if(user?._id){
//           navigate("/checkout")
//           if(close){
//             close()
//           }
//           return
//       }
//       toast("Please Login")
//    }
//   return (
//     <section className='bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50'>
//        <div className='bg-white w-full max-w-sm min-h-screen ml-auto'>
//            <div className='flex items-center p-4 shadow-md gap-3 justify-between '>
// <h2 className='font-semibold'>Cart</h2>
// <Link to={"/"} className='lg:hidden  p-0.5 rounded-full hover:bg-gray-200 hover:text-black  text-gray-500 '>
//  <IoCloseSharp size={20}/> 
// </Link>
// <button onClick={close} className='hidden p-0.5 rounded-full hover:bg-gray-200 hover:text-black text-gray-500  lg:block'>
//    <IoCloseSharp size={25}/>
    
// </button>
//            </div>
//            <div className='max-h-[calc(100vh-180px)] bg-blue-50 p-2 flex flex-col gap-4 h-full lg:min-h-[82vh] min-h-[80vh] '>
//             {/***display items */}
//             {

//                 cartItem[0] ? (
// <>
//   <div className='flex items-center p-2 bg-blue-100 px-4 py-2 text-blue-600 rounded-full justify-between'>
//                    <p>Your Total savings</p>
//            <p>{DisplayPriceInRupees(notDiscountPrice - totalPrice)}</p>
//             </div>
//             <div className='bg-white overflow-auto scrollbar scrollbar-custom-list-b rounded-lg p-4 grid gap-3'>
//                 {
//                     cartItem[0] && (
//                         cartItem.map((item,index)=>{
//                             return(
//                                 <div key={item+"_cart_Item"+index} className='flex w-full gap-2  '>
//                                       <div className='w-16 min-w-16 min-h-16  h-16 bg-white border border-gray-300 rounded'>
//                                         <img src={item?.productId?.image[0]} className='h-full w-full object-scale-down scale-98 '/>
//                                       </div>
//                                       <div className='w-full max-w-sm text-xs'>
//                                         <p className='text-xs text-black text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
//                                         <p className='text-slate-400'>{item?.productId?.unit}</p>
//                                         <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
//                                         {
//                                             item?.productId?.discount >=1 &&  (
//                                                      <p className='font-semibold line-through  text-gray-400'>{DisplayPriceInRupees(item?.productId?.price)}</p>
//                                             )
//                                         }
                                        
//                                         </div>

//                                         <div className='flex justify-center items-center '>
//                                             <AddToCartButton data={item?.productId}/>
//                                             </div>
//                                     </div>
//                             )
//                         })
//                     )
//                 }

//             </div>  
//             <div className='bg-white p-4'>
//                 <h3 className='flex font-semibold mb-1'>Bill details</h3>
//                 <div className='flex text-sm gap-4 justify-between'>
//                     <p>Items total</p>
//                     <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
//                 </div>
//                 <div className='flex gap-4 text-sm justify-between'>
//                     <p>Total qty</p>
//                     <p className='flex items-center gap-2'>{totalQty} item</p>
//                 </div>
//                   <div className='flex text-sm gap-4 justify-between'>
//                     <p>Dilevery Charges</p>
//                     <p className='flex items-center gap-2'>{DisplayPriceInRupees(35)}</p>
//                 </div>
//                      <div className='flex font-semibold gap-4 mt-1 justify-between'>
//                     <p>GrandTotal</p>
//                     <p className='flex items-center gap-2'>{DisplayPriceInRupees(totalPrice+35)}</p>
//                 </div>
//             </div>
//             </>
//                 ):(
//                     <div className='bg-white flex flex-col justify-center items-center'> 
//                         <img src={imageEmpty} className='w-full h-full object-scale-down'  alt='cart is empty '/>
//                         <Link to={"/"} onClick={close} className='block font-base border  text-white bg-green-600 px-2 py-1 my-2 rounded hover:bg-green-700'>Shop Now</Link>
//                         </div>
//                 )
//             }
          
         
//            </div>
//            {
//             cartItem[0] && (
//  <div className='p-2'>
//  <div className='bg-green-600  hover:bg-green-700 text-neutral-100 font-semibold p-2 py-4 rounded bottom-2 text-sm lg:text-base static flex gap-3 justify-between'>
//             <div>
//                 {DisplayPriceInRupees(totalPrice)}
//             </div>
          
//             <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>Proceed 
//                 <span><FaCaretRight/></span>
//             </button>
//           </div>
//            </div>
//             )
//            }
          
         
//        </div>
//     </section>
//   )
// }

// export default DisplayCartItem

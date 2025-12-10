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
    <section className='bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50   backdrop-blur-sm inset-0 '>
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

// // Modern UI styling applied
// const DisplayCartItem = ({ close }) => {
//   const { notDiscountPrice, totalPrice, totalQty } = useGlobalContext();
//   const cartItem = useSelector((state) => state.cartItem.cart);
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const redirectToCheckoutPage = () => {
//     if (user?._id) {
//       navigate("/checkout");
//       close && close();
//       return;
//     }
//     toast("Please Login");
//   };

//   return (
//     <section className='bg-black/60 backdrop-blur-sm fixed inset-0 z-50'>
//       <div className='bg-white w-full max-w-sm min-h-screen ml-auto shadow-2xl rounded-l-xl flex flex-col'>

//         {/* Header */}
//         <div className='flex items-center p-4 border-b border-gray-200 justify-between sticky top-0 bg-white z-10'>
//           <h2 className='font-semibold text-lg text-gray-800'>Your Cart</h2>

//           <button
//             onClick={close}
//             className='p-1 rounded-full hover:bg-gray-200 text-gray-600 transition'
//           >
//             <IoCloseSharp size={24} />
//           </button>
//         </div>

//         {/* MAIN CONTAINER */}
//         <div className='max-h-[calc(100vh-180px)] p-3 flex flex-col gap-4 overflow-y-auto bg-gray-50'>
//           {cartItem[0] ? (
//             <>
//               {/* Savings Box */}
//               <div className='flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-xl shadow-sm justify-between'>
//                 <p className='text-sm font-medium'>Your Total Savings</p>
//                 <p className='text-sm font-semibold'>
//                   {DisplayPriceInRupees(notDiscountPrice - totalPrice)}
//                 </p>
//               </div>

//               {/* Items List */}
//               <div className='bg-white rounded-xl shadow-sm p-4 grid gap-4'>
//                 {cartItem.map((item, index) => (
//                   <div
//                     key={item + "_cart_" + index}
//                     className='flex w-full gap-3 rounded-lg p-2 hover:bg-gray-50 transition'
//                   >
//                     {/* Image */}
//                     <div className='w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden'>
//                       <img
//                         src={item?.productId?.image[0]}
//                         className='h-full w-full object-contain'
//                       />
//                     </div>

//                     {/* Product Details */}
//                     <div className='w-full text-sm'>
//                       <p className='font-medium text-gray-800 line-clamp-2'>
//                         {item?.productId?.name}
//                       </p>

//                       <p className='text-gray-400 text-xs'>{item?.productId?.unit}</p>

//                       <p className='font-semibold text-gray-800'>
//                         {DisplayPriceInRupees(
//                           pricewithDiscount(
//                             item?.productId?.price,
//                             item?.productId?.discount
//                           )
//                         )}
//                       </p>

//                       {item?.productId?.discount >= 1 && (
//                         <p className='line-through text-gray-400 text-xs'>
//                           {DisplayPriceInRupees(item?.productId?.price)}
//                         </p>
//                       )}
//                     </div>

//                     {/* Qty Button */}
//                     <div className='flex justify-center items-center'>
//                       <AddToCartButton data={item?.productId} />
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Billing Box */}
//               <div className='bg-white p-4 rounded-xl shadow-sm'>
//                 <h3 className='font-semibold mb-2 text-gray-800'>Bill Details</h3>

//                 <div className='flex text-sm justify-between mb-1'>
//                   <p>Items total</p>
//                   <p className='flex items-center gap-2'>
//                     <span className='line-through text-neutral-400'>
//                       {DisplayPriceInRupees(notDiscountPrice)}
//                     </span>
//                     <span>{DisplayPriceInRupees(totalPrice)}</span>
//                   </p>
//                 </div>

//                 <div className='flex text-sm justify-between mb-1'>
//                   <p>Total qty</p>
//                   <p>{totalQty} items</p>
//                 </div>

//                 <div className='flex text-sm justify-between mb-1'>
//                   <p>Delivery Charges</p>
//                   <p>{DisplayPriceInRupees(0)}</p>
//                 </div>

//                 <div className='flex font-semibold text-gray-800 justify-between mt-2'>
//                   <p>Grand Total</p>
//                   <p>{DisplayPriceInRupees(totalPrice)}</p>
//                 </div>
//               </div>
//             </>
//           ) : (
//             /* EMPTY CART */
//             <div className='bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center'>
//               <img
//                 src={imageEmpty}
//                 className='w-40 h-40 object-contain mb-3 opacity-80'
//                 alt='cart empty'
//               />
//               <Link
//                 to={'/'}
//                 onClick={close}
//                 className='bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition'
//               >
//                 Shop Now
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Checkout Button */}
//         {cartItem[0] && (
//           <button onClick={redirectToCheckoutPage} className='p-4 w-full'>
//             <div className='bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl flex items-center justify-between shadow-md transition'>
//               <span>{DisplayPriceInRupees(totalPrice)}</span>
//               <span className='flex items-center gap-1'>
//                 Proceed <FaCaretRight />
//               </span>
//             </div>
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default DisplayCartItem;
import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import { useGlobalContext } from '../provider/GlobalProvider'

import AddAddress from './AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import OnlineDisable from '../components/OnlineDisable'
import { IoMdClose } from "react-icons/io";
import { BsExclamationTriangle } from "react-icons/bs";

const CheckoutPage = () => {
  const { notDiscountPrice, totalPrice, totalQty ,fetchCartItem,fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemList = useSelector(state => state.cartItem.cart)
 
  const navigate = useNavigate()

  
  const handleCashOnDelivery = async()=>{
   
     try{
const response = await Axios({
  ...SummeryApi.CashOnDeliveryOrder,
  data:{
      // list_items : cartItemList,
      addressId:addressList[selectAddress]?._id,
      subTotalAmt:totalPrice,
     
  }
})
const {data : responseData} = response
if(responseData.success){
   toast.success(responseData.message)
   if(fetchCartItem){
    fetchCartItem()
   }
   if(fetchOrder){
    fetchOrder()
   }
   navigate('/success',{
   state : {
   text : "Order"}})
}
     }catch(error){
      AxiosToastError(error)
     }

  }
let handleClose=()=>{
    navigate(-1)
  }
  return (
    <section className='bg-blue-50 p-4 '>
      <div className='constainer mx-auto flex w-full gap-5 justify-between flex-col lg:flex-row p-4'>
        {/* address */}
        <div className='w-full bg-blue-50  '>
          <div className='flex justify-between mb-2 '>
                 <h3 className='text-lg font-semibold '>Choose your address</h3>
                 <button onClick={handleClose} className='bg-gray-100 rounded-full hover:bg-gray-300 hover:text-gray-950 p-1 mx-1'><IoMdClose size={18}/></button>
          </div>
      
          
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                return (
                  <label key={address+index+"_addresslist"} className={address.status ? undefined : "hidden"}
 htmlFor={("address"+index)}>
                    <div className='border flex  gap-3 rounded p-3 hover:bg-blue-50 cursor-pointer'>
                    <div>
                      <input type='radio' id={'address'+index} value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.country}-{address.pincode}</p>
                      <p>{address.mobile}</p>
                    </div>

                  </div>
                  </label>
                  
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='h-16  bg-blue-50 cursor-pointer border-2 border-gray-300 rounded border-dashed  flex justify-center items-center'>
              Add address
            </div>
          </div>

        </div>


        <div className='w-full max-w-md bg-white py-4 px-2 border-2 border-gray-200 rounded'>
          {/* summery */}
          <h3 className='text-lg font-semibold'>Summery</h3>
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
            <div className='flex w-full max-w-sm flex-col gap-2'>
                  <button onClick={handleCashOnDelivery} className='py-2 px-4  font-semibold hover:bg-green-600 text-gray-700 hover:text-white rounded border-2 border-green-500 '>Cash on Dilevery</button>
              <button
    disabled
    className="py-3 px-4 rounded-lg bg-gray-200 cursor-not-allowed text-gray-700 flex items-center justify-between"
  >
    <span>Online Payment</span>

    <span className="flex items-center gap-1 text-sm">
      <BsExclamationTriangle className="text-yellow-500" />
      Coming Soon
    </span>
  </button>
           {/* {
            onlineDisable && (
              <OnlineDisable close={()=>setOnlineDisable(false)}/>
            )
           } */}
            </div>

          </div>
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>

  )
}

export default CheckoutPage

// import React, { useState } from 'react'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
// import { useGlobalContext } from '../provider/GlobalProvider'

// import AddAddress from './AddAddress'
// import { useSelector } from 'react-redux'

// const CheckoutPage = () => {
//   const { notDiscountPrice, totalPrice, totalQty } = useGlobalContext()
//   const [openAddress, setOpenAddress] = useState(false)
//   const addressList = useSelector(state => state.addresses.addressList)
//   const [selectAddress, setSelectAddress] = useState(0)
//   console.log(addressList[selectAddress])
//   return (
//     <section className='bg-blue-50 p-4 '>
//       <div className='constainer mx-auto flex w-full gap-5 justify-between flex-col lg:flex-row p-4'>
//         {/* address */}
//         <div className='w-full bg-blue-50  '>
//           <h3 className='text-lg font-semibold '>Choose your address</h3>

//           <div className='bg-white p-2 grid gap-4'>
//             {
//               addressList.map((address, index) => {
//                 return (
//                   <div className='border  gap-3 rounded p-3'>
//                     <div>
//                       <input type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
//                     </div>
//                     <div>
//                       <p>{address.address_line}</p>
//                       <p>{address.city}</p>
//                       <p>{address.state}</p>
//                       <p>{address.country}-{address.pincode}</p>

//                       <p>{address.mobile}</p>
//                     </div>

//                   </div>
//                 )
//               })
//             }
//             <div onClick={() => setOpenAddress(true)} className='h-16  bg-blue-50 cursor-pointer border-2 border-gray-300 rounded border-dashed  flex justify-center items-center'>
//               Add address
//             </div>
//           </div>

//         </div>


//         <div className='w-full max-w-md bg-white py-4 px-2 border-2 border-gray-200 rounded'>
//           {/* summery */}
//           <h3 className='text-lg font-semibold'>Summery</h3>
//           <div className='bg-white p-4'>
//             <h3 className='flex font-semibold mb-1'>Bill details</h3>
//             <div className='flex text-sm gap-4 justify-between'>
//               <p>Items total</p>
//               <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
//             </div>
//             <div className='flex gap-4 text-sm justify-between'>
//               <p>Total qty</p>
//               <p className='flex items-center gap-2'>{totalQty} item</p>
//             </div>
//             <div className='flex text-sm gap-4 justify-between'>
//               <p>Dilevery Charges</p>
//               <p className='flex items-center gap-2'>{DisplayPriceInRupees(35)}</p>
//             </div>
//             <div className='flex font-semibold gap-4 mt-1 justify-between'>
//               <p>GrandTotal</p>
//               <p className='flex items-center gap-2'>{DisplayPriceInRupees(totalPrice + 35)}</p>
//             </div>
//             <div className='flex w-full max-w-sm flex-col gap-2'>
//               <button className='py-2 mt-2 px-4 bg-green-600 text-white hover:bg-green-700 rounded'>Online Payment</button>
//               <button className='py-2 px-4  font-semibold hover:bg-green-600 text-gray-700 hover:text-white rounded border-2 border-green-500 '>Cash on Dilevery</button>
//             </div>

//           </div>
//         </div>
//       </div>
//       {
//         openAddress && (
//           <AddAddress close={() => setOpenAddress(false)} />
//         )
//       }
//     </section>

//   )
// }

// export default CheckoutPage


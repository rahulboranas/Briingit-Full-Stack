import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from './AddAddress'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

// Premium styling applied, logic untouched
const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [OpenEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummeryApi.disableAddress,
        data: { _id: id }
      })
      if (response.data.success) {
        toast.success("Address Removed")
        fetchAddress && fetchAddress()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className='p-3'>

      {/* Header */}
      <div className='bg-white shadow-md flex justify-between items-center px-4 py-3 rounded-xl'>
        <h2 className='font-semibold text-lg text-gray-800 truncate'>Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className='border border-yellow-300 text-yellow-500 px-4 py-1 rounded-full hover:bg-yellow-400 hover:text-black transition'
        >
          Add Address
        </button>
      </div>

      {/* Address List */}
      <div className='bg-gray-50 p-4 grid gap-4 mt-3'>
        {addressList.map((address, index) => (
          <div key={index + "every_address"} className={`border flex gap-3 rounded-lg p-3 bg-white shadow hover:shadow-md transition ${!address.status && 'hidden'}`}>

            <div className='w-full text-sm text-gray-700'>
              <p>{address.address_line}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.country}-{address.pincode}</p>
              <p>{address.mobile}</p>
            </div>

            <div className='grid gap-2'>
              <button onClick={() => { setOpenEdit(true); setEditData(address) }} className='bg-green-200 p-1.5 rounded hover:text-white hover:bg-green-700 transition'><FaRegEdit size={20} /></button>
              <button onClick={() => handleDisableAddress(address)} className='bg-red-200 p-1.5 rounded hover:text-white hover:bg-red-700 transition'><MdDelete size={20} /></button>
            </div>

          </div>
        ))}

        {/* Add Address Placeholder */}
        <div onClick={() => setOpenAddress(true)} className='h-16 bg-gray-50 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-100 transition'>
          Add Address
        </div>
      </div>

      {/* Add / Edit Modals */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {OpenEdit && <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />}

    </div>
  )
}

export default Address

// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import AddAddress from './AddAddress'
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import EditAddressDetails from '../components/EditAddressDetails';
// import Axios from '../utils/Axios';
// import SummeryApi from '../common/SummeryApi';
// import toast from 'react-hot-toast';
// import AxiosToastError from '../utils/AxiosToastError';
// import { useGlobalContext } from '../provider/GlobalProvider';
// const Address = () => {
//   const addressList = useSelector(state => state.addresses.addressList)
//   const [openAddress,setOpenAddress]=useState(false)
//   const [OpenEdit,setOpenEdit]=useState(false)
//   const [editData,setEditData]=useState({})
//   const {fetchAddress} = useGlobalContext()
// const handleDisableAddress = async(id)=>{
//   try{
//        const response = await Axios({
//         ...SummeryApi.disableAddress,
//         data:{
//           _id : id
//         }
//        })
//        if(response.data.success){
//         toast.success("Address Remove")
//         if(fetchAddress){
//           fetchAddress()
//         }
//        }
//   }catch(error){
// AxiosToastError(error)
//   }
// }
//   return (
//     <div className=''>
//       <div className='bg-white shadow-md flex justify-between gap-3 items-center px-2 py-2'>
//            <h2 className='font-semibold text-ellipsis line-clamp-1 '>Address</h2>
           
//            <button onClick={()=>setOpenAddress(true)} className='border border-yellow-300 text-yellow-500 px-3 hover:bg-yellow-400 hover:text-black py-1 rounded-full'>
//                     Add Address
//            </button>
//       </div>
//            <div className='bg-blue-50 p-2 grid gap-4'>
//             {
//               addressList.map((address, index) => {
//                 return (
                 
//                     <div key={index + "every_address"} className={`border flex  gap-3 rounded p-3 bg-white hover:bg-blue-50 cursor-pointer ${!address.status && 'hidden'}`}>
                   
//                     <div className='w-full'>
//                       <p>{address.address_line}</p>
//                       <p>{address.city}</p>
//                       <p>{address.state}</p>
//                       <p>{address.country}-{address.pincode}</p>
//                       <p>{address.mobile}</p>
//                     </div>
// <div className='grid gap-10'>
  
//                   <button onClick={()=>{setOpenEdit(true) 
//                     setEditData(address)}} className='bg-green-200 p-1.5 rounded hover:text-white hover:bg-green-700'><FaRegEdit size={20}/></button>  
//                   <button onClick={()=>handleDisableAddress(address)} className='bg-red-200 p-1.5 rounded hover:text-white hover:bg-red-700'><MdDelete size={20}/></button>
                    
//                     </div>
//                   </div>
                
                  
//                 )
//               })
//             }
//             <div onClick={() => setOpenAddress(true)} className='h-16  bg-blue-50 cursor-pointer border-2 border-gray-300 rounded border-dashed  flex justify-center items-center'>
//               Add address
//             </div>
//           </div>
//           {
//             openAddress && (
//               <AddAddress close={()=>setOpenAddress(false)}/>
//             )
//           }
//           {
//             OpenEdit && (
//               <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
//             )
//           }
//     </div>
//   )
// }

// export default Address

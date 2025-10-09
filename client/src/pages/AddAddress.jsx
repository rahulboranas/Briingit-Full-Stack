import React from 'react'
import { IoIosClose } from "react-icons/io";
import { useForm} from "react-hook-form"
import AxiosToastError from '../utils/AxiosToastError';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'
import { useGlobalContext } from '../provider/GlobalProvider';
const AddAddress = ({close}) => {
      const { register, handleSubmit ,reset} = useForm()
      const { fetchAddress} = useGlobalContext()
      const onSubmit =async(data) =>{
console.log("data",data)
try{
 const response = await Axios({
      ...SummeryApi.createAddress,
      data : {
         address_line:data.addressline,
    city:data.city,
    state:data.state,
    country:data.country,
    pincode:data.pincode,
    mobile:data.mobile
      }
 })
 const {data : responseData} = response
 if(responseData.success){
  toast.success(responseData.message)
  if(close){
    close()
    reset() 
    fetchAddress()
  }
 }
}catch(error){
  AxiosToastError(error)
}

      }
  return (
<section className='bg-black/70 fixed top-0 left-0 right-0  bottom-0 p-2 z-50 '>
    <div className='bg-white p-4 w-full max-w-lg mt-8 scrollbar-custom-list-b mx-auto rounded overflow-auto max-h-[83vh]'>
        <div className='flex justify-between gap-3'>
              <h2 className='font-semibold'>Add Address</h2>
<button onClick={close} className=' rounded-full text-gray-500  hover:bg-gray-200 hover:text-black'><IoIosClose size={30}/></button>
        </div>
      <form className='mt-4 gap-2 grid ' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-1'>
            <label htmlFor='addressline'>Address Line :</label>
            <input 
            type='text'
            id='addressline'
            placeholder='Enter valid Address'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("addressline",{required : true })}
            />
        </div>
          <div className='grid gap-1'>
            <label htmlFor='city'>City :</label>
            <input 
            type='text'
            id='city'
            placeholder='Ex:Mumbai'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("city",{required : true})}
            />
        </div>
          <div className='grid gap-1'>
            <label htmlFor='state'>State :</label>
            <input 
            type='text'
            placeholder='Ex:Maharashtra'
            id='state'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("state",{required : true})}
            />
        </div>
          <div className='grid gap-1'>
            <label htmlFor='pincode'>Pincode :</label>
            <input 
            type='number'
            id='pincode'
            placeholder='6 digit Pin-Code'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("pincode",{required : true , pattern: {
        value: /^[0-9]{6}$/, 
        message: "Pincode must be 6 digits"
      } }  )}
            />
        </div>
          <div className='grid gap-1'>
            <label htmlFor='country'>Country :</label>
            <input 
            type='text'
            id='country'
            value='India'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("country",{required : true})}
            />
        </div>
          <div className='grid gap-1'>
            <label htmlFor='mobileno'>Mobile No :</label>
            <input 
            type='number'
            placeholder='Plz enter 10 digit valid num...'
            id='mobileno'
            className='bg-blue-50 p-2 border border-gray-300 rounded'
            {...register("mobile",{required : true , pattern: {
        value: /^[0-9]{10}$/, 
        message: "Mobile number must be 10 digits"
      }
 })}
            />
        </div>
      
        <button type='submit' className='bg-yellow-400 w-full mt-4 py-2 font-bold rounded text-base hover:bg-yellow-500'>Submit</button>
      </form>
    </div>
</section>
  )
}

export default AddAddress

  
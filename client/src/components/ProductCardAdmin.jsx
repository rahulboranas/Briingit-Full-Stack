import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'

import { IoCloseOutline } from "react-icons/io5";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
const ProductCardAdmin = ({data ,  fetchProductData}) => {
 
  const [editOpen,setEditOpen]=useState(false)
  const [openDelete,setOpenDelete]=useState(false)
  const handleDelete =async()=>{
try{

const response = await Axios({
  ...SummeryApi.deleteProduct ,
data :{_id:data._id}
})
const {data : responseData}=response
if(responseData.success){
  toast.success(responseData.message)
  if(fetchProductData){
    fetchProductData()
  }
  setOpenDelete(false)
}
}catch(error){
  AxiosToastError(error)
}
  }
  return (
    <div className='w-36  p-1  bg-white rounded '>
      <div>
        <img  src={data?.image[0]}
        alt={data?.name}
        className='w-full  h-40 object-scale-down'/>
        <p className='text-ellipsis line-clamp-2 pl-1 font-medium'>{data?.name}</p>
        <p className='text-slate-400 pl-1'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-2'>
          <button onClick={()=>setEditOpen(true)} className='border rounded border-green-500 text-green-600 py-1 bg-green-100 hover:bg-green-200'>Edit</button>
          <button onClick={()=>setOpenDelete(true)} className='border rounded border-red-500 text-red-600 bg-red-100 py-1 hover:bg-red-200'>Delete</button>
        </div>
        {
editOpen && (<EditProductAdmin  fetchProductData={ fetchProductData} data={data} close={()=>setEditOpen(false)}/> )
}
{
  openDelete && (
  <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-700/70 z-50 p-4 flex justify-center items-center'>
    <div className='bg-white p-4 w-full max-w-md rounded-md'>
          <div className='flex items-center justify-between gap-4'>
            <h3 className='font-semibold'>
               Permenent Delete
            </h3>
            <button onClick={()=>setOpenDelete(false)} className='p-0.5 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200'><IoCloseOutline size={25}/></button>
          </div>
          <p className='my-2'>Are you sure want to delete Permenent ?</p>
          <div className='flex justify-end gap-3 py-4 '>
            <button onClick={()=>setOpenDelete(false)} className='border px-3 py-1 rounded-md bg-red-100 border-red-500 hover:bg-red-200 text-red-500'>Cancel</button>
            <button onClick={handleDelete} className='border px-3 py-1 rounded-md bg-green-100 border-green-500 text-green-500 hover:bg-green-200'>Delete</button>
          </div>
    </div>
        
  </section>)
}
      </div>
    </div>
  )
}

export default ProductCardAdmin

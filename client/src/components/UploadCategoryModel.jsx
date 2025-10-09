import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import SummeryApi from '../common/SummeryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import AxiosToastError from '../utils/AxiosToastError';
const UploadCategoryModel = ({close,fetchData}) => {
    const [data , setData] = useState({
        name : "",
        image : ""
    })
    const [loading , setLoading]=useState(false)
    const handleOnChange =(e)=>{
      const {name , value}=e.target 
      setData((preve)=>{
        return {
          ...preve,
          [name] : value
        }
      })
    }
    const handleSubmit=async(e)=>{
    e.preventDefault()
       try{
          setLoading(true)
          const response = await Axios({
            ...SummeryApi.addCategory,
            data: data
          })
      const { data:responseData}=response
      if(responseData.success){
        toast.success(responseData.message)
        close()
        fetchData()
      }
       }catch(error){
        AxiosToastError(error)
       }
       finally{ setLoading(false)}
    }
const  handleUploadCategoryImage=async(e)=>{
  const file = e.target.files[0]
  
  if(!file){
    return
  }
  setLoading(true)
const response = await uploadImage(file)
const { data: ImageResponse } = response
setLoading(false)
setData((preve)=>{
  return { ...preve,
    image : ImageResponse.data.url
}}
)


}
  return (
<section className='fixed top-0 left-0 p-4 right-0 bottom-0 bg-neutral-800/60 flex justify-center items-center'>
    <div className='bg-white max-w-4xl rounded w-full p-4'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Category</h1>
                   <button onClick={close} className='w-fit block ml-auto text-gray-400 hover:text-gray-950 '><IoCloseOutline size={25}/></button>
        </div>
        <form className='my-3 grid gap-2 ' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='categoryName py-2'>Name</label>
            <input 
            type='text'
            id='categoryName'
            placeholder='Enter category name'
            value={data.name}
            name='name'
            onChange={handleOnChange}
            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-yellow-300 outline-none rounded'
            />
          </div>
          <div className='grid gap-1'>
            <p className='py-2'>Image</p>
            <div className='lg:flex-row flex gap-4 flex-col items-center'>
              
              <div className='border bg-blue-50 w-full h-36 rounded border-gray-300 lg:w-36 flex justify-center items-center'>
                {data.image ? (
                         <img 
                         alt='cetegory' src={data.image}
                         className='w-full h-full object-scale-down' />
                ): ( <p className='text-sm text-neutral-500'>No Image</p>) }
                
              </div>
              <label htmlFor='uploadCategoryImage'>
              <div  className={`cursor-pointer px-4 py-2 font-medium rounded ${!data.name ?" bg-gray-300 ":"border hover:bg-yellow-300 border-yellow-400"}` }>{
                    loading ? "Loading..." : "Upload Image"
                    } </div>
              <input disabled={!data.name}
              onChange={handleUploadCategoryImage}
              type='file'
              id='uploadCategoryImage'
              className='hidden'/>
              </label>
              </div>
          </div>
          <button className={`${data.name && data.image ? "bg-yellow-400 hover:bg-yellow-300" : "bg-gray-300 "} font-semibold  py-2 `}>Add Category</button>
        </form>

    </div>
</section>
  )
  
}

export default UploadCategoryModel

// import React from 'react'

// const EditSubCategory = () => {
//   return (
//     <div>
//       hi 
//     </div>
//   )
// }

// export default EditSubCategory

import React from 'react'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';

import AxiosToastError from '../utils/AxiosToastError';
const EditSubCategory = ({close , data ,fetchData}) => {
    const [subCategoryDate,setSubCategoryData]=useState({
        _id : data._id,
        name: data.name,
        image: data.image,
        category : data.category || []
    })
    const  allCategory = useSelector(state => state.product.allCategory)
    console.log("all category sub category page",allCategory)
    const handleChange =(e)=>{
        const {name , value}=e.target
        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

const handleUploadSubCategoryImage=async(e)=>{
 const file = e.target.files[0]

 if(!file){
    return
 }
const response = await uploadImage(file)
const { data: ImageResponse } = response
console.log("file data",response)
setSubCategoryData((preve)=>{
  return { ...preve,
    image: ImageResponse.data.url
}}
)
}
const handleRemoveCategorySelected=(categoryId)=>{
    const index = subCategoryDate.category.findIndex(el => el._id === categoryId)
    subCategoryDate.category.splice(index,1)
    setSubCategoryData((preve)=>{
        return{
            ...preve
        }
    })
}
const handleSubmitSubCategory = async(e)=>{
    e.preventDefault()
    try{
     const response = await Axios({
    ...SummeryApi.updateSubCategory,
        data : subCategoryDate
     })
     const {data : responseData} = response
     if(responseData.success){
        toast.success(responseData.message)
        if(close){
            close()
        }
        if(fetchData){
            fetchData()
        }
     }
    }catch(error){
AxiosToastError(error)
    }
}
  return (
   <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-800/70 z-50 flex justify-center items-center p-4'>
     <div className='w-full max-w-5xl bg-white p-4 rounded'>
        <div className='flex items-center justify-between gap-3'>
 <h1 className='font-semibold'>Edit Sub Category
 </h1>
<button className='text-neutral-400 hover:text-neutral-950' onClick={close}><IoClose size={25}/></button>
 </div>
 <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
    <div className='flex'>
        <div className='grid w-full'>
        <label htmlFor='name'>Name</label>
        <input 
        id='name'
        name='name'
        value={subCategoryDate.name}
        onChange={handleChange}
        className=' py-2 px-3 bg-blue-50   border border-blue-100 
        outline-none rounded focus-within:border-yellow-500'/>
    </div>
 
    </div>
    <div className='gap-1 grid'>
        <p>Image</p>
        <div className='flex flex-col lg:flex-row items-center gap-3'>
             <div className='border flex justify-center items-center w-full h-36 lg:w-36 rounded border-blue-100 bg-blue-50'>
            {
                !subCategoryDate.image ? (
                    <p className='text-neutral-400 '>No Image</p>
                ) : (
                      <img 
                         alt='subCategory' src={subCategoryDate.image} 
                         className='w-full h-full object-scale-down' />
                )
            }

         </div>
         <label htmlFor='uploadSubCategoryImage'>
         <div className='px-4 py-1 rounded cursor-pointer border hover:bg-amber-400 hover:text-neutral-900  border-yellow-500 text-yellow-400 '>Upload Image</div>
         <input type='file'
         id='uploadSubCategoryImage'
         className='hidden'
         onChange={handleUploadSubCategoryImage}
         />
         </label>
        </div>
    </div>
    
    <div className='grid gap-1'>
        <label>Select Category</label>
         <div className='border  rounded focus-within:border-amber-300 outline-none'>
             {/* display value */}
          <div className='flex flex-wrap gap-2 '>
              {
                subCategoryDate.category.map((cat,index)=>{
                    return(
                        
                        <p className='bg-white shadow-md m-1 text-sm px-2 py-1 flex gap-2 items-center' key={cat._id+"selectedValue"}>{cat.name}<div className='cursor-pointer text-gray-400 hover:text-gray-950' onClick={()=>handleRemoveCategorySelected(cat._id)}><IoCloseOutline size={18}/></div></p>
                    )
                })
            }
          </div>
        {/* select category */}
        <select className='w-full   p-2 bg-transparent border outline-none focus:border-amber-300 border-neutral-400'onChange={(e)=>{
            const value =e.target.value
            const categoryDetails = allCategory.find(el => el._id == value)
            setSubCategoryData((preve)=>{
                return {
                    ...preve,
                    category : [...preve.category,categoryDetails]
                }
            })
        }}>
            <option value={""} >Select categoty</option>
            {
                allCategory.map((category,index)=>{
                  return(
                    <option value={category._id} key={category._id+"subcategory"}>{category?.name}</option>
                  )
                }
            )}
        </select>
    </div>
   
       
    </div>
   <button className={`px-4 py-1 border rounded outline-none border-gray-300 font-semibold
    ${subCategoryDate?.name && subCategoryDate?.image && subCategoryDate?.category[0] ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-200"}
    `}>
    Submit
   </button>
 </form>
     </div>
 
    
   </section>
  )
}

export default EditSubCategory
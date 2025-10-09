import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })
const [imageLoading , setImageLoading]=useState(false)
const [viewImageUrl,setViewImageUrl]=useState("")
const allCategory = useSelector(state => state.product.allCategory)
const [selectCategory,setSelectCategory]=useState("")
const [selectSubCategory,setSelectSubCategory]=useState("")
const allSubCategory = useSelector(state => state.product.allSubCategory)
const [openAddField , setOpenAddField]= useState(false)
const [fieldName,setFieldName]=useState("")
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
const handleUploadImage = async (e) => {
  const file = e.target.files[0]  
  if (!file){ return}
setImageLoading(true)
  const response = await uploadImage(file)
  const { data: ImageResponse } = response
  const imageUrl = ImageResponse.data.url

  setData((preve) => {
    return {
      ...preve,
      image: [...preve.image, imageUrl]
    }
  })
  setImageLoading(false)
}
const handleDeleteImage = async(index)=>{
 data.image.splice(index,1)
 setData((preve)=>{
  return{
    ...preve
  }
 })
}
const handleRemoveCategory = async(index)=>{
  data.category.splice(index,1)
  setData((preve)=>{
    return {
      ...preve
    }
  })
}
const handleSubRemoveCategory = async(index)=>{
  data.subCategory.splice(index,1)
  setData((preve)=>{
    return {
      ...preve
    }
  })
}
const handleAddField=()=>{
    setData((preve)=>{
      return{
        ...preve,
        more_details : {
          ...preve.more_details,
          [fieldName] : ""
        }
      }
    })
    setFieldName("")
      setOpenAddField(false)

    
}
const handleSubmit=async(e)=>{
  console.log("data",data)
e.preventDefault()
try{
const response= await Axios({
  ...SummeryApi.createProduct,
  data : data
})
const {data : responseData }=response 
if(responseData.success){
   successAlert(responseData.message)
   setData({
      name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}
   })
}

}catch(error){
  AxiosToastError(error)
}

}
  return (
    <section >
      <div className='gap-3 grid'>
        <div className='p-2 bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>UploadProduct</h2>
        </div>
        <div className='grid p-3'>
          <form className='grid gap-2 ' onSubmit={handleSubmit}>
            <div className='grid gap-2 font-medium'>
              <label htmlFor='name '>Name</label>
              <input
                id='name'
                type='text'
                placeholder='Enter product name'
                name='name'
                value={data.name}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
            </div>
            <div className='grid font-medium gap-2'>
              <label htmlFor='description'>Description</label>
              <textarea
                id='discription'
                type='text'
                placeholder='Enter product description'
                name='description'
                value={data.description}
                onChange={handleChange}
                required
                multiple
                rows={3}
                className='bg-blue-50 p-2 outline-none border-gray-300
               border resize-none focus-within:border-yellow-400 rounded'
              />

            </div>
            <div>
              <p className='mb-1 font-medium'>Image</p>
              <div>
                <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center border-blue-100 '>
                  <div className='text-center flex justify-center items-center flex-col cursor-pointer text-gray-500'>
                   {
                    imageLoading ? <Loading/> : (
                      <>
                        <FaCloudUploadAlt  size={35} />
                    <p>Upload Image</p>
                      </>
                    )
                   }
                  
                  </div>
                  <input
                    type='file'
                    id='productImage'
                    className='hidden'
                    accept='image/*'
                    onChange={handleUploadImage}
                  />

                </label>
                 <div className="flex gap-2  flex-wrap">
                  {data.image.map((img, index) => {
                    console.log("image", img) 
                    return (
                      <div
                        key={img + index}
                        className="h-20 w-20 min-w-20 bg-white border mt-2 border-blue-200 relative group "
                      >
                        <img
                          src={img}
                          alt={`product-${index}`}
                          className="w-full p-0.5 h-full object-scale-down cursor-pointer  "
                          onClick={()=>setViewImageUrl(img)}
                        />
                        <div onClick={()=>handleDeleteImage(index)} className='cursor-pointer absolute bottom-0 rounded text-white p-1 bg-red-300 hover:bg-red-500 right-0 hidden group-hover:block '>
                          <MdDeleteForever/>
                          </div>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
            {/* select category */}
            <div className='grid gap-2 '>
              <label className='font-medium'>Category</label>
              <div>
                  <select className='bg-blue-50 border outline-none  border-gray-300 w-full p-2 rounded' value={selectCategory}
                  onChange={(e)=>{
                    const value = e.target.value
                    const category = allCategory.find(el => el._id === value)
                    setData((preve)=>{
                      return{
                        ...preve,
                        category : [...preve.category,category]
                      }
                    })
                    setSelectCategory("")
                  }}
                  >
                <option value={""} className='text-neutral-600'>Select 
                  Category</option>
                {
                  allCategory.map((c,index)=>{
                    return(
                      <option key={c._id} value={c._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className=' flex flex-wrap gap-3'>
                    {
             data.category.map((c,index)=>{
              
              return(
                <div key={c._id+index+"productsection"} className='text-sm rounded flex items-center gap-1 bg-blue-50 px-2 mt-2 '>
                  <p className='text-neutral-600'>{c.name}</p>
                  <div onClick={()=>{
                    handleRemoveCategory(index)
                  }} className=' text-neutral-400 hover:text-neutral-900'><IoClose size={18}/></div>
                  </div>
              )
             })
              }
              </div>
            
              </div>
              
            </div>
            {/* select subcategory */}
              <div className='grid gap-2'>
              <label className='font-medium'>SubCategory</label>
              <div>
                  <select className='bg-blue-50 border outline-none  border-gray-300 w-full p-2 rounded' value={selectSubCategory}
                  onChange={(e)=>{
                    const value = e.target.value
                    const subCategory = allSubCategory.find(el => el._id === value)
                    setData((preve)=>{
                      return{
                        ...preve,
                        subCategory : [...preve.subCategory,subCategory]
                      }
                    })
                    setSelectSubCategory("")
                  }}
                  >
                <option value={""} className='text-neutral-600'>Select Subcategory</option>
                {
                  allSubCategory.map((c,index)=>{
                    return(
                      <option key={c._id} value={c._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className=' flex flex-wrap gap-3'>
                    {
             data.subCategory.map((c,index)=>{
              
              return(
                <div key={c._id+index+"productsection"} className='text-sm rounded flex items-center gap-1 bg-blue-50 px-2 mt-2 '>
                  <p className='text-neutral-600'>{c.name}</p>
                  <div onClick={()=>{
                    handleSubRemoveCategory(index)
                  }} className=' text-neutral-400 hover:text-neutral-900'><IoClose size={18}/></div>
                  </div>
              )
             })
              }
              </div>
            
              </div>
              
            </div>
              <div className='grid gap-2 font-medium'>
              <label htmlFor='unit'>Unit</label>
              <input
                id='unit'
                type='text'
                placeholder='Enter product unit'
                name='unit'
                value={data.unit}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
            </div>
              <div className='grid gap-2 font-medium'>
              <label htmlFor='stock'>Number of Stock</label>
              <input
                id='stock'
                type='number'
                placeholder='Enter product stock'
                name='stock'
                value={data.stock}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
            </div>
              <div className='grid gap-2 font-medium'>
              <label htmlFor='stock'>Price</label>
              <input
                id='price'
                type='number'
                placeholder='Enter product price'
                name='price'
                value={data.price}
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
                <div className='grid gap-2 font-medium'>
              <label htmlFor='discount '>Product Discount</label>
              <input
                id='discount'
                type='number'
                placeholder='Enter product discount'
                name='discount'
                value={data.discount}
                onChange={handleChange}
                
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
            </div>
            </div>
            <div>
              {
                Object?.keys(data?.more_details)?.map((k,index)=>{
                  return(
                    <div key={k} className='grid gap-1'>
              <label htmlFor={k}>{k}</label>
              <input
                id={k}
                type='text'
                value={data?.more_details[k]}
                onChange={(e)=>{
                  const value = e.target.value
                  setData((preve)=>{
                    return{
                      ...preve,
                      more_details:{
                        ...preve.more_details,
                        [k] : value
                      }
                    }
                  })
                }

                }
                required
                className='bg-blue-50 p-2 outline-none border-gray-300
               border focus-within:border-yellow-400 rounded'
              />
            </div>
                  )
                })
              }
            </div>
            <div onClick={()=>setOpenAddField(true)} className='mt-1 font-medium inline-block bg-yellow-100 hover:bg-yellow-400 py-1 px-3 w-32 rounded text-center border border-yellow-500 cursor-pointer hover:text-neutral-700'>
              Add Field
            </div>
            <button className='bg-yellow-300 hover:bg-yellow-400 py-2 px-2 mt-1  rounded'>Submit</button>
          </form>
        </div>

      </div>
      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={()=>setViewImageUrl("")}/>
        )
      }
      {
        openAddField && (<AddFieldComponent value={fieldName} onChange={(e)=>setFieldName(e.target.value)} submit={handleAddField} close={()=>setOpenAddField(false)}/>)
}
    </section>
  )
}

export default UploadProduct

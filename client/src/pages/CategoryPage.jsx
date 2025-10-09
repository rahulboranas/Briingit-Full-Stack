import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummeryApi from '../common/SummeryApi'
import Axios from '../utils/Axios'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
    const [openUploadCategory , setOpenUploadCategory]= useState(false)
    const [loading,setLoading]=useState(false)
    const [categoryData , setCategoryData]=useState([])
    const [openEdit , setOpenEdit]=useState(false)
    const [editData ,setEditData]=useState({
      name :"",
      image : ""
    })
    const [openConfirmBoxDelete , setOpenConfirmBoxDelete]=useState(false)
    const [deleteCategory , setDeleteCategory]=useState({
      _id : ""
    })
    const allCategory = useSelector(state=>state.product.allCategory)
   useEffect(()=>{
    setCategoryData(allCategory)  
   },[allCategory])
   //this fetch category should be hide 
    const fetchCategory =async()=>{
      try{
setLoading(true)
const response = await Axios({
  ...SummeryApi.getCategory
})
const {data : responseData}=response
  console.log("Fetched categories:", responseData)  
if(responseData.success){
  setCategoryData(responseData.data)
}
console.log('responseData',responseData)
      }catch(error){
   console.error("Error in fetchData:", error)  
      }finally{
        setLoading(false)
      }

    }
//     useEffect(()=>{
//       fetchCategory()
//     },[])
    const handleDeleteCategory = async()=>{
      try{
       const response = await Axios({
        ...SummeryApi.deleteCategory,
        data:deleteCategory
       })
       const {data : responseData}=response
       if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
       }
      }catch(error){
          AxiosToastError(error)
      }
    }
  return (
    <section>
    <div className='p-2 bg-white shadow-md flex items-center justify-between  '>
      <h2 className='font-semibold'>Category</h2>
      <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-yellow-400 hover:bg-amber-500 px-3 py-1 rounded '>Add Category</button>
    </div>
    {
      !categoryData[0] && !loading && (
        <NoData/>
      )
    }
    <div className='p-4 pl-6 bg-blue-50  grid grid-cols-2 justify-center items-center md:grid-cols-4 lg:grid-cols-6 gap-6 '>
    {categoryData.map((category,index)=>{
      return(
        <div key={category._id} className='w-32 h-56 p-1.5 bg-gray-50 rounded shadow-md'>
           
          <img 
          alt={category.name}
          src={category.image}
          className='w-full h-35 rounded  shadow-sm bg-white object-scale-down '
          />
          <p className='text-ellipsis text-center text-sm line-clamp-2'>{category.name}</p>
          
        <div className=' items-center gap-1  flex h-9'>
             <button onClick={()=>{setOpenEdit(true) , setEditData(category)}} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded  '>
                    Edit
             </button>
             <button onClick={()=>{
              setOpenConfirmBoxDelete(true) 
              setDeleteCategory(category)
             }} className='flex-1  bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                  Delete
             </button>
          </div>
        </div>
        
      )
    })}
    </div>
    {
      loading && (<Loading/>)
    }
    {
        openUploadCategory && (
<UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>


        )
          

    }
    {
      openEdit && (
        <EditCategory data={editData} fetchData={fetchCategory} close={()=>setOpenEdit(false)}/> 
      )
    }
    {
      openConfirmBoxDelete && (< ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>)
    }
  
    </section>
  )
}

export default CategoryPage














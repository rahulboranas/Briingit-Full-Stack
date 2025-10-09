import React, { useEffect } from 'react'
import { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { FaPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const [openAddSubCategory, setAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageUrl, setImageUrl] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory,setDeleteSubCategory]=useState({_id:""})
const [openDeleteConfirmBox,setOpenConfirmBoxDelete]=useState(false)
  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSubCategory()
  }, [])
  console.log('subCategoryData', data)
  const column = [
    columnHelper.accessor('name', {
      header: "Name",
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex justify-center py-1'>
          <img
            src={row.original.image}
            alt={row.original.name}
            className='w-8 h-8 cursor-pointer'
            onClick={() => {
              setImageUrl(row.original.image)
            }}
          />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {

              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-2 inline'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex justify-evenly gap-2 items-center '>
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }
            } className=' p-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200 cursor-pointer'>
              <FaPenToSquare size={20} />
            </button>
     <button 
  onClick={() => {
    setDeleteSubCategory({_id: row.original._id})   
    setOpenConfirmBoxDelete(true)
  }} 
            className='p-2 bg-red-100 rounded-full text-red-600  hover:bg-red-200 cursor-pointer'>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })
  ]
const handleDeleteSubCategory = async()=>{
  try{
      const response = await Axios({
...SummeryApi.deleteSubCategory,
data : deleteSubCategory
      })
      const { data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenConfirmBoxDelete(false)
        setDeleteSubCategory({_id:""})
      }
  }catch(error){
AxiosToastError(error)
  }
}

  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between  '>
        <h2 className='font-semibold'>SubCategory</h2>
        <button onClick={() => { setAddSubCategory(true) }} className='text-sm border border-yellow-400 mr-2 hover:bg-amber-500 lg:px-3 px-1 py-1 rounded '>Add SubCategory</button>
      </div>
      <div className='overflow-auto w-full max-w-[90vw]'>
        <DisplayTable data={data}
          column={column}
        />
      </div>
      {
        openAddSubCategory && (
          < UploadSubCategoryModel fetchData={fetchSubCategory} close={() => { setAddSubCategory(false) }} />
        )
      }
      {
        ImageUrl && <ViewImage url={ImageUrl} close={() => { setImageUrl("") }} />
      }
      {
        openEdit && <EditSubCategory 
        data={editData}
         close={() => setOpenEdit(false)}
        fetchData={fetchSubCategory}
        />
      }
{
  openDeleteConfirmBox && (<ConfirmBox 
  cancel={()=>setOpenConfirmBoxDelete(false)}
  close={()=>setOpenConfirmBoxDelete(false)}
  confirm={handleDeleteSubCategory}
  />)
}
    </section>

  )
}

export default SubCategoryPage

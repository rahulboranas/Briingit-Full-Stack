import React from 'react'
import { useState } from 'react'
import SummeryApi from '../common/SummeryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount]=useState(1)
  const [search,setSearch]=useState("")
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProduct,
        data: {
          page: page,
          limit:12,
          search : search
        }
      })
      const { data: responseData } = response
      console.log("ProductPage", responseData)
      if (responseData.success) {
        setProductData(responseData.data)
setTotalPageCount(responseData.totalNoPage) 
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [page])
  const handleNext = ()=>{
    if(page !== totalPageCount ){
       setPage(preve => preve + 1)
    }
    
  }
   const handlePrevious = ()=>{
    if(page > 1){
       setPage(preve => preve - 1)
    }
    
  }
  const handleOnChange = (e)=>{
   const {value} = e.target 
   setSearch(value)
   setPage(1)
  }
  useEffect(()=>{
    let flag =true 
    const interval = setTimeout(()=>{
      if(flag){
        fetchProductData()
flag=false
      }

    },300);

return ()=>{
  clearTimeout(interval)
}
  },[search])
  return (
    <section >
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
       
 <h2 className='font-semibold'>Product</h2>
 <div className='h-full min-w-26 bg-blue-50 px-4 border-gray-300 border focus-within:border-amber-300 flex items-center rounded gap-3'>
<IoSearch size={25}/>
  <input 
  type='text'
  placeholder='Search Product here...'
  className='h-full  py-2.5   outline-none bg-transparent '
  value={search}
  onChange={handleOnChange}
  />
 </div>
       
       

      </div>
      {
        loading && (<Loading />)
      }
      <div className='bg-blue-50'>
        <div className='min-h-[70vh]'>
            <div className='grid p-4  lg:grid-cols-6 md:grid-cols-4  grid-cols-2 gap-4'>
          {
            productData.map((p, index) => {
              return (
                <ProductCardAdmin  fetchProductData={fetchProductData}  key={p._id || index} data={p} />
         
              )
            })
          }
        </div>
        </div>
       
        <div className='flex justify-between m-2 '>
          <button onClick={handlePrevious} className='bg-white border rounded w-25 m-3 border-amber-400 px-4 py-1 hover:bg-yellow-300'>
            Privious
          </button>
          <button className='bg-white h-9 rounded-full w-9 mt-2 shadow-lg '>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='bg-white border rounded m-3 mr-10 w-25 border-amber-400 px-4 py-1 hover:bg-yellow-300'>
            Next
          </button>
        </div>
      </div>


    </section>

  )
}

export default ProductAdmin
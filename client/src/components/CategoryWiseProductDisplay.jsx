
import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError';
import SummeryApi from '../common/SummeryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import valideURLConvert from '../utils/valideURLConvert';
import { useSelector } from 'react-redux';
const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
      const loadingCardNumber = new Array(6).fill(null)
   
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios(
                {
                    ...SummeryApi.getProductByCategory,
                    data: {
                        id: id
                    }
                }
            )
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }
           

        } catch (error) {
            AxiosToastError(error)
        } finally { setLoading(false) }
    }
    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])
    const handleScrollRight = ()=>{
        containerRef.current.scrollLeft +=200 
    }
     const handleScrollLeft = ()=>{
        containerRef.current.scrollLeft -=200
    }
  
  const handleRedirectProductListPage = () => {
    
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })
      return filterData ? true : null

    })
if (!subcategory) {
    return `/${valideURLConvert(name)}-${id}`
  }


    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    
return url
  }
  const redirectUrl = handleRedirectProductListPage()
    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold  text-gray-500'>{name}</h3>
                <Link className='text-green-600 hover:text-green-400' to={redirectUrl}>See All</Link>
            </div>
            <div className='container lg:overflow-x-hidden mx-auto p-4 flex scrollbar-custom gap-4 items-center md:gap-6 overflow-x-scroll lg:gap-10 rounded scroll-smooth' ref={containerRef}>
                {
                    loading &&
                    loadingCardNumber.map((_, index) => {
                        return (
                            <CardLoading key={"CategorywiseProductDisplay123"+index}/>
                        )
                    })
                }
                
                {
                    
                    data.map((p,index)=>{
                       
                        return (
                        <CardProduct data={p} key={p._id+"CategorywiseProductDisplay"+index}/>
                        )
                    })
                     
                }
              <div className="w-full hidden absolute left-0 right-0 px-2 lg:flex justify-between">
    <button onClick={handleScrollLeft} className="z-10 ml-1 p-2 hover:bg-gray-100 rounded-full text-black bg-white shadow-lg">
        <FaAngleLeft size={15}/>
    </button>
    <button onClick={handleScrollRight} className="z-10 mr-3 p-2 hover:bg-gray-100 rounded-full text-black bg-white shadow-lg">
        <FaAngleRight size={15}/>
    </button>
</div>

            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay

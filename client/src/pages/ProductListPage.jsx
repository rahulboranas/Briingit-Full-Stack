import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'

import CardProductList from '../components/CardProductList'
import { useSelector } from 'react-redux'
import valideURLConvert from '../utils/valideURLConvert'
import CardProduct from '../components/CardProduct'
import Divider from './Divider'

const ProductListPage = () => {
  const [data, setData] = useState([])

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCategory, setDisplaySubCategory] = useState([])
  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]
  const fetchProductData = async () => {

    try {

      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: [categoryId],
          subCategoryId: [subCategoryId],
          page: page,
          //limits can be changed and best limit : 100
          limit: 50

        }
      })
      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData(...data, ...responseData.data)
        }
        console.log("responseDa", data)

        setTotalPage(responseData.totalCount)

        // setData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : null
    }

    )
    setDisplaySubCategory(sub)
    console.log("sub", sub)
  }, [params, AllSubCategory])
  return (
    <section className='sticky mx-2 top-24 lg:top-20'>
      {/* <section className='mx-auto grid grid-cols-[90px_auto] md:grid-cols-[200px_auto] lg:grid-cols-[280px_auto]'> */}
      <div className=' mx-auto grid grid-cols-[90px_auto]  md:grid-cols-[200px_auto] lg:grid-cols-[280px_auto] '>

        {/* subcategory */}
        <div className=' min-h-[88vh]  max-h-[88vh] scrollbar   scrollbar-custom-list overflow-y-scroll bg-white py-2 '>
          {/* <div    className='sticky top-24 lg:top-20 h-[79vh] overflow-y-scroll  scrollbar scrollbar-custom-list' > */}
          {
            DisplaySubCategory.map((s, index) => {
             
              const link = `/${valideURLConvert(s.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
<Link key={s._id || index}
                  to={link}
                  className={`block w-full p-1 cursor-pointer hover:bg-green-400 lg:flex lg:items-center lg:w-full lg:h-16 mt-1 mb-1 lg:gap-4 shadow-sm 
    ${subCategoryId === s._id ? "bg-green-200" : ""}`} >
                  <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded">
                    <img
                      src={s.image}
                      alt="subCategory"
                      className="w-14 object-scale-down lg:h-14 h-full"
                    />
                  </div>
                  <p className="text-xs text-center lg:text-base lg:text-left">
                    {s.name}
                  </p>
                </Link>

              )
            })
          }
        </div>


        {/* product */}
        <div className=''>
          <div className='bg-white shadow-lg  p-2 '>
            <h3 className='font-semibold'>{subCategoryName}</h3>
             <Divider/>
          </div>
          <div className='min-h-[83vh] scrollbar   scrollbar-custom-list-b max-h-[83vh] scroll-smooth overflow-y-auto '>
            <div className='grid  lg:grid-cols-5 md:grid-cols-3 bg-white p-4 gap-3 '>
              {
                data.map((p, index) => {
                  console.log("p", p)

                  return (
                    <CardProduct data={p} key={p._id + "productSubCategory" + index} />
                  )
                })
              }
            </div>
          </div>

          {

            loading && (<Loading />)

          }
        </div>
        <div>



        </div>



      </div>
    </section>
  )
}

export default ProductListPage


import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import { Link } from 'react-router-dom'
import valideURLConvert from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PricewithDiscount'
import AxiosToastError from '../utils/AxiosToastError'
import { useState } from 'react'
import SummeryApi from '../common/SummeryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'


const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${valideURLConvert(data._id)}`
    const [loading,setLoading]=useState(false)
  
  return (
        <Link to={url} className='border p-2 lg:p-4 grid gap-1 lg:gap-3 max-w-52 min-w-38 lg:min-w-52 rounded h-70 lg:h-83  border-gray-300'>
            {/* h-83 abjust for a better layout */}
            <div className=' min-h-20 max-h-32 bg-white rounded '>
                 <  img src={data.image[0] } className='h-full w-full  object-scale-down scale-110  '/>
                 {/* scale-110 */}
            </div>
            <div className='flex gap-6 items-center'>
                  <div className='  px-1  w-fit text-xs  flex items-center text-green-600 bg-green-100 animate-pulse rounded'>
                1 Day
            </div><div className='w-fit  rounded-lg text-sm px-1'>
                {data.unit}
            </div>
            </div>
           
            <div className='font-medium  text-ellipsis line-clamp-2 '>
                {data.name}
            </div>
            <div className='w-fit gap-3 flex items-center  '>
                {
                    Boolean(data.discount)&&(
                        <span className='text-green-600 rounded bg-green-100 w-fit text-xs px-1 lg:text-sm'>{data.discount}% disc</span>
                    
                        
                    )
                }
                {
                    Boolean(data.discount)&&  <span className='line-through text-sm'>{DisplayPriceInRupees(data.price)}</span>}
            </div>
            <div className='flex items-center justify-between  gap-3'>
                <div className='text-sm lg:text-lg font-semibold lg:py-1 text-gray-700 rounded '>
                    {DisplayPriceInRupees(pricewithDiscount( data.price , data.discount))}
                 
                </div>
                <div className=''>
                    {
                        data.stock == 0 ? (
                            <p className='text-red-500 text-xs lg:text-sm'>Out of stock</p>
                        ):(
                         <AddToCartButton data={data}/>
                        
                        )
                    }

                </div>
                
            </div>
        </Link>
  )
}

export default CardProduct

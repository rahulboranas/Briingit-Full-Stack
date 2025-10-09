
import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import { Link } from 'react-router-dom'
import valideURLConvert from '../utils/valideURLConvert'

const CardProductList = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${valideURLConvert(data._id)}`
  return (
        <Link to={url} className='border bg-white p-4 lg:p-4 grid gap-1 lg:gap-3 lg:max-w-52 max-w-61  min-w-38 lg:min-w-52 rounded h-70 lg:h-83  border-gray-300'>
            {/* h-83 abjust for a better layout */}
            <div className=' min-h-20 max-h-32 bg-white rounded '>
                 <  img src={data.image[0] } className='h-full w-full  object-scale-down scale-110 '/>
                 {/* scale-110 */}
            </div>
            <div className='  px-1  w-fit text-sm  flex items-center text-green-600 bg-green-100 animate-pulse rounded'>
                1 Day
            </div>
            <div className='font-medium  text-ellipsis line-clamp-2 '>
                {data.name}
            </div>
            <div className='w-fit bg-blue-50 rounded px-1'>
                {data.unit}
            </div>
            <div className='flex items-center justify-between  gap-3'>
                <div className='text-sm lg:text-lg font-semibold py-1 text-gray-700 bg-yellow-50 rounded px-2'>
                    {DisplayPriceInRupees(data.price)}
                </div>
                <div className='bg-green-600 rounded px-3 lg:py-1 py-0.5 hover:bg-green-700 text-white'>
                    Add
                </div>
            </div>
        </Link>
  )
}

export default CardProductList

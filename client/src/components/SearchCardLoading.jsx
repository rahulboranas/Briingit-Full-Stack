import React from 'react'

const SearchCardLoading = () => {
    return (
        <div className='border lg:p-4 p-2 grid gap-3 max-w-52 rounded  animate-pulse border-gray-300'>
            <div className='min-h-20  min-w-35 max-w-60 md:w-full lg:w-full bg-blue-50 rounded'>
            </div>
            <div className='w-20 p-3 bg-blue-50 rounded'>
            </div>
            <div className='lg:w-full md:w-full min-w-35 max-w-60  p-3 bg-blue-50 rounded'>
            </div>
            <div className='w-15 p-3 bg-blue-50 rounded'>
            </div>
            <div className='flex items-center justify-between gap-3'>
                <div className='p-3 lg:w-20 md:w-20 w-15 bg-blue-50 rounded'>
                </div>
                <div className='p-3 lg:w-20 md:w-20 w-15 bg-blue-50 rounded'>
                </div>
            </div>
        </div>
       
         
    )
}

export default SearchCardLoading

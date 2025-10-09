import React, { useState, useEffect } from 'react'

import SearchCardLoading from '../components/SearchCardLoading'
import SummeryApi from '../common/SummeryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'

const SearchPage = () => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const loadingArrayCard = new Array(12).fill(null)
const [page, setPage] = useState(1)
const [totalPage, setTotalPage] = useState(1)
const params = useLocation()
const searchText = params?.search?.slice(3)

// ✅ Jab bhi searchText change hoga tab page=1 aur data reset kar do
useEffect(() => {
setPage(1)         // nayi search ke liye page 1 se start
setData([])        // purane results clear
}, [searchText])

const fetchData = async () => {
try {
setLoading(true)
const response = await Axios({
...SummeryApi.searchProduct,
data: {
search: searchText,
page: page
}
})
const { data: responseData } = response
if (responseData.success) {
if (responseData.page == 1) {
// ✅ page=1 par fresh data overwrite
setData(responseData.data)
} else {
// ✅ agar scroll se aur data aaye to append karo
setData((preve) => [...preve, ...responseData.data])
}
setTotalPage(responseData.totalPage)
console.log(responseData)
}
} catch (error) {
AxiosToastError(error)
} finally {
setLoading(false)
}
}

// ✅ Jab page ya searchText change hoga tab data fetch karo
useEffect(() => {
fetchData()
}, [page, searchText])

const handleFetchMore = () => {
if (totalPage > page) {
setPage((preve) => preve + 1)
}
}

return ( <section className='bg-white'> <div className='container mx-auto p-4'> <p className='font-semibold'>Search Results: {data.length}</p>
<InfiniteScroll
dataLength={data.length}
next={handleFetchMore}
hasMore={page < totalPage}
> <div className='lg:gap-4 gap-2 grid grid-cols-2 py-4 lg:grid-cols-6 md:grid-cols-3 lg:p-4'>
{/* ✅ actual products render */}
{data.map((p, index) => (
<CardProduct data={p} key={p?._id + "searchProduct" + index} />
))}


        {/* ✅ loading skeletons */}
        {loading && (
          loadingArrayCard.map((_, index) => (
            <SearchCardLoading key={"loadingsearchpage" + index} />
          ))
        )}
      </div>
    </InfiniteScroll>
    {
  //nod data
  !data[0] && !loading && (
    <div className=' justify-center flex flex-col w-full mx-auto  items-center'> 
      <img className='w-full  h-full max-w-sm max-h-sm' src={noDataImage}/>
    <p className='font-semibold my-2'>No Data Found </p>
    </div>
        )
}
  </div>
</section>


)
}

export default SearchPage



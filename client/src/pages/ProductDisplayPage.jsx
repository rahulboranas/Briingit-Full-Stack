import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummeryApi from '../common/SummeryApi'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
import Divider from './Divider'
import Image1 from '../assets/Best_Prices_Offers.png'
import Image2 from '../assets/Wide_Assortment.png'
import Image3 from '../assets/minute_delivery.png'
import { pricewithDiscount } from '../utils/PricewithDiscount'
import AddToCartButton from '../components/AddToCartButton'

import { IoMdClose } from "react-icons/io";

const ProductDisplayPage = () => {
  const params = useParams()

  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  
  const [Image, setImage] = useState(0)   // 👉 index rakhenge, default 0
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()
const navigate =useNavigate()

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response
      console.log("responseData", responseData.data)

      if (responseData.success) {
        setData(responseData.data)
        setImage(0)   // 👉 by default first image dikhayenge
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails(params)
  }, [])

  console.log(data)
  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrolleft = () => {
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)
  let handleClose=()=>{
    navigate(-1)
  }
  return (
    <section className='container mx-auto grid lg:grid-cols-2 bg-slate-50 p-4'>
      <div className=''>
        <div className='bg-white relative rounded min-h-56 max-h-56 h-full w-full lg:max-h-[65vh] lg:min-h-[65vh]'>
          {/* 👉 index se URL le rahe hai */}
          <img src={data.image[Image]} className='w-full h-full object-scale-down' alt='product' />
     
            <button 
    onClick={handleClose}
    className='absolute top-2 rounded-full hover:bg-gray-200 text-gray-500 bg-gray-100 hover:text-gray-800 p-1 right-1'
  >
<IoMdClose size={18}/>
  </button>
        </div>

        <div className='flex items-center justify-center gap-3 mt-3 my-2'>
          {data.image.map((img, index) => {
            return (
            
                 <div
                key={img + index + "point"}
                onClick={() => setImage(index)}  // 👉 click karne se image change
                className={`bg-gray-200 w-3 relative h-3 rounded-full cursor-pointer ${index === Image ? "bg-gray-400" : ""}`}
              ></div>
            
             
              
            )
          })}
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex scroll-smooth  scrollbar-none relative z-10 w-full overflow-x-auto cursor-pointer gap-4'>
            {data.image.map((img, index) => {
              return (
                <div key={img + index} className='w-20 min-w-20 min-h-20 cursor-pointer h-20 shadow-lg'>
                  <img alt='mini product' onClick={() => setImage(index)} src={img} className='w-full h-full object-scale-down' />

                </div>
              )
            })}
            
          </div>

          <div className=' lg:flex hidden  w-full h-full items-center -ml-3 absolute justify-between ' >
            <button onClick={handleScrolleft} className='shadow-lg relative z-10 bg-white hover:bg-gray-100 p-1 rounded-full '><FaAngleLeft size={20} /></button>
            <button onClick={handleScrollRight} className='shadow-lg relative hover:bg-gray-100 z-10 bg-white p-1 rounded-full '><FaAngleRight size={20} /></button>
          </div>
        </div>
        <div  className='my-1 hidden  lg:grid gap-1'>
            <div>
                <p className='font-semibold'>Description</p>
              <p className='text-sm'>{data.description}</p>
            </div>
             <div>
                <p className='font-semibold'>Unit</p>
              <p className='text-base'>{data.unit}</p>
            </div>
            {
              data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                return(
                   <div key={index+"more_details"}>
                <p className='font-semibold'>{element}</p>
              <p className='text-sm'>{data?.more_details[element]}</p>
            </div>
                )
              })
            }
            </div>
      </div>
      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 animate-pulse w-fit px-2 rounded-full'>1 Day</p>

        <h2 className='text-lg lg:text-3xl font-semibold '>{data.name}</h2>
        <p>{data.unit}</p>
        < Divider />
        <div>
          <p>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
               <div className='border border-green-500 w-fit py-2 rounded px-4 bg-green-100' >
            <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
          </div>
            {
            data.discount && (
                        <p className='text-base text-neutral-500 line-through lg:text-xl'>{DisplayPriceInRupees(data.price)}</p>
            )
          }
          {
            data.discount && (
              <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='lg:text-base text-sm  text-neutral-500'>Discount</span></p>
            )
          }
          </div>
         
          </div>
{
data.stock === 0 ?(<p className='text-base my-1 text-red-500'>Out of stock</p>):(
    // <button className='my-4 px-4 py-1 bg-green-500 hover:bg-green-400 rounded'>Add</button>
    <div className='my-4'>
             <AddToCartButton data={data}/>
    </div>

)
}
        
       {/***only for a mobile */}
        <div  className='my-1 lg:hidden gap-1'>
            <div>
                <p className='font-semibold'>Description</p>
              <p className='text-sm'>{data.description}</p>
            </div>
             <div>
                <p className='font-semibold'>Unit</p>
              <p className='text-base'>{data.unit}</p>
            </div>
            {
              data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                return(
                   <div key={index+"more_details"}>
                <p className='font-semibold'>{element}</p>
              <p className='text-sm'>{data?.more_details[element]}</p>
            </div>
                )
              })
            }
            </div>
        <h2 className='font-semibold '>Why shop from binkeyit?</h2>
        <div className='flex items-center my-4 gap-4 '>
          <div>
            <img src={Image3} className=' w-20 shadow-md rounded-full ' alt='no image' />
          </div>
          <div>
            <div className='font-semibold'>
              SuperFast Delivery
            </div>
            <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
          </div>
        </div>
        <div className='flex items-center my-4 gap-4 '>
          <div>
            <img src={Image1} className=' w-20 shadow-md rounded-full  ' />
          </div>
          <div>
            <div className='font-semibold'>
              Best Price & Offers
            </div>
            <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
          </div>
        </div>
        <div className='flex items-center my-4 gap-4 '>
          <div>
            <img src={Image2} className=' w-20 shadow-md rounded-full ' alt='no image' />
          </div>
          <div>
            <div className='font-semibold'>
              Wide Assortment
            </div>
            <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
          </div>
        </div>
       
      </div>

    </section>
  )
}

export default ProductDisplayPage




// commented 

// import React, { useEffect, useRef, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Axios from '../utils/Axios'
// import AxiosToastError from '../utils/AxiosToastError'
// import SummeryApi from '../common/SummeryApi'
// import { FaAngleLeft } from "react-icons/fa6";
// import { FaAngleRight } from "react-icons/fa6";
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRuppe'
// import Divider from './Divider'
// import Image1 from '../assets/Best_Prices_Offers.png'
// import Image2 from '../assets/Wide_Assortment.png'
// import Image3 from '../assets/minute_delivery.png'
// import { pricewithDiscount } from '../utils/PricewithDiscount'
// import AddToCartButton from '../components/AddToCartButton'

// const ProductDisplayPage = () => {
//   const params = useParams()

//   let productId = params?.product?.split("-")?.slice(-1)[0]
//   const [data, setData] = useState({
//     name: "",
//     image: []
//   })
  
//   const [Image, setImage] = useState(0)   // 👉 index rakhenge, default 0
//   const [loading, setLoading] = useState(false)
//   const imageContainer = useRef()


//   const fetchProductDetails = async () => {
//     try {
//       setLoading(true)
//       const response = await Axios({
//         ...SummeryApi.getProductDetails,
//         data: {
//           productId: productId
//         }
//       })

//       const { data: responseData } = response
//       console.log("responseData", responseData.data)

//       if (responseData.success) {
//         setData(responseData.data)
//         setImage(0)   // 👉 by default first image dikhayenge
//       }

//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchProductDetails(params)
//   }, [])

//   console.log(data)
//   const handleScrollRight = () => {
//     imageContainer.current.scrollLeft += 100
//   }
//   const handleScrolleft = () => {
//     imageContainer.current.scrollLeft -= 100
//   }
//   console.log("product data",data)
//   return (
//     <section className='container mx-auto grid lg:grid-cols-2 bg-slate-50 p-4'>
//       <div className=''>
//         <div className='bg-white rounded min-h-56 max-h-56 h-full w-full lg:max-h-[65vh] lg:min-h-[65vh]'>
//           {/* 👉 index se URL le rahe hai */}
//           <img src={data.image[Image]} className='w-full h-full object-scale-down' alt='product' />
//         </div>

//         <div className='flex items-center justify-center gap-3 mt-3 my-2'>
//           {data.image.map((img, index) => {
//             return (
//               <div
//                 key={img + index + "point"}
//                 onClick={() => setImage(index)}  // 👉 click karne se image change
//                 className={`bg-gray-200 w-3 h-3 rounded-full cursor-pointer ${index === Image ? "bg-gray-400" : ""}`}
//               ></div>
              
//             )
//           })}
//         </div>
//         <div className='grid relative'>
//           <div ref={imageContainer} className='flex scroll-smooth  scrollbar-none relative z-10 w-full overflow-x-auto cursor-pointer gap-4'>
//             {data.image.map((img, index) => {
//               return (
//                 <div key={img + index} className='w-20 min-w-20 min-h-20 cursor-pointer h-20 shadow-lg'>
//                   <img alt='mini product' onClick={() => setImage(index)} src={img} className='w-full h-full object-scale-down' />

//                 </div>
//               )
//             })}
            
//           </div>

//           <div className=' lg:flex hidden  w-full h-full items-center -ml-3 absolute justify-between ' >
//             <button onClick={handleScrolleft} className='shadow-lg relative z-10 bg-white hover:bg-gray-100 p-1 rounded-full '><FaAngleLeft size={20} /></button>
//             <button onClick={handleScrollRight} className='shadow-lg relative hover:bg-gray-100 z-10 bg-white p-1 rounded-full '><FaAngleRight size={20} /></button>
//           </div>
//         </div>
//         <div  className='my-1 hidden  lg:grid gap-1'>
//             <div>
//                 <p className='font-semibold'>Description</p>
//               <p className='text-sm'>{data.description}</p>
//             </div>
//              <div>
//                 <p className='font-semibold'>Unit</p>
//               <p className='text-base'>{data.unit}</p>
//             </div>
//             {
//               data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
//                 return(
//                    <div key={index+"more_details"}>
//                 <p className='font-semibold'>{element}</p>
//               <p className='text-sm'>{data?.more_details[element]}</p>
//             </div>
//                 )
//               })
//             }
//             </div>
//       </div>
//       <div className='p-4 lg:pl-7 text-base lg:text-lg'>
//         <p className='bg-green-300 animate-pulse w-fit px-2 rounded-full'>1 Day</p>

//         <h2 className='text-lg lg:text-3xl font-semibold '>{data.name}</h2>
//         <p>{data.unit}</p>
//         < Divider />
//         <div>
//           <p>Price</p>
//           <div className='flex items-center gap-2 lg:gap-4'>
//                <div className='border border-green-500 w-fit py-2 rounded px-4 bg-green-100' >
//             <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}</p>
//           </div>
//             {
//             data.discount && (
//                         <p className='text-base text-neutral-500 line-through lg:text-xl'>{DisplayPriceInRupees(data.price)}</p>
//             )
//           }
//           {
//             data.discount && (
//               <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='lg:text-base text-sm  text-neutral-500'>Discount</span></p>
//             )
//           }
//           </div>
         
//           </div>
// {
// data.stock === 0 ?(<p className='text-base my-1 text-red-500'>Out of stock</p>):(
//     // <button className='my-4 px-4 py-1 bg-green-500 hover:bg-green-400 rounded'>Add</button>
//     <div className='my-4'>
//              <AddToCartButton data={data}/>
//     </div>

// )
// }
        
//        {/***only for a mobile */}
//         <div  className='my-1 lg:hidden gap-1'>
//             <div>
//                 <p className='font-semibold'>Description</p>
//               <p className='text-sm'>{data.description}</p>
//             </div>
//              <div>
//                 <p className='font-semibold'>Unit</p>
//               <p className='text-base'>{data.unit}</p>
//             </div>
//             {
//               data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
//                 return(
//                    <div key={index+"more_details"}>
//                 <p className='font-semibold'>{element}</p>
//               <p className='text-sm'>{data?.more_details[element]}</p>
//             </div>
//                 )
//               })
//             }
//             </div>
//         <h2 className='font-semibold '>Why shop from binkeyit?</h2>
//         <div className='flex items-center my-4 gap-4 '>
//           <div>
//             <img src={Image3} className=' w-20 shadow-md rounded-full ' alt='no image' />
//           </div>
//           <div>
//             <div className='font-semibold'>
//               SuperFast Delivery
//             </div>
//             <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
//           </div>
//         </div>
//         <div className='flex items-center my-4 gap-4 '>
//           <div>
//             <img src={Image1} className=' w-20 shadow-md rounded-full  ' />
//           </div>
//           <div>
//             <div className='font-semibold'>
//               Best Price & Offers
//             </div>
//             <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
//           </div>
//         </div>
//         <div className='flex items-center my-4 gap-4 '>
//           <div>
//             <img src={Image2} className=' w-20 shadow-md rounded-full ' alt='no image' />
//           </div>
//           <div>
//             <div className='font-semibold'>
//               Wide Assortment
//             </div>
//             <p className='text-sm'>Get your order delivered to your  doorstep at the early</p>
//           </div>
//         </div>
       
//       </div>

//     </section>
//   )
// }

// export default ProductDisplayPage

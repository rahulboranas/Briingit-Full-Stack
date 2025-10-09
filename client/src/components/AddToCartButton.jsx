import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";


const AddToCartButton = ({data}) => {
      const {fetchCartItem,updateCartItem,deleteCartItem} = useGlobalContext()
      const [loading,setLoading]=useState(false)
      const cartItem = useSelector(state =>state.cartItem.cart)
      const [isAvailableCart,setIsAvailableCart] =useState(false)
      const [qty , setQty]=useState(0)
      const [cartItemDetails,setCartItemDetails]=useState({})
    const handleADDToCart=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        try{
           setLoading(true) 
       const response = await Axios({
        ...SummeryApi.addToCart,
        data : {
            productId:data?._id
        }
       })
       const {data:responseData}=response
       if(responseData.success){
        toast.success(responseData.message)
        if(fetchCartItem){
            fetchCartItem()
        }
       }
        }catch(error){
        AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }
    //checking this in cart or not 
    useEffect(()=>{
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingItem)
        const product= cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemDetails(product)
    },[data,cartItem])
    const increaseQty =async(e)=>{
e.preventDefault()
e.stopPropagation()
const response = await updateCartItem(cartItemDetails?._id,qty+1)
if(response.success){
    toast.success("Item added")
}

    }
    const decreaseQty=async(e)=>{
e.preventDefault()
e.stopPropagation()
if(qty === 1){
    deleteCartItem(cartItemDetails)
}else{
    const response = await updateCartItem(cartItemDetails?._id,qty-1)
if(response.success){
    toast.success("Item removed")
}
}

    }
  return (
    <div className='w-full max-w-[150px]'>
        {
            isAvailableCart ? (
                <div className='flex'>
                    <button  onClick={decreaseQty} className= ' flex justify-center items-center text-sm lg:p-1 p-0.5 lg:text-lg flex-1 w-full bg-green-600 rounded px-1 hover:bg-green-700 text-white'><FaMinus /></button>
                    <p className='flex px-0.5 justify-center items-center text-sm lg:text-lg font-semibold flex-1 w-full'>{qty}</p>
                    <button onClick={increaseQty} className='flex justify-center items-center lg:p-1 text-sm lg:text-lg p-0.5 flex-1 w-full bg-green-600 rounded px-1 hover:bg-green-700 text-white'><FaPlus/></button>
                </div>
            ):(
                 <button onClick={handleADDToCart} className=' bg-green-600 rounded px-3 lg:py-1 py-0.5 hover:bg-green-700 text-white'>
                 {loading ? <Loading/>: "Add"}   
                </button>
            )
        }
          
    </div>
  )
}

export default AddToCartButton

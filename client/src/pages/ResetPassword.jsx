import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
    const location = useLocation()
    const navigate= useNavigate()
    const [data ,setData]=useState({
        email:"",
        newPassword : "",
        confirmPassword : ""

    })
  const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
      const valideValue = Object.values(data).every(el => el)

    useEffect(()=>{
        if(!(location?.state?.data?.success)){
         navigate("/")
        }
        if(location?.state?.email){
        setData((preve)=>{
                return{
                    ...preve,
                    email:location?.state?.email
                }
                
        })
        }
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }
    console.log("data reset password",data)
     const handleSubmit = async(e)=>{
   e.preventDefault()
   //optional
   if(data.newPassword !== data.confirmPassword){
    toast.error("New password and confirm password must be same")
   }
 
   try{
 const response = await Axios({
       ...SummeryApi.resetPassword,
     data : data
   })
   if(response.data.error){
    toast.error(response.data.message)
   }
   if(response.data.success){
    toast.success(response.data.message)
      navigate("/login")
      
    setData({
     email:"",
     newPassword:"",
     confirmPassword:""
    })
 
   }
  
   }catch(error){
   AxiosToastError(error)
   }
  
    }
  return (
       <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter Your Password</p>
               
                <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
                   
                    <div className='grid gap-1'>
                        <label htmlFor='newPassword'>NewPassword :

                        </label>         
                                           <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300' >
                                               <input
                                                   type={showPassword ? "text" : "password"}
                                                   placeholder='Enter your newPassword'
                                                   id='newPassword'
                                                   name="newPassword"
                                                   value={data.newPassword}
                                                   onChange={handleChange}
                                                   className=' bg-white outline-none  w-full' />
                                               {/* bg-white p-1 rounded  */}
                                               <div onClick={() => setShowPassword(preve => !preve)} className='cursor'>
                                                   {
                                                       showPassword ? (
                                                            <FaEye />
                                                       ) : (
                                                          <FaEyeSlash />
                                                       )
                                                   }
                                               </div>
                                           </div>
                                          </div>
                                              <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>ConfirmPassword :

                        </label>         
                                           <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300' >
                                               <input
                                              
                                                   type={showConfirmPassword ? "text" : "password"}
                                                   placeholder='Enter your  confirmPassword'
                                                   id='confirmPassword'
                                                   name="confirmPassword"
                                                   value={data.confirmPassword}
                                                   onChange={handleChange}
                                                   className=' bg-white outline-none  w-full' />
                                               {/* bg-white p-1 rounded  */}
                                               <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor'>
                                                   {
                                                       showConfirmPassword ? (
                                                            <FaEye />
                                                       ) : (
                                                          <FaEyeSlash />
                                                       )
                                                   }
                                               </div>
                                           </div>
                                          
                                       

                    </div>
                   <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Reset Password</button>
                </form>
                <p>Already have an account ? <Link to="/login"className='font-semibold text-green-700 hover:text-green-800'>Login</Link> </p>
            </div>
        </section>
  )
}

export default ResetPassword

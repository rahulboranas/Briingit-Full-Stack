import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';

import AxiosToastError from '../utils/AxiosToastError';
const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }
    const valideValue = Object.values(data).every(el => el)
    const handleSubmit = async(e)=>{
   e.preventDefault()
   
   if(data.password !== data.confirmPassword){
    toast.error(
        "password and confirm password must be same"
    )
    return
   }
   try{
 const response = await Axios({
       ...SummeryApi.register,
     data : data
   })
   if(response.data.error){
    toast.error(response.data.message)
   }
   if(response.data.success){
    toast.success(response.data.message)
    setData({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    navigate("/")
   }
  
   }catch(error){
   AxiosToastError(error)
   }
  
    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p >Welcome To BinkeyIt</p>
                <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name :

                        </label>
                        <input type='text'
                            placeholder='Enter your name'
                            autoFocus
                            id='name'
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-300' />

                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email :

                        </label>
                        <input type='email'
                            placeholder='Enter your email'
                            id='email'
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-300' />

                    </div>
                    <div className='grid gap-1 '>
                        <label htmlFor=' password'>Password :

                        </label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300' >
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter your Password'
                                id='password'
                                name="password"
                                value={data.password}
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
                     <div className='grid gap-1 '>
                        <label htmlFor=' confirmPassword'>Confirm Password :

                        </label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300' >
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Enter yourConfirm Password'
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
                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Register</button>
                </form>
                <p>Have already an account ? <Link to="/login"className='font-semibold text-green-700 hover:text-green-800'>Login</Link> </p>
            </div>
        </section>
    )
}

export default Register

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

import Axios, { googleAuth } from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummeryApi from "../common/SummeryApi";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const valideValue = Object.values(data).every((el) => el);

  // ====== Regular email/password login ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummeryApi.login, // original endpoint
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);

        // store tokens
        localStorage.setItem("accesstoken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // fetch user details
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        // clear form
        setData({ email: "", password: "" });
        setTimeout(() => {
  navigate("/");
}, 2000);

      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // ====== Google login ======
  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code); // original Axios util

        // store tokens
        localStorage.setItem("accesstoken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);

        // set user in Redux
        dispatch(setUserDetails(result.data.user));

       toast.success(" loggined");

setTimeout(() => {
  navigate("/");
},2000);

      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  });

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-2 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="bg-blue-50 p-2 border rounded outline-none focus:border-yellow-300"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="bg-white outline-none w-full"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-green-500"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>

        <button
          onClick={googleLogin}
          type="button"
          className="w-full border border-green-600 text-gray-700 gap-5 py-2 flex rounded items-center justify-center font-semibold mt-2 hover:rounded-full"
        >
          <FcGoogle size={25} /> Continue with Google
        </button>

        <Toaster />
      </div>
    </section>
  );
};

export default Login;



// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import Axios, { googleAuth } from '../utils/Axios';
// import SummeryApi from '../common/SummeryApi';
// // import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from "react-icons/fc";

// import AxiosToastError from '../utils/AxiosToastError';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
// const Login = () => {
//     const [data, setData] = useState({
       
//         email: "",
//         password: "",
        
//     })
//     const [showPassword, setShowPassword] = useState(false)
  
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })

//     }
//     const valideValue = Object.values(data).every(el => el)
//     const handleSubmit = async(e)=>{
//    e.preventDefault()
   
 
//    try{
//  const response = await Axios({
//        ...SummeryApi.login,
//      data : data
//    })
//    if(response.data.error){
//     toast.error(response.data.message)
//    }
//    if(response.data.success){
//     toast.success(response.data.message)
//     localStorage.setItem('accesstoken',response.data.data.accessToken)
//      localStorage.setItem('refreshToken',response.data.data.refreshToken)
//      const userDetails =await fetchUserDetails()
//      dispatch(setUserDetails(userDetails.data))
//     setData({
       
//         email:"",
//         password:"",
       
//     })
//     navigate("/")
//    }
  
//    }catch(error){
//    AxiosToastError(error)
//    }
  
//     }

// const responseGoogle = async (authResult)=>{
//     try{
// if(authResult['code']){
//     const result = await googleAuth(authResult['code']);
//     const {email,name}=result.data.user;

// }
//     }catch(error){
//        console.log(error)
//     }
// }
//    const googleLogin = useGoogleLogin({
//     onSuccess:responseGoogle,
//     onError:responseGoogle,
//     flow:'auth-code'
//    })
//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
               
//                 <form className='grid gap-2 mt-6' onSubmit={handleSubmit}>
                   
//                     <div className='grid gap-1'>
//                         <label htmlFor='email'>Email :

//                         </label>
//                         <input type='email'
//                             placeholder='Enter your email'
//                             id='email'
//                             name="email"
//                             value={data.email}
//                             onChange={handleChange}
//                             className='bg-blue-50 p-2 border rounded outline-none focus:border-yellow-300' />

//                     </div>
//                     <div className='grid gap-1 '>
//                         <label htmlFor=' password'>Password :

//                         </label>
//                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-yellow-300' >
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder='Enter your Password'
//                                 id='password'
//                                 name="password"
//                                 value={data.password}
//                                 onChange={handleChange}
//                                 className=' bg-white outline-none  w-full' />
//                             {/* bg-white p-1 rounded  */}
//                             <div onClick={() => setShowPassword(preve => !preve)} className='cursor'>
//                                 {
//                                     showPassword ? (
//                                          <FaEye />
//                                     ) : (
//                                        <FaEyeSlash />
//                                     )
//                                 }
//                             </div>
//                         </div>
//                         <Link to={"/forgot-password"} className='block ml-auto hover:text-green-500'>Forgot password ?</Link>
//                     </div>
                   
//                     <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>
//                 </form>
//                 <p>Don't have an account ? <Link to="/register"className='font-semibold text-green-700 hover:text-green-800'>Register</Link> </p>
//            <button onClick={googleLogin}
  
//   type="button"
//   className="w-full  border border-green-600 text-gray-700 gap-5 py-2
//    flex rounded items-center justify-center font-semibold mt-2 hover:rounded-full"
// >
//  <FcGoogle size={25}/> Continue with Google
// </button>  
//             </div>
//         </section>
//     )

 
// }

// export default Login


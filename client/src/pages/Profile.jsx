import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuCircleUser } from "react-icons/lu";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummeryApi from '../common/SummeryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';

import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
    const user = useSelector((state)=>state.user)
  const [openProfileAvatarEdit,setOpenProfileAvatarEdit]=useState(false)
  const [userData,setUserData] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile,
  })
  const [loading , setLoading]=useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    setUserData({
         name : user.name,
    email : user.email,
    mobile : user.mobile,
    })
  },[user])
const handleOnChange = (e)=>{
    const {name , value} = e.target
    setUserData((preve)=>{
        return {
            ...preve,
             [name] : value
        }
    }
    )
}
const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.updateUserDetails,
        data : userData
      })
const {data : responseData} = response
if(responseData.success){
    toast.success(responseData.message)
        const userData =await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
}
    }catch(error){
      AxiosToastError(error)
    }finally{
        setLoading(false)
    }
}
  return (
   
    <div>
         <div className='w-20 h-20 bg-white flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
                user.avatar ? (<img alt={user.name} src={user.avatar} className='w-full h-full ' />)
            : (
   <LuCircleUser size={60}/>
            )
        }
   
    </div>
    <button onClick={()=>setOpenProfileAvatarEdit(true)} className='text-sm border px-3 py-1 rounded-full mt-3 w-20 border-amber-500 hover:border-amber-800 hover:bg-amber-300 '>Edit</button>
  
  {openProfileAvatarEdit && ( <UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false) }/> ) } 
     {/**name mobile email password */}
      <form className='my-4  grid gap-4' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor='name'>Name</label>
          <input
          type='text' 
          name='name'
          id='name'
          placeholder='Enter your name'
          className='p-2 bg-blue-50 outline-none rounded border border-blue-200 focus-within:border-amber-500'
          value={userData.name}
          onChange={handleOnChange}
           required>
            
          </input>
        </div>
          <div className='grid'>
          <label htmlFor='email'>Email</label>
          <input
          type='email' 
          name='email'
          id='name'
          placeholder='Enter your email'
          className='p-2 bg-blue-50 outline-none border-blue-200 rounded border focus-within:border-amber-500 '
          value={userData.email}
          onChange={handleOnChange}
          required>
            
          </input>
        </div>
          <div className='grid'>
          <label htmlFor='mobile'>Mobile</label>
          <input
          type='text' 
          name='mobile'
          id='mobile'
          placeholder='Enter your mobile number'
          className='p-2 bg-blue-50 outline-none rounded border border-blue-200 focus-within:border-amber-500'
          value={userData.mobile}
          onChange={handleOnChange}
          required>
            
          </input>
        </div>

        <button className='border px-4 py-2 font-semibold border-blue-200 hover:bg-green-400 rounded bg-gray-300 '>
            {
               loading ? "Loading..." : "Submit"
            }
            </button>
      </form>
    
    </div>
   

  )
}

export default Profile

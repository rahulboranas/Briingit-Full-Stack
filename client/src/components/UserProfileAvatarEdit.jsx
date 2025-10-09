import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuCircleUser } from "react-icons/lu";
import SummeryApi from '../common/SummeryApi';
import Axios from '../utils/Axios';
import { IoCloseOutline } from "react-icons/io5";
import AxiosToastError from '../utils/AxiosToastError';
import { updateAvatar } from '../store/userSlice';
const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleUploadAvatarImage=async(e)=>{
        const file=e.target.files[0]
        
        if(!file){
            console.log('no files were selected')
     return
        }
        const formData = new FormData()
        formData.append('avatar',file)
        
        try{
        setLoading(true)

        const response = await Axios({
            ...SummeryApi.uploadAvatar,
            data : formData
        })
      console.log(" Full Response:", response) 
const { data: responseData } = response
console.log(" Response Data:", responseData) 
        dispatch(updateAvatar(responseData.data.avatar))
        console.log(response)
            } catch (error) {
  console.error(" Upload error:", error.response?.data || error.message)
  AxiosToastError(error)
}

        finally{
             setLoading(false)
        }
       
    }
    return (
        <section className='fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-neutral-900/60 p-4'>
            <div className='bg-white  max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
<button onClick={close} className='w-fit block ml-auto text-neutral-800 hover:text-amber-300'><IoCloseOutline size={20}/></button>
                <div className='w-20 h-20 bg-white
                 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
                    {
                        user.avatar ? (<img alt={user.name} src={user.avatar} className='w-full h-full ' />)
                            : (
                                <LuCircleUser size={60} />
                            )
                    }

                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='uploadProfile'><div className='border cursor-pointer border-yellow-400 text-sm hover:bg-amber-300 px-4 py-1 rounded my-3'>{
                        loading ? "Loading..." : "Upload"}</div></label>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden' />
                </form>

            </div>
        </section>
    )
}

export default UserProfileAvatarEdit

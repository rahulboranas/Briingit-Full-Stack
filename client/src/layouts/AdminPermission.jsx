import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/IsAdmin'

const AdminPermission = ({children}) => {
       const user =useSelector(state=>state.user)
  return (
    <div>
   {
    isAdmin(user.role) ? children : <p className='text-red-500 bg-red-100 p-4'>Do not have a permission</p>
   }
    </div>
  )
}

export default AdminPermission

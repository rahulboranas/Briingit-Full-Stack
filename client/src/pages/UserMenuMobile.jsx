
import React from 'react'
import UserMenu from './userMenu'
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2 '>
      <Link to={'/'} className='text-gray-400 block ml-auto mr-3 w-fit  hover:text-gray-700 hover:bg-gray-200 rounded-full '><IoCloseOutline size={25}/></Link>
      <div className='container mx-auto px-3 pb-8  '>
           <UserMenu/>
      </div>
   
    </section>
  )
}

export default UserMenuMobile

// import React from 'react'
// import UserMenu from './userMenu'
// import { IoCloseOutline } from "react-icons/io5";
// const UserMenuMobile = () => {
//   return (
//     <section className='bg-white h-full w-full py-2 '>
//       <button onClick={()=>window.history.back()} className='text-gray-400 block ml-auto mr-3 w-fit  hover:text-gray-700 hover:bg-gray-200 rounded-full '><IoCloseOutline size={25}/></button>
//       <div className='container mx-auto px-3 pb-8  '>
//            <UserMenu/>
//       </div>
   
//     </section>
//   )
// }

// export default UserMenuMobile

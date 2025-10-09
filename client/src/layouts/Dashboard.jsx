import React from 'react'
import UserMenu from '../pages/userMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  
  return (

    <section className='bg-white'>
      <div className='container mx-auto p-3 flex gap-4'>
        {/* left for menu (fixed width ~250px) */}
        <div className='w-64 shrink-0 sticky max-h-[calc(100vh-96px)] overflow-y-auto top-24 py-4 hidden border-r lg:block '>
          <UserMenu />
        </div>

        {/* right for content (fills remaining) */}
        <div className='flex-1 bg-white min-h-[75vh]'>
          <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default Dashboard


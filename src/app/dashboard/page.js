'use client'
import UserDashboard from '@/components/user-dashboard-components/UserDashboard'
import UserLeftSideBar from '@/components/user-dashboard-components/UserLeftSideBar'
import React, { useState } from 'react'

const Page = () => {
  const [showOnDashboard, setShowOnDashboard] = useState('myAdoptionPost')
  return (
    <main className='relative grid grid-cols-1 md:grid-cols-12 p-1 gap-5 items-start'>
      <div className='md:sticky md:top-[10vh] md:col-span-2   md:h-[90vh]'>
        <UserLeftSideBar showOnDashboard={showOnDashboard} setShowOnDashboard={setShowOnDashboard} />
      </div>
      <div className=' md:col-span-10 min-h-[90vh]'>
        <UserDashboard showOnDashboard={showOnDashboard} />
      </div>
    </main>
  )
}

export default Page
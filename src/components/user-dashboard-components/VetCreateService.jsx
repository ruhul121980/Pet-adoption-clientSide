import React from 'react'
import { useUserContext } from '../context/UserContext'

const VetCreateService = () => {
    const userContext = useUserContext()
    // const {posts} = userContext.user
    return (
      <div>
          <div>
            <p className='text-red-500 bg-red-500/10 py-3 w-full px-2 font-semibold text-lg'>Create Service for Pets !!</p>
          </div>  
      </div>
    )
}

export default VetCreateService
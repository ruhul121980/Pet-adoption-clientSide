import React from 'react'
import { useUserContext } from '../context/UserContext'

const VetAllServices = () => {
    const userContext = useUserContext()
    const {vetServices} = userContext.user
    return (
      <div>
        {
          vetServices?.length < 1 ?
          <div>
            <p className='text-red-500 bg-red-500/10 py-3 w-full px-2 font-semibold text-lg'>Vet Service is Empty !!</p>
          </div>
          : 
          <div>
            <p className='text-green-600 bg-green-500/10 py-3 w-full px-2 font-semibold text-lg'>
              My Vet Service Posts:
            </p>
          </div>
        }
      </div>
    )
}

export default VetAllServices
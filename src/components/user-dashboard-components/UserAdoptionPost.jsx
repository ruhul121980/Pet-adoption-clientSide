import React from 'react'
import { useUserContext } from '../context/UserContext'

const UserAdoptionPost = () => {
  const userContext = useUserContext()
  const {posts} = userContext.user
  return (
    <div>
      {
        posts.length < 1 ?
        <div>
          <p className='text-red-500 bg-red-500/10 py-3 w-full px-2 font-semibold text-lg'>No Post to see !!</p>
        </div>
        : 
        <div>
          <p className='text-green-600 bg-green-500/10 py-3 w-full px-2 font-semibold text-lg'>
            My Posts:
          </p>
        </div>
      }
    </div>
  )
}

export default UserAdoptionPost
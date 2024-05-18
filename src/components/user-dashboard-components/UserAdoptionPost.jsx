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
          
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
          {
            posts.map((i,index)=>  
                 <div className=' rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                    <div className='relative z-[-100] '>
                      <img className='w-full z-0' src={i.img} alt={i.petNickname} />
                      <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                        <p>{i.category}</p>
                        <p>{i.postDate}</p>
                      </div>
                      <div className=' absolute bottom-0 left-0 right-0 w-full bg-custom-violet/80 flex justify-between items-center p-2 text-xs text-white'>
                        <p className='text-sm'>{i.petNickname}</p>
                      </div>
                    </div>
                    <div className='p-2'>
                      <div className='flex  items-center gap-2'>
                        <span className='text-red-500 text-lg'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                        </span>
                        <span className=' font-light capitalize'>{i.location}</span>
                      </div>
                      <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Size:</span>
                          <span>{i.size}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Age:</span>
                          <span>{i.age}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Vaccinated:</span>
                          <span>{i.vaccinated}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Gender:</span>
                          <span>{i.gender}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Spayed:</span>
                          <span>{i.spayed}</span>
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 text-white'>
                      <button className='p-3 font-semibold hover:bg-green-500/50 hover:text-black bg-green-500 duration-200'>Mark as Adopted</button>
                      <button className='p-3 font-semibold hover:bg-red-500/50 hover:text-black bg-red-500  duration-200'>Delete Post</button>
                    </div>
                 </div> 
            )
          }
          </div> 

           
        </div>
      }
    </div>
  )
}

export default UserAdoptionPost
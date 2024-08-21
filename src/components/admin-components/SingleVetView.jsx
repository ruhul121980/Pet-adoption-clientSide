import { handleBanned } from '@/utils/handleBanned'
import { handleLicense } from '@/utils/handleLicense'
import React from 'react'
import { TK } from '../TK'

const SingleVetView = ({userDetails,setUserDetails,getAllVetsData}) => {
  const calculateEarnings = ( fee, count) =>{
    let amount = parseFloat(fee)
    let total = amount * count 
    if(total){
      return total 
    }else{
      return 0
    }
  }
  const getBannedUpdate =async ()=>{
    const res = await handleBanned(userDetails.email,userDetails.type)
    if(res.status == 200){
      getAllVetsData()
    }
  }
  const getLicenseUpdate =async ()=>{
    const res = await handleLicense(userDetails.email)
    if(res.status == 200){
      getAllVetsData()
    }
  }
  return (
    <div>
      <div>
        <button onClick={()=>setUserDetails(null)} 
        className='flex gap-2 items-center bg-slate-300 rounded hover:bg-slate-500 p-3 py-2 font-bold hover:text-white'>
          <span className='text-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"></path>
              <path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"></path>
            </svg>
          </span>
          Back
        </button>
      </div>
      <div className='flex flex-row gap-2 w-full p-3'>
        <div className='w-[30%]'>
          <h3 className='font-semibold text-base text-slate-900'>Veterinarian Details:</h3>
          <span className='text-[150px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
              <path fill="currentColor" d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28M68.87 198.42a68 68 0 0 1 118.26 0a91.8 91.8 0 0 1-118.26 0m124.3-5.55a75.6 75.6 0 0 0-44.51-34a44 44 0 1 0-41.32 0a75.6 75.6 0 0 0-44.51 34a92 92 0 1 1 130.34 0M128 156a36 36 0 1 1 36-36a36 36 0 0 1-36 36"></path>
            </svg>
          </span>
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>First Name:</span>
            <span>{userDetails.firstName}</span>
          </p>
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>Last Name:</span>
            <span>{userDetails.lastName}</span>
          </p> 
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>Email:</span>
            <span>{userDetails.email}</span>
          </p> 
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>Password:</span>
            <span className='text-black/50'>{userDetails.pwd}</span>
          </p> 
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>Address:</span>
            <span>{userDetails.address}</span>
          </p> 
          <p className='w-full flex gap-5 py-1'>
            <span className='font-semibold'>Phone:</span>
            <span>{userDetails.phoneNumber}</span>
          </p> 
          <p className='w-full flex gap-5 py-1 text-slate-900'>
            <span className='font-semibold'>Vet License:</span>
            <span>{userDetails.license || 'N/A'}</span>
          </p> 
          <p className='w-full flex gap-5 py-1 text-teal-500'>
            <span className='font-semibold'>Account Approved:</span>
            <span>{userDetails.approved? 'Yes':'No'}</span>
          </p> 
          <p className='w-full flex gap-5 py-1 text-red-500'>
            <span className='font-semibold'>Account Banned:</span>
            <span>{userDetails.banned? 'Yes':'No'}</span>
          </p> 
          <div className='flex gap-2 '>
            {
              !userDetails.approved &&
              <button onClick={getLicenseUpdate} className='bg-sky-500 rounded px-3 py-2 font-bold text-white hover:bg-sky-600'>Account License Approve</button>
            }
            {
              userDetails.approved &&
              <button onClick={getLicenseUpdate} className='bg-red-500 rounded px-3 py-2 font-bold text-white hover:bg-red-600'>Account License Reject</button>
            }
            {
              userDetails.banned &&
              <button onClick={getBannedUpdate} className='bg-yellow-500 rounded px-3 py-2 font-bold text-white hover:bg-yellow-600'>Remove Restriction</button>
            }
            {
              !userDetails.banned &&
              <button onClick={getBannedUpdate} className='bg-orange-500 rounded px-3 py-2 font-bold text-white hover:bg-orange-600'>Account Restrict</button>
            }
          </div>
        </div>
        <div  className='w-[70%] border-l-2 border-black/50 pl-2'>
          <h3 className='font-semibold text-base text-slate-900'>VET Service Posts:</h3>

          <div className='flex flex-wrap gap-2'>
            {
              userDetails.vet_posts?.map((i,index)=>(
                <div key={index}>
                  <div 
                    className='w-[300px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 flex p-2 bg-white justify-between'>
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-center w-full aspect-[4/3] overflow-hidden object-cover'>
                        <img className='w-full rounded-lg object-contain' src={i.img} alt={i.vetName} />
                      </div>
                      <div className='grid grid-cols-2 w-full gap-1 gap-x-5 capitalize p-2'>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Service ID:</span>
                          <span>{i.id}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Date:</span>
                          <span>{i.postDate}</span>
                        </p> 
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Vet Name:</span>
                          <span>{i.vetName}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Fee:</span>
                          <span>{i.fee}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Category:</span>
                          <span>{i.category}</span>
                        </p>
                        <p className='flex gap-1'>
                          <span className=' font-semibold'>Location:</span>
                          <span>{i.location}</span>
                        </p>
                        
                        <p className='flex flex-col gap-1'>
                          <span className=' font-semibold'>Service Title:</span>
                          <span>{i.serviceTitle}</span>
                        </p>
                        <p className='flex gap-1'>
                            <span className=' font-semibold'>Banned:</span>
                            <span> {i.banned?"Yes":'No'} </span>
                        </p>
                        <p className='flex flex-col gap-1'>
                          <span className=' font-semibold'>Service Description:</span>
                          <span>{i.serviceDescription}</span>
                        </p>
                        
                        
                      </div> 
                        <div className='p-2 font-semibold   bg-green-500 rounded-lg col-span-2 w-full flex '>
                          Total Earnings: <span ><TK/></span>{calculateEarnings(i.fee,i.meeting?.length)}
                        </div>
                    </div> 
                  </div> 
                </div>

              ))
            }
            {
              userDetails.vet_posts.length == 0 && <div>No Vet Serivce Posts</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleVetView
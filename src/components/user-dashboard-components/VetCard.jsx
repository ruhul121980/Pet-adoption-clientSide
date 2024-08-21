import React, { useState } from 'react'
import VetMeetingform from './VetMeetingform'

const VetCard = ({vetPost,index, handleOpenUpdateVetPost, handleDelete,handleGetVetPosts}) => {
    
    const calculateEarnings = ( fee, count) =>{
      let amount = parseFloat(fee)
      let total = amount * count 
      if(total){
        return total 
      }else{
        return 0
      }
    }
  
    const [openMeetingLinkForm, setOpenMeetingLinkForm] = useState(null)

     
  return (
    <div key={index}>
        <div className='p-2'> 
            <div className='w-[300px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
            <div className='relative z-[-100] w-[300px] h-[300px] overflow-hidden '>
                <img className='w-full z-0' src={vetPost.length? selectedImages[0] : vetPost.img} alt={vetPost.serviceTitle} />
                <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                <p>{vetPost.category}</p>
                <p>{vetPost.postDate}</p>
                </div>
                
            </div>
            <div className='p-2'>
                <div className='flex justify-between items-center'>
                <div className='flex  items-center gap-2'>
                    <span className='text-red-500 text-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                    </span>
                    <span className=' font-light capitalize'>{vetPost.location}</span>
                </div >
                <div className='flex  items-center gap-2'>
                    <span className='text-green-500 text-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                        <g fill="currentColor">
                        <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0a5 5 0 0 1 10 0"></path>
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207c0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158c0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522c0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569c0 .339-.257.571-.709.614v-1.195z"></path>
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"></path>
                        <path d="M9.998 5.083L10 5a2 2 0 1 0-3.132 1.65a6 6 0 0 1 3.13-1.567"></path>
                        </g>
                    </svg>
                    </span>
                    <span className=' font-light capitalize'>{vetPost.fee}</span>
                </div >
                </div>
                <div className='  w-full   flex flex-col justify-between  text-xs  '>
                <p className='text-base capitalize  p-2'>{vetPost.serviceTitle}</p>
                <div className='flex  items-center gap-2'>
                    <span className='text-sky-500 text-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                        <path fill="currentColor" d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.41 4.41 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.41 4.41 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path>
                    </svg>
                    </span>
                    <span className=' font-light uppercase'>{vetPost.vetName}</span>
                </div >
                <p className='text-xs text-justify text-black/60  p-2'>{vetPost.serviceDescription}</p>
                </div>
                <div className='text-base font-semibold text-slate-900'>
                Total Earnings ${ calculateEarnings(vetPost.fee,vetPost.meeting.length)}
                </div>
                <div>
                <p className='text-base font-bold'>
                Meeting {vetPost.meeting.length}
                </p>
                <div className='flex flex-col gap-1'>
                {
                    vetPost.meeting.length > 0 &&
                    vetPost.meeting.map((m,i)=>(
                    <VetMeetingform 
                        key={i}
                        m={m} i={i} 
                        vetPost={vetPost}
                        setOpenMeetingLinkForm={setOpenMeetingLinkForm} 
                        openMeetingLinkForm={openMeetingLinkForm}
                        handleGetVetPosts={handleGetVetPosts} />
                    ))
                }
                </div>
                </div>
                <div className='py-2 flex justify-between'>
                <button onClick={()=>handleOpenUpdateVetPost(vetPost,index+1)} className='bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-xl px-5 p-2'> Update Service </button>
                <button onClick={()=>handleDelete(vetPost)} className='bg-red-700 hover:bg-red-500 text-white font-bold rounded-xl px-5 p-2'> Delete Service </button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default VetCard
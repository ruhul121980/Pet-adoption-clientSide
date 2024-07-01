'use client'
import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import { getAllVetPosts } from '@/utils/getAllVetPosts'; 

export default  function  veterinarian () {
    const [vetPosts, setVetPosts] = useState([]); // Empty array to store posts

    const handleGetVetPosts = async ()=>{ 
        let allVetPosts = await getAllVetPosts();
        setVetPosts(allVetPosts.data)
    }
    useEffect(()=>{
        handleGetVetPosts()
    },[])
    return  (
    <main  className="min-h-screen">
        <div className='w-full  lg:w-[85%] p-5 grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-2 lg:gap-5' >
            {
              vetPosts.map((i,index)=>(
                <Link 
                key={i.serviceTitle + index} 
                href={'/veterinarian/'+i.id} 
                className='w-full '>
                   <div className='p-2 w-full'> 
                      <div className='w-[300px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                        <div className='relative z-[-100] '>
                          <img className='w-full z-0' src={i.images.length? i.images[0] : i.img} alt={i.serviceTitle} />
                          <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                            <p>{i.category}</p>
                            <p>{i.postDate}</p>
                          </div> 
                        </div>
                        <div className='p-2'>
                          <div className='flex justify-between items-center'>
                            <div className='flex  items-center gap-2'>
                              <span className='text-red-500 text-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                              </span>
                              <span className=' font-light capitalize'>{i.location}</span>
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
                              <span className=' font-light capitalize'>{i.fee}</span>
                            </div >
                          </div>
                          <div className='  w-full   flex flex-col justify-between  text-xs  '>
                            <p className='text-base capitalize  p-2'>{i.serviceTitle}</p>
                            <div className='flex  items-center gap-2'>
                              <span className='text-sky-500 text-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                                  <path fill="currentColor" d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.41 4.41 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.41 4.41 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path>
                                </svg>
                              </span>
                              <span className=' font-light capitalize'>{i.vetName}</span>
                            </div >
                            <p className='text-sm text-justify text-black/80  p-2'>{i.serviceDescription}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </Link>
              ))
            }
        </div>
    </main>
    )
  };
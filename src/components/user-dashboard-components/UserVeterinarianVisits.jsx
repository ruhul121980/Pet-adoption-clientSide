import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { findVetsWithUserMeetings } from '@/utils/matchingVets';


const UserVeterinarianVisits = () => {
  //fetch data from api 
  const userContext = useUserContext()  
  const {_id} = userContext.user 

  const [allVetPosts, setAllVetPosts] = useState([]); // Empty array to store posts
  const [myVetVisits, setMyVetVisits] = useState([]); // Empty array to store posts

  const handleGetVetPosts = async ()=>{ 
    const headers = new Headers({
      'Content-Type': 'application/json', 
    });
    
    // Send the POST request
    const url = 'http://localhost:4000/api/my-visits?user_id='+_id
    const response = await fetch(url, {
      method: 'Get',
      headers, 
    });
    const myVisitsResponse = await response.json(); 
    console.log(myVisitsResponse)
    if (myVisitsResponse.status == 200) {
      setAllVetPosts(myVisitsResponse.vets)
      let vetVisits = findVetsWithUserMeetings(myVisitsResponse.vets , _id)
      // console.log("final ",vetVisits)
      setMyVetVisits(vetVisits)
    }else{
      alert("Fetch Error")
    }

  }
    
  useEffect(()=>{
    handleGetVetPosts()
  },[])
  if (myVetVisits) {
    if (myVetVisits.length > 0) {
      return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 '>
          {
            myVetVisits.map((s,i)=>(
              <div key={i} className='flex gap-2 flex-col  p-3 w-full shadow-lg bg-violet-100 rounded-xl'>
                <div className='flex gap-2'>
                  <img src={s.img} alt={s.id} className='w-20 lg:w-40 rounded-xl' />
                  <div className='max-w-[70%] '>
                    <p className=' capitalize text-3xl text-black'>
                      {s.serviceTitle}
                    </p>
                    <p className='text-gray-700 font-light'>
                      {s.serviceDescription}
                    </p>
                    <p className=' uppercase font-semibold text-gray-500'>
                      {s.vetName}
                    </p>
                    <p className='text-2xl font-black text-purple-500'>
                      ${s.fee}
                    </p>
                    
                  </div>
                </div>
                <div className='text-xs text-gray-500    flex flex-col gap-1 '>
                  <p>
                    <span>Date: </span>
                    <span>{s.postDate} </span>
                  </p>
                  <p>
                    <span>Category: </span>
                    <span>{s.category} </span>
                  </p>
                  <p>
                    <span>Location: </span>
                    <span>{s.location} </span>
                  </p>
                  <div className='flex flex-col gap-2'>
                  
                    {
                      s.meeting.map(m=>(
                        (m.userId == _id) &&
                        (
                          m.meetingLink ? 
                            <div className=' flex  items-center gap-2'>
                              <a href={m.meetingLink}  
                              className='font-semibold rounded text-white bg-purple-500 hover:bg-purple-600 px-3 py-1'>
                              Meeting Link</a>
                              <p>Meet Time : {m.meetingTime}</p>

                            </div> 
                            :
                            <div>
                            <div className=' cursor-not-allowed inline-block font-semibold rounded text-white bg-violet-500 px-3 py-1'>
                            Meeting Link Not Given Yet !</div>
                            </div>
                          
                        )
                        
                      ))
                    }
                      
                    </div>
                </div>
              </div>
            ))
          } 
        </div>
      )
    } else {
      return (
        <div>
          No Visits
        </div>
      )
    } 
  } else {
    return (
      <div>
          Loading ..
      </div>
    )
  }
 
}

export default UserVeterinarianVisits
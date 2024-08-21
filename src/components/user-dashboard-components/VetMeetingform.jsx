import React, { useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { handleUpdateMeetLink } from '@/utils/handleUpdateMeetLink'

const VetMeetingform = ({m,i,setOpenMeetingLinkForm,openMeetingLinkForm,vetPost,handleGetVetPosts}) => {
    const [meetForm, setMeetForm] = useState({...m})
    
    const userContext = useUserContext()
    const {user,setUser} = userContext
    
    const handleChange = (e)=>{
        const { name, value } = e.target;
        if(name == 'meetingLink'){
            setMeetForm({...meetForm,meetingLink:value })
        } 
        if(name == 'meetingTime'){
            setMeetForm({...meetForm,meetingTime:value })
        } 
      }
      const handleSave = async ()=>{
        if(meetForm.meetingTime.length > 2){
            const  updateLink = await handleUpdateMeetLink(user.email,vetPost.id,meetForm,i)
            if (updateLink.status == 200) {
                setOpenMeetingLinkForm(null)
                handleGetVetPosts()
            }
        }else{
            alert("Select Meeting Time")
        }
      }
  return (
    <div key={i}>
        <p className='font-bold'>Patient {i+1}: </p> 
        {
        m.meetingLink && 
        <button onClick={()=>{setOpenMeetingLinkForm(i)}} className='p-2 rounded bg-teal-500 hover:bg-teal-600 text-white font-bold '>Update Meetinglink</button>
        }
        {
        !m.meetingLink && openMeetingLinkForm !== i &&
        <button onClick={()=>{setOpenMeetingLinkForm(i)}} className='p-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-bold '>Give Meetinglink</button>
        }
        {
            openMeetingLinkForm == i && 
            <div className='p-2 flex flex-col gap-2'>
                <div>
                    <input onChange={handleChange} type="text" name='meetingLink' value={meetForm.meetingLink} placeholder='MeetLink ' className='p-2 bg-gray-200 w-full' />
                </div>
                <div>
                    <select value={meetForm.meetingTime} onChange={handleChange} name="meetingTime" id="meetingTime" className='w-full p-2'>
                        <option value="">Select Time</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                        <option value="12:00 AM">12:00 AM</option>
                        <option value="1:00 AM">1:00 AM</option>
                        <option value="2:00 AM">2:00 AM</option>
                        <option value="3:00 AM">3:00 AM</option>
                        <option value="4:00 AM">4:00 AM</option>
                        <option value="5:00 AM">5:00 AM</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                    </select>
                </div>
                <div className='flex gap-2 items-center '>
                    <button onClick={()=>handleSave()} className='text-xs rounded-lg bg-green-500 hover:bg-green-500/60 p-2 py-1'>Save</button>
                    <button onClick={()=>setOpenMeetingLinkForm(null)} className='text-xs rounded-lg bg-red-500 hover:bg-red-500/60 p-2 py-1'>close</button>
                </div>
            </div>
        }
    </div>
  )
}

export default VetMeetingform
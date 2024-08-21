'use client'
import React, { useState ,useEffect} from 'react';
import { getAllVetPosts } from '@/utils/getAllVetPosts';
import { useUserContext } from '../context/UserContext'
import { handleVetPost } from '@/utils/handleVetPost';
import { setUserData } from '@/utils/handleUserData';
import UpdateVetPost from './UpdateVetPost';
import VetCard from './VetCard';

const VetAllServices = () => {
    const [openUpdate, setOpenUpdate] = useState(-1)
    const userContext = useUserContext()  
    const {email,_id,password,type,vet_posts} = userContext.user 

    const [vetPosts, setVetPosts] = useState([]); // Empty array to store posts

    const handleGetVetPosts = async ()=>{ 
      let allVetPosts = await getAllVetPosts()
      let onlyUserPosts = allVetPosts.data.filter(post=> post.vetId == _id);
      setVetPosts(onlyUserPosts)
    }
    const handleDelete = async(vetPost)=>{
      console.log("delete ",vetPost)
      let confirmed = confirm("Confim to Delete  ")
      if(confirmed){
        let newVetPosts = vetPosts.filter(post => post.id != vetPost.id)
  
        const updateUserData = { 
          email,
          _id,
          password,
          type,
          vet_posts:newVetPosts
        }
        const serverResponse = await handleVetPost(updateUserData)
        if(serverResponse.status ==200){
          setUserData({...userContext.user, ...serverResponse.data})
          await  handleGetVetPosts()
        }

      }
    }
    const handleOpenUpdateVetPost = async (vetPost,index)=>{
      setOpenUpdate(index)
    } 
    useEffect(()=>{
      handleGetVetPosts()
    },[])

 
    return (
      <div>
        {
          vetPosts?.length < 1 ?
          <div>
            <p className='text-red-500 bg-red-500/10 py-3 w-full px-2 font-semibold text-lg'>Vet Service is Empty !!</p>
          </div>
          :
          openUpdate > -1 ?
           ( 
            openUpdate && 
            <div> 
              <UpdateVetPost vetPosts={vetPosts} openUpdate={openUpdate} setOpenUpdate={setOpenUpdate}/>
            </div>)
           :
          (<div>
            <p className='text-green-600 bg-green-500/10 py-3 w-full px-2 font-semibold text-lg'>
              My Vet Service Posts:
            </p>
            <div className="flex flex-wrap gap-1">
              {
                vetPosts.map((vetPost,index)=> 
                <VetCard 
                key={index } 
                vetPost={vetPost} 
                index={index} 
                handleOpenUpdateVetPost={handleOpenUpdateVetPost} 
                handleDelete={handleDelete}
                email={email}
                handleGetVetPosts={handleGetVetPosts}
                />
                )
              }
            </div>
          </div>)
        }
      </div>
    )
}

export default VetAllServices
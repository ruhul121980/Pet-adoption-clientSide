import React, { useEffect, useState } from 'react'
import { getAllUsersInfo } from '@/utils/getAllUsersInfo'
import SingleUserView from './SingleUserView'

const AdminUserView = () => {
    const [allUsersData, setAllUsersData] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const getAllUsersData = async()=>{ 
        let data = await getAllUsersInfo()
        if (data.status == 200) {
            setAllUsersData(data.allUsers)
            setUserDetails(null)
        } 
    }
    useEffect(()=>{
        getAllUsersData()
    },[])
    if (allUsersData) {
        return (
            <div className='  w-full min-h-screen text-xs'>
                <h3 className='font-semibold text-base text-slate-900'>Users:</h3><br />

                {
                    userDetails && 
                    <SingleUserView 
                        setUserDetails={setUserDetails} 
                        userDetails={userDetails} 
                        getAllUsersData={getAllUsersData} 
                        />
                }
                {
                    !userDetails && 
                    <table className='table-auto'>
                        <thead>
                            <tr className='border-b-2 '>
                                <th className='p-2 px-3'>First Name</th>
                                <th className='p-2 px-3'>Last Name</th>
                                <th className='p-2 px-3'>Email</th>
                                <th className='p-2 px-3'>Phone</th>
                                <th className='p-2 px-3'>Banned</th>
                                <th className='p-2 px-3'>Total Posts</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allUsersData.map((user,index)=>(
                                <tr key={index} className='border-b-2 '>
                                    <td className='p-2 px-3'>{user.firstName}</td>
                                    <td className='p-2 px-3'>{user.lastName}</td>
                                    <td className='p-2 px-3'>{user.email}</td>
                                    <td className='p-2 px-3'>{user.phoneNumber}</td>
                                    <td className='p-2 px-3'>{user.banned? 'Yes': 'No'}</td>
                                    <td className='p-2 px-3'>{user.posts?.length || 0}</td>
                                    <td className=''>
                                        <button onClick={()=>setUserDetails(user)} className='p-1 px-3 bg-green-500 rounded'>View Details</button>
                                    </td> 
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                }
            </div>
          )
    } else {
        return (
            <div className='p-5' >Loading All Users Data</div>
          )
    }
  
}

export default AdminUserView
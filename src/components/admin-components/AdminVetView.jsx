import React, { useEffect, useState } from 'react'
import { getAllVetsInfo } from '@/utils/getAllVetsInfo'
import SingleVetView from './SingleVetView'
const AdminVetView = () => {
    const [allVetsData, setAllVetsData] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const getAllVetsData = async()=>{ 
        let data = await getAllVetsInfo()
        //data.status == 200 
        if (data.status == 200) {
            // console.log(data.allVets)
            setAllVetsData(data.allVets)
            setUserDetails(null)
        } 
    }
    useEffect(()=>{
        getAllVetsData()
    },[])

    if (allVetsData) {
        return (
            <div className='  w-full min-h-screen text-xs'>
                {
                    userDetails && 
                    <SingleVetView 
                        setUserDetails={setUserDetails} 
                        userDetails={userDetails} 
                        getAllVetsData={getAllVetsData} 
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
                                <th className='p-2 px-3'>Passoword</th>
                                <th className='p-2 px-3'>Phone</th>
                                <th className='p-2 px-3'>License</th>
                                <th className='p-2 px-3'>Total Vet Posts</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allVetsData.map((user,index)=>(
                                <tr key={index} className='border-b-2 '>
                                    <td className='p-2 px-3'>{user.firstName}</td>
                                    <td className='p-2 px-3'>{user.lastName}</td>
                                    <td className='p-2 px-3'>{user.email}</td>
                                    <td className='p-2 px-3 text-black/50'>{user.pwd}</td>
                                    <td className='p-2 px-3'>{user.phoneNumber}</td>
                                    <td className='p-2 px-3'>{user.license}</td>
                                    <td className='p-2 px-3'>{user.vet_posts?.length || 0}</td>
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
export default AdminVetView

 
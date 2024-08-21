import React from 'react'
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/UserContext';
import { setUserData } from '@/utils/handleUserData';

const UserLeftSideBar = ({showOnDashboard,setShowOnDashboard}) => {
    const router = useRouter();
    const userContext = useUserContext();
    const {user,setUser} = userContext
    const handleLogout = ()=>{
        let userData = {login:false, email:'',password:'',type:''}
        setUserData(userData)
        setUser(userData)
        router.push('/login');
    }
    return (
    <div className='w-full h-full flex md:flex-col justify-between'>
        <div className='grid grid-cols-8 md:grid-cols-1 gap-1  w-full'>
        {
                user.type === 'veterinarian' &&
                <button 
                onClick={()=>setShowOnDashboard('createServices')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'createServices' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
                        </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                       Create Vet Service
                    </span>
                </button> 
            }
            {
                user.type === 'veterinarian' &&
                <button 
                onClick={()=>setShowOnDashboard('vetServices')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'vetServices' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M9.354 7.104a.5.5 0 0 0-.708-.708L7.234 7.808l-.397-.362a.5.5 0 0 0-.674.738l.75.685a.5.5 0 0 0 .69-.016zm0 4.292a.5.5 0 0 1 0 .708l-1.75 1.75a.5.5 0 0 1-.691.015l-.75-.685a.5.5 0 0 1 .674-.738l.397.363l1.412-1.413a.5.5 0 0 1 .708 0M11 12a.5.5 0 0 0 0 1h1.67c-.11-.313-.17-.65-.17-1zm-5 4h5.05q-.05.243-.05.5q0 .25.038.5H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3.401a3 3 0 0 0-1-.36V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2m4.5-8.5A.5.5 0 0 1 11 7h2.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.5-.5m7 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S12 17.75 12 16.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5"></path>
                    </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                       My Vet Services
                    </span>
                </button> 
            }
            {
                user.type === 'user' &&
                <button 
                onClick={()=>setShowOnDashboard('veterinarianVisits')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'veterinarianVisits' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="currentColor" fillRule="evenodd" d="M14.433 33.442a3 3 0 1 0 1.96-.416a9 9 0 0 1-.103-.405a20 20 0 0 1-.32-1.87a17 17 0 0 1-.14-1.914a7 7 0 0 1 .015-.527q.577-.166 1.155-.297c.441-.1.703.42.914.842l.086.169h11.749c.229-.434.748-1.126 1.251-1.011q.806.184 1.609.433l-.003.001q-.003-.003 0 .002c.004.014.026.08.048.22q.038.244.05.625c.014.504-.015 1.117-.074 1.735c-.06.617-.149 1.214-.249 1.685q-.033.157-.066.286H31a1 1 0 0 0-.894.553l-1 2A1 1 0 0 0 29 36v2a1 1 0 0 0 1 1h2v-2h-1v-.764L31.618 35h2.764L35 36.236V37h-1v2h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-.106-.447l-1-2A1 1 0 0 0 35 33h-.636c.107-.533.196-1.155.256-1.779c.066-.674.1-1.373.083-1.983l-.001-.028C38.69 30.895 42 33.666 42 36.57V42H6v-5.43c0-3.032 3.61-5.92 7.831-7.577c.011.622.07 1.325.155 2.006c.092.735.217 1.466.355 2.068q.045.193.092.375M16 37.015c.538 0 1-.44 1-1.015c0-.574-.462-1.015-1-1.015s-1 .44-1 1.015c0 .574.462 1.015 1 1.015M24 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10" clipRule="evenodd"></path>
                        </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                    Veterinarian Visits
                    </span>
                </button> 
            }
            {
                user.type === 'user' &&
                <button  
                onClick={()=>setShowOnDashboard('myCart')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'myCart' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M45.416 28.85C51.155 28.85 56 24.068 56 18.287c0-5.781-4.783-10.564-10.584-10.564c-5.781 0-10.564 4.783-10.564 10.564c0 5.822 4.783 10.563 10.564 10.563m-28.51 12.976h24.268c.81 0 1.517-.665 1.517-1.56c0-.893-.707-1.559-1.517-1.559H17.26c-1.186 0-1.914-.832-2.1-2.1l-.313-2.184h26.368c2.163 0 3.556-.915 4.346-2.703c-1.788 0-3.473-.353-5.032-1.04c-.312.416-.707.603-1.29.603l-24.87.021l-1.767-12.06h19.463c-.103-.957-.041-2.205.104-3.14H12.144l-.374-2.642c-.229-1.6-.79-2.412-2.911-2.412h-7.32C.707 11.05 0 11.778 0 12.61c0 .852.707 1.58 1.539 1.58h7.028l3.328 22.833c.436 2.953 1.996 4.803 5.011 4.803m28.53-16.677c-.727 0-1.372-.5-1.372-1.268v-4.326h-3.972a1.274 1.274 0 0 1-1.268-1.268c0-.686.561-1.269 1.268-1.269h3.972v-4.304c0-.79.645-1.29 1.373-1.29c.727 0 1.35.5 1.35 1.29v4.304h3.973c.707 0 1.29.582 1.29 1.269c0 .686-.583 1.268-1.29 1.268h-3.972v4.326c0 .769-.624 1.268-1.351 1.268M18.55 51.933a3.342 3.342 0 0 0 3.369-3.37a3.355 3.355 0 0 0-3.37-3.368a3.342 3.342 0 0 0-3.368 3.369a3.329 3.329 0 0 0 3.369 3.369m19.464 0a3.342 3.342 0 0 0 3.368-3.37a3.355 3.355 0 0 0-3.368-3.368c-1.893 0-3.41 1.497-3.41 3.369c0 1.892 1.517 3.369 3.41 3.369"></path>
                        </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                        My Cart
                    </span>
                </button>
            }
            {
                user.type === 'user' &&
                <button  
                onClick={()=>setShowOnDashboard('confirmedOrder')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'confirmedOrder' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path>
                        </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                        Confirmed Order
                    </span>
                </button>
            }
            {
                user.type === 'user' &&
                <button  
                onClick={()=>setShowOnDashboard('myAdoptionPost')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'myAdoptionPost' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M9.354 7.104a.5.5 0 0 0-.708-.708L7.234 7.808l-.397-.362a.5.5 0 0 0-.674.738l.75.685a.5.5 0 0 0 .69-.016zm0 4.292a.5.5 0 0 1 0 .708l-1.75 1.75a.5.5 0 0 1-.691.015l-.75-.685a.5.5 0 0 1 .674-.738l.397.363l1.412-1.413a.5.5 0 0 1 .708 0M11 12a.5.5 0 0 0 0 1h1.67c-.11-.313-.17-.65-.17-1zm-5 4h5.05q-.05.243-.05.5q0 .25.038.5H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3.401a3 3 0 0 0-1-.36V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2m4.5-8.5A.5.5 0 0 1 11 7h2.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.5-.5m7 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S12 17.75 12 16.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5"></path>
                    </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                        My Adoption Posts
                    </span>
                </button>
            }
            {
                user.type === 'user' &&
                <button  
                onClick={()=>setShowOnDashboard('createAdoptionPost')}
                className={`border-l-4 border-transparent hover:border-custom-violet-light hover:bg-custom-violet-light/10 text-start hover:text-custom-violet p-2 flex items-center gap-1 select-none duration-150 ${showOnDashboard == 'createAdoptionPost' && 'text-custom-violet  border-custom-violet-light bg-custom-violet-light/10' }`} >
                    <span className='text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
                        </svg>
                    </span>
                    <span className='hidden md:inline-block'>
                        Create Post
                    </span>
                </button>
            } 
            
          
        </div>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-2'>
            <button 
            onClick={()=>setShowOnDashboard('settings')}
            className={`text-start p-2 border-l-4 border-transparent hover:text-orange-500 hover:border-orange-400 hover:bg-orange-400/10 flex gap-1 items-center ${showOnDashboard == 'settings' && 'text-orange-500 border-orange-400 bg-orange-400/10' }`}>
                <span className='text-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	                    <path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"></path>
                    </svg>
                </span>
                <span className='hidden md:inline-block'>Settings</span>
            </button>
            <button onClick={handleLogout} className='text-start p-2 border-l-4 border-transparent hover:text-red-500 hover:border-red-400 hover:bg-red-400/10 flex items-center gap-1'>
                <span className='text-xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	                    <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"></path>
                    </svg>
                </span>
                <span className='hidden md:inline-block'> Logout </span>
            </button>
        </div>
    </div>
  )
}

export default UserLeftSideBar
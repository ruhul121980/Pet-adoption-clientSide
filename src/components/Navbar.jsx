'use client'
import React, {  useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserContext } from './context/UserContext';
import { setUserData } from '@/utils/handleUserData';

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = ()=> setShowNav(!showNav)
  
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
    <nav className="bg-white/50 backdrop-blur-lg shadow z-[99999999] text-secondary-color px-4 py-2 lg:px-5 lg:py-3 flex flex-col lg:flex-row items-start gap-10 lg:items-center justify-between">
      <div className='flex w-[100%] lg:w-auto justify-between items-center z-[10000]'>
        <Link href="/" className="font-bold text-2xl text-black flex items-center">
          <span>
            <Image  width={60} height={40} src={"/logo.svg"} alt='branding logo'/>
          </span>
          <span className=' text-custom-violet'>
            Petworld 
          </span>
        </Link>
        <button onClick={handleShowNav} className=' lg:hidden'>
          { 
            showNav? 
            <span className=' text-red-500 text-xl '>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M12.854 2.854a.5.5 0 0 0-.708-.708L7.5 6.793L2.854 2.146a.5.5 0 1 0-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 0 0 .708.708L7.5 8.207l4.646 4.647a.5.5 0 0 0 .708-.708L8.207 7.5z" clipRule="evenodd"></path></svg>
            </span>
              :
              <span className=' text-2xl '>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"></path></svg>
            </span>
         }
        </button>
      </div>
      <ul onClick={handleShowNav} className={` ${showNav? " flex flex-col h-[90vh] gap-6": "  hidden "} z-[10000] lg:h-auto lg:gap-0 lg:flex lg:flex-row items-center font-medium`}>
        <li >
          <Link href="/adoption"  className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
            <span className='text-2xl'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1c0-1-.5-2.2-1.5-2.2c-1.3 0-2.1 1.9-2.1 3.1c0 1 .5 2.2 1.5 2.2m-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3C6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2m7.4-1c-1.3 0-2.2 1.8-2.2 3.1c0 .9.4 1.8 1.3 1.8c1.3 0 2.2-1.8 2.2-3.1c0-.9-.5-1.8-1.3-1.8m-8.7 3.1c0-1.3-1-3.1-2.2-3.1c-.9 0-1.3.9-1.3 1.8c0 1.3 1 3.1 2.2 3.1c.9 0 1.3-.9 1.3-1.8m3.2-.2c-2 0-4.7 3.2-4.7 5.4c0 1 .7 1.3 1.5 1.3c1.2 0 2.1-.8 3.2-.8c1 0 1.9.8 3 .8c.8 0 1.7-.2 1.7-1.3c0-2.2-2.7-5.4-4.7-5.4"></path></svg>
            </span>
            <span>
              Find Adoptions 
            </span>
          </Link>
        </li>
        <li>
          <Link href="/veterinarian" className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
            <span className='text-2xl'>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M27 12v2h1v4a3 3 0 0 1-6 0v-4h1v-2h-3v6a5.01 5.01 0 0 0 4 4.899V24a4 4 0 0 1-8 0v-2.184a3 3 0 1 0-2 0V24a6 6 0 0 0 12 0v-1.101A5.01 5.01 0 0 0 30 18v-6Zm-12 6a1 1 0 1 1-1 1a1 1 0 0 1 1-1"></path><path fill="currentColor" d="M26 4h-4V2h-2v2h-8V2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h4v-2H6V6h4v2h2V6h8v2h2V6h4v4h2V6a2 2 0 0 0-2-2"></path></svg>
            </span>
            <span>
              Veterinarians 
            </span>
          </Link>
        </li>
        <li>
          <Link href="/shop"className='hover:text-black px-3 py-2 flex items-center  gap-1 transition-all ease-in duration-100 '>
            <span className='text-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path></svg>
            </span>
            <span>
            PET Accessories
            </span>
          </Link>
        </li>
        {
          userContext.user.login ?  
          <li>
            <Link href="/dashboard"  className='hover:text-black px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
            <span className="text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56">
                <path fill="currentColor" d="M28.012 28.023c5.578 0 10.125-4.968 10.125-11.015c0-6-4.5-10.711-10.125-10.711c-5.555 0-10.125 4.805-10.125 10.758c.023 6.023 4.57 10.968 10.125 10.968m0-3.539c-3.422 0-6.352-3.28-6.352-7.43c0-4.077 2.883-7.218 6.352-7.218c3.515 0 6.351 3.094 6.351 7.172c0 4.148-2.883 7.476-6.351 7.476m-14.719 25.22h29.438c3.89 0 5.742-1.173 5.742-3.75c0-6.142-7.735-15.024-20.461-15.024c-12.727 0-20.485 8.883-20.485 15.023c0 2.578 1.852 3.75 5.766 3.75m-1.125-3.54c-.61 0-.867-.164-.867-.656c0-3.844 5.953-11.04 16.71-11.04c10.759 0 16.688 7.196 16.688 11.04c0 .492-.234.656-.843.656Z"></path>
              </svg>            
            </span>
            <span>
              {user.email } 
            </span>
          </Link>
          </li>
          :
          <li>
            <Link href="/login"  className='hover:text-black px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.518q-.213 0-.356-.143T4.019 12t.144-.357t.356-.143h8.368l-1.968-1.971q-.14-.14-.15-.338q-.009-.199.15-.364t.352-.168t.358.162l2.613 2.613q.243.243.243.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z"></path></svg>
              </span>
              <span>
                Log in/Register  
              </span>
            </Link>
          </li>

        }
        {
          userContext.user.login ?
          <li>
            <button onClick={handleLogout} className='hover:text-black px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100 '>
              <span className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 20q-.213 0-.356-.143t-.143-.357t.143-.357t.357-.143h5.904q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-5.903q-.214 0-.357-.143t-.143-.357t.143-.357t.357-.143h5.904q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm.407-7.5H4.518q-.213 0-.356-.143T4.019 12t.144-.357t.356-.143h8.368l-1.968-1.971q-.14-.14-.15-.338q-.009-.199.15-.364t.352-.168t.358.162l2.613 2.613q.243.243.243.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.367-.159q-.16-.165-.156-.357q.003-.191.162-.35z"></path></svg>
              </span>
              <span>
                Logout
              </span>
            </button>
          </li> 
          :
          <li>
            <Link href="/login"  className='px-3 py-2 flex items-center gap-1 transition-all ease-in duration-100  hover:bg-custom-violet-light bg-custom-violet rounded  text-white shadow'>
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path></svg>
              </span>
              <span>
                Post Adoption 
              </span>
            </Link>
          </li>
        
        }
      </ul>
    </nav>
  );
}

export default Navbar;

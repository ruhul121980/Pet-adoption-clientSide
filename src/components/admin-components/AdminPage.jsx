'use client'
import React, { useEffect, useState } from 'react' 
import AdminLeftSideBar from './AdminLeftSideBar';
import AdminUserView from './AdminUserView';
import AdminVetView from './AdminVetView';
import AdminAddProduct from './AdminAddProduct';
import AdminViewProducts from './AdminViewProducts';
import { useUserContext } from '../context/UserContext';
import { getAdminData, handleAdminLogin, setAdminData } from '@/utils/handleAdminData';
import { isValidEmail } from '@/utils/emailValidChecker';
import AdminViewOrder from './AdminViewOrder';

const AdminPage = () => { 
    const userContext = useUserContext();
    const [showLogin, setshowLogin] = useState(true)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'email') {
        if(isValidEmail(value)){
            setEmail(value);
            setErrorEmail('')
        }else{
            setErrorEmail('Invalid Email Address!')
            setEmail(value);
        }
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const handleSubmit = async (event) => {
     if(email.length > 2 | password.length >2 ){
        let loginObj = {
          email,
          password
        }
        
        const loginServerData = await handleAdminLogin(loginObj)

        if (loginServerData.status == 200) {
          setErrorMessage('');
          let userData = {...loginServerData.data , login:true }
          //set item to localstorage 
          setAdminData(userData)
          userContext.setAdmin(userData)
          setshowLogin(false) 
        } else {
          setErrorMessage(loginServerData.message);
        }

      }
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    useEffect(() => {
        let foundAdmin = getAdminData()
        if (foundAdmin ?.login) {
            setshowLogin(false)
            userContext.setAdmin(foundAdmin)
            
        }
        if(userContext.admin.login){
            setshowLogin(false)
        }
      }, [])
    let showData = [
        {
            title: 'View Users',
            value: 'AdminUserView',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"></path>
                </svg>`,
        } ,
        {
            title: 'View Vets',
            value: 'AdminVetView',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128M104 424c0 13.3 10.7 24 24 24s24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24m216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3.9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9c-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8"></path>
                </svg>`,
        } , 
        {
            title: 'Add New Product',
            value: 'AdminAddProduct',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
                </svg>`,
        } , 
        {
            title: 'View Products',
            value: 'AdminViewProducts',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2M1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1m16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2"></path>
                </svg>`,
        } ,  
        {
            title: 'View Orders',
            value: 'AdminViewOrder',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17.371 18.587l-.655-.656q-.13-.129-.307-.129q-.178 0-.307.129q-.129.128-.129.303t.129.304l.86.86q.186.187.419.187t.419-.187l2.098-2.067q.129-.129.139-.297q.01-.169-.139-.317q-.129-.129-.316-.129t-.317.13zm-.64-9.856q.213 0 .356-.143t.144-.357t-.144-.357t-.356-.143H7.269q-.213 0-.357.143t-.143.357t.143.357t.357.143zM18 22.116q-1.671 0-2.835-1.165Q14 19.787 14 18.116t1.165-2.836T18 14.116t2.836 1.164T22 18.116q0 1.67-1.164 2.835Q19.67 22.116 18 22.116M4 20.72V5.616q0-.672.472-1.144T5.616 4h12.769q.67 0 1.143.472q.472.472.472 1.144v5.115q0 .31-.254.505t-.563.127q-.777-.136-1.55-.105q-.774.03-1.537.242H7.27q-.213 0-.357.143T6.77 12t.143.357t.357.143h6.812q-.752.521-1.326 1.223t-.946 1.546H7.27q-.213 0-.357.143t-.143.357t.143.357t.357.143h4.21q-.108.404-.168.815t-.061.858q0 .477.077.958q.077.48.2.952q.067.179-.09.293q-.158.114-.3.01l-.249-.17q-.111-.074-.234-.074t-.235.073l-.877.608q-.111.073-.234.073t-.235-.073l-.877-.608q-.112-.073-.235-.073t-.234.073l-.877.608q-.111.074-.234.074t-.235-.074l-.877-.607q-.112-.073-.235-.073t-.234.073l-.781.607q-.058.039-.254.13"></path></svg>`,
        } ,  
    ]
    const [show, setShow] = useState('AdminUserView')
    if (showLogin) {
        return (
            <div className="w-full bg-gray-500   md:shadow flex items-center justify-center h-[90vh] p-5 ">
                <div className='flex flex-col gap-3 rounded backdrop-blur bg-white/30'>
                    <h2 className='font-semibold  p-5 py-10 pb-0  text-3xl md:text-4xl lg:text-5xl'>Admin Login</h2>
                    <div className="w-full  p-5  ">  
                        <div className="input-field flex flex-col gap-1">
                            <label htmlFor="email" className='font-semibold text-lg text-black/50'>Email:</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder='example@gmail.com'
                            onChange={handleChange}
                            className=' border-2 border-custom-violet rounded p-3'
                            />
                        </div>
                        {errorEmail && <p className="text-red-500 text-xs py-2">{errorEmail}</p>}
                        <div className="input-field flex flex-col gap-1 py-3">
                            <label htmlFor="password" className='font-semibold text-lg text-black/50'>Password:</label>
                            <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            placeholder='password'
                            onChange={handleChange}
                            className=' border-2 border-custom-violet rounded p-3'
                            />
                            <button type="button" className='text-xs text-start flex gap-2 items-center py-2' onClick={toggleShowPassword}>
                                <span className='text-base'>
                                    {showPassword ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"></path>
                                        </svg>
                                        : 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path>
                                        </svg>
                                    } 
                                </span>
                                <span>
                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                </span>
                            </button>
                        </div>
                        <button 
                        onClick={()=>{handleSubmit();}} 
                        className=' px-8 py-3 bg-custom-violet-light/90 hover:bg-custom-violet-light duration-200 rounded-lg w-full font-bold text-white'
                        >Admin Login</button>
                        {errorMessage && <p className="text-red-500 text-xs py-2">{errorMessage}</p>}
                            
                    </div>
                </div>
                
            </div>
        )
    } else {
        return (
            <main className='flex flex-row bg-gray-100'>
                <AdminLeftSideBar 
                    setAdmin={userContext.setAdmin}
                    setshowLogin={setshowLogin} 
                    show={show} setShow={setShow} 
                    showData={showData} 
                />
                <div className='p-5 w-full'>
                    {
                        show == 'AdminUserView' &&
                        <AdminUserView/>
                    }
                    {
                        show == 'AdminVetView' &&
                        <AdminVetView/>
                    }
                    {
                        show == 'AdminAddProduct' &&
                        <AdminAddProduct setShow={setShow}/>
                    }
                    {
                        show == 'AdminViewProducts' &&
                        <AdminViewProducts/>
                    }
                    {
                        show == 'AdminViewOrder' &&
                        <AdminViewOrder/>
                    }
                </div>
            </main>
        )
    }
}

export default AdminPage
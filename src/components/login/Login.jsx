'use client'
import { isValidEmail } from '@/utils/emailValidChecker';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState('user') // user / veterinarian

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
      event.preventDefault(); // Prevent default form submission behavior
  
      // Implement  actual authentication logic here (e.g., API call)
      
      let loginObj = {
        email,
        password
      }
      if (loginType == 'user') {
        loginObj.type = 'user'
      } else {
        loginObj.type = 'veterinarian'
      }
      
      console.log(loginObj)
      // Auth function 
      const isAuthenticated = email === 'test@gmail.com' && password === '123456';

      if (isAuthenticated) {
        setErrorMessage('');
        router.push('/dashboard'); // Redirect to dashboard on successful login
      } else {
        setErrorMessage('Invalid email or password!');
      }
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
  return (
    <div className="w-full lg:w-[85%] md:shadow grid grid-cols-1 lg:grid-cols-2 p-5 ">
        <div className='order-2 md:order-1'>
            <h2 className='font-semibold  p-5 pb-0  text-3xl md:text-4xl lg:text-5xl'>Login</h2>
            <div className="w-full lg:w-2/3 p-5"> 
                <div className="grid grid-cols-2 gap-1 border bg-custom-violet-light/10 p-1 rounded">
                     <button 
                     onClick={()=>{setLoginType('user');}} 
                     className={`p-2  rounded ${loginType == 'user'? ' bg-custom-violet-light/50':'hover:bg-custom-violet-light/40'}`}>User</button>
                     <button 
                     onClick={()=>setLoginType('veterinarian')} 
                     className={`p-2 rounded ${loginType == 'veterinarian'? ' bg-custom-violet-light/50':'hover:bg-custom-violet-light/40'}`}>Veterinarian</button>
                </div>
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
                onClick={handleSubmit} 
                className=' px-8 py-3 bg-custom-violet-light/90 hover:bg-custom-violet-light duration-200 rounded-lg w-full font-bold text-white'
                >Login</button>
                {errorMessage && <p className="text-red-500 text-xs py-2">{errorMessage}</p>}
                <p className='font-light text-sm py-3'>
                    Create New Account 
                    <span>
                        <Link 
                        href={'/register'} 
                        className=' underline underline-offset-2 pl-1 font-medium hover:text-custom-violet'
                        >
                            Register Here
                        </Link>
                    </span>
                </p>
            </div>
        </div>
        <div className=' order-1 md:order-2 flex items-center justify-center'>
            <img className='w-[90%] md:w-2/3' src="./login.png" alt="" />
        </div>
    </div>
  )
}

export default Login
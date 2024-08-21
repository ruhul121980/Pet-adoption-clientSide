'use client'
import React, { useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation'; 
import { setUserData } from '@/utils/handleUserData';
import { handleUpdateProfile } from '@/utils/handleUpdateProfile';

const UserSettings = () => {
  const router = useRouter();
  const userContext = useUserContext()
  const {user} = userContext

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber); 
  const [license, setLicense] = useState(user.license); 

  const [errorLicense, setErrorLicense] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
   
  const [registerType, setRegisterType] = useState('user') // user / veterinarian
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'firstName') {
      setFirstName(value);
    } 
    else if (name === 'lastName') {
      setLastName(value);
    } 
    else if (name === 'phoneNumber') {
      
      if(value.length != 11 ){
        setErrorPhone("Enter 11 Digit Phone Number")
      }else{
        setErrorPhone('')
      }
      setPhoneNumber(value);
    } 
    else if (name === 'address') {
      setAddress(value);
    } 
    else if (name === 'license') {
      if(value.length < 6 ){
        setErrorLicense("License Must have 6 Character")
      }else{
        setErrorLicense('')
      }
      setLicense(value);
    } 
      
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
      
    if(registerType == 'veterinarian' && license.length < 3){
      setErrorLicense('Give Valid License ')
      return ;
    }
    if(phoneNumber.length != 11){
      setErrorPhone("Invalid Mobile Number")
      return;
    }
    if(registerType == 'veterinarian' && license.length < 6){
      setErrorLicense("Invalid License Number")
      return;
    }
    let obj ={
      firstName,lastName,phoneNumber,address
    }
    if(user.type == 'veterinarian'){
      obj.license = license
    }
    let updateUser = await handleUpdateProfile(obj,user.type,email)
  
    if (updateUser.status == 200) {
      setErrorMessage('');
      let userData = {...updateUser.data , login:true,pwd:''}
      console.log(' updated ',userData)
      setUserData(userData)
      userContext.setUser(userData)
      // router.push('/dashboard');  
    } else {
      setErrorMessage(updateUser.message);
    }
    
  };
    const valueboxStyle = "p-2 bg-violet-300/30 rounded-lg"
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full ">
      <div className="p-5 flex flex-col gap-2">
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="firstName" className='  text-black/50'>First Name:</label>
              <p className={valueboxStyle}>{firstName}</p>
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="lastName" className='  text-black/50'>Last Name:</label>
               <p className={valueboxStyle} >{lastName}</p>
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="address" className='  text-black/50'>Address:</label>
              <p className={valueboxStyle} >{address}</p>
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="phoneNumber" className='  text-black/50'>Mobile:</label>
              <p className={valueboxStyle} >{phoneNumber}</p>
          </div> 
          {
            user.type == 'veterinarian' &&
            <div className="input-field flex flex-col gap-1">
                <label htmlFor="license" className='  text-black/50'>License Number:</label>
                 <p className={valueboxStyle} >{license}</p>
            </div>
            
          }
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="phoneNumber" className='  text-black/50'>Email:</label>
              <p className={valueboxStyle} >{email}</p>
          </div> 
      </div>
      <form onSubmit={handleSubmit} className="w-[400px] p-5 flex flex-col gap-1"> 
          
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="firstName" className='font-semibold text-lg text-black/50'>First Name:</label>
              <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder='First Name'
              onChange={handleChange}
              className=' border-2 border-custom-violet rounded p-3'
              required
              />
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="lastName" className='font-semibold text-lg text-black/50'>Last Name:</label>
              <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder='Last Name'
              onChange={handleChange}
              className=' border-2 border-custom-violet rounded p-3'
              required
              />
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="address" className='font-semibold text-lg text-black/50'>Address:</label>
              <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder='St 04, Post Code , Country'
              onChange={handleChange}
              className=' border-2 border-custom-violet rounded p-3'
              
              />
          </div>
          <div className="input-field flex flex-col gap-1">
              <label htmlFor="phoneNumber" className='font-semibold text-lg text-black/50'>Mobile:</label>
              <input
              type="tel" 
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder='01*********'
              onChange={handleChange}
              className=' border-2 border-custom-violet rounded p-3'
              required
              />
          </div>
          {errorPhone && <p className="text-red-500 text-xs py-2">{errorPhone}</p>}
          {
            user.type == 'veterinarian' &&
            <div className="input-field flex flex-col gap-1">
                <label htmlFor="license" className='font-semibold text-lg text-black/50'>License Number:</label>
                <input
                type="text"
                id="license"
                name="license"
                value={license}
                placeholder='s1df**********'
                onChange={handleChange}
                className=' border-2 border-custom-violet rounded p-3'

                />
            </div>
            
          }
          {errorLicense && <p className="text-red-500 text-xs py-2">{errorLicense}</p>}
          
          <button 
          
          className=' px-8 py-3 bg-custom-violet-light/90 hover:bg-custom-violet-light duration-200 rounded-lg w-full font-bold text-white'
          >Update</button>
          {errorMessage && <p key={'errormessage'} className="text-red-500 text-xs py-2">{errorMessage}</p>}
           
      </form>
    </div>
  )
}

export default UserSettings
import './customImgInput.css'
import React, { useState } from 'react'
import { getFormattedDate } from '@/utils/getDate';
import { useUserContext } from '../context/UserContext';
import { handleAdoptPost } from '@/utils/handleAdoptPost';
import { uploadImages } from '@/utils/handleUploadImages';
import { setUserData } from '@/utils/handleUserData';


const UserCreatePost = ({setShowOnDashboard}) => {
  const userContext = useUserContext();
  
  const [formData, setFormData] = useState({
    banned:false,
    adopted:false,
    petNickname: '',
    location: '',
    age: 'less Than 1 Month',
    gender: 'male',
    size: 'regular',
    vaccinated: 'no',
    spayed: 'no',
    category: '',
    img: ' http://localhost:4000/uploads/889c4f84-8eee-48f3-a257-9f872ce5a390.png',
    images: [],
    postDate: getFormattedDate()
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange =  (event) => {
    const { name, value, type } = event.target;
    console.log(name, " type is ", type)
    if (type === 'file') {
      
      const files = [...event.target.files]; // Get all selected files

    const validImages = files.filter((file) => {
      const fileType = file.type;
      return fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg';
    });

    const imageDataPromises = validImages.map((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image); // Read image as data URL

      return new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target.result); // Resolve with base64 string
        reader.onerror = (error) => reject(error); // Handle errors
      });
    });

    Promise.all(imageDataPromises)
      .then((base64Images) => {
        setSelectedImages([...selectedImages, ...base64Images]); // Update state
      })
      .catch((error) => {
        console.error('Error reading image files:', error);
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage =  (index) => {
    let newList = selectedImages.filter((i,indx )=> indx !== index)
    setSelectedImages(newList)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const images = selectedImages
    // console.log("got Images ", images) 
    const imgURLs = await uploadImages(images)
    console.log("Found Urls ", imgURLs)

    const formDataToSend = {...formData}
    formDataToSend.images = imgURLs
    formDataToSend.img = imgURLs[0]

    // console.log('Form Data:', formDataToSend );  
    const {email,_id,password,type,posts} = userContext.user 
    const updateUserData = { email,_id,password,type,posts}
    updateUserData.posts.unshift(formDataToSend) 
    // console.log(updateUserData)
    const serverResponse = await handleAdoptPost(updateUserData)
    
    if(serverResponse.status ==200){
      setUserData({...userContext.user, ...serverResponse.data})
      setShowOnDashboard('myAdoptionPost')
    }
    
    setFormData({
      adopted:false,
      banned:false,
      petNickname: '',
      location: '',
      age: 'less Than 1 Month',
      gender: 'male',
      size: 'regular',
      vaccinated: 'no',
      spayed: 'no',
      category: '',
      img: ' http://localhost:4000/uploads/889c4f84-8eee-48f3-a257-9f872ce5a390.png',
      images: [],
      postDate: getFormattedDate()
    }); 
    setSelectedImages([]);
  };
  return (
    <>
    <h2 className='text-xl md:text-3xl p-3'>Create New Adoption Post</h2>
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
    
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
        <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
          <label htmlFor="petNickname" className='font-semibold'>Pet Nickname:</label>
          <input
            type="text"
            id="petNickname"
            name="petNickname"
            value={formData.petNickname}
            onChange={handleChange}
            required
            className='p-2 bg-gray-500/10 '
            placeholder='Pet Nickname'
          />
        </div>
        <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
          <label htmlFor="category" className='font-semibold'>Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className='p-2 bg-gray-500/10 '
            placeholder='St no, post code, Address'
          />
        </div>
        <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
          <label htmlFor="location" className='font-semibold'>Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className='p-2 bg-gray-500/10 '
            placeholder='St no, post code, Address'
          />
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="age" className='font-semibold'>Age:</label>
          <select 
          id="age" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          required
          className='p-2 border-none rounded'
          
          > 
            <option value="less Than 1 Month">Less than 1 month</option>
            <option value="1-3 Months">1-3 Months</option>
            <option value="3-6 Months">3-6 Months</option>
            <option value="6-10 Months">6-10 Months</option>
            <option value="10 Months Plus">10 Months+</option>
          </select>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="male" className='font-semibold'>gender:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={formData.gender === 'male'}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={formData.gender === 'female'}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="size" className='font-semibold' >Size:</label>
          <select 
          id="size" 
          name="size" 
          value={formData.size} 
          onChange={handleChange} 
          required
          className='p-2 border-none'
          >
            <option value="">Select Size</option>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="regular">Regular</option>
            <option value="big">Big</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="vaccinated" className='font-semibold'>Vaccinated:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="vaccinated"
              name="vaccinated"
              value="yes"
              onChange={handleChange}
              checked={formData.vaccinated === 'yes'}
            />
            <label htmlFor="vaccinated">Yes</label>
            <input
              type="radio"
              id="notVaccinated"
              name="vaccinated"
              value="no"
              onChange={handleChange}
              checked={formData.vaccinated === 'no'}
            />
            <label htmlFor="notVaccinated">No</label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="spayed" className='font-semibold'>Spayed/Neutered:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="spayed"
              name="spayed"
              value="yes"
              onChange={handleChange}
              checked={formData.spayed === 'yes'}
            />
            <label htmlFor="spayed">Yes</label>
            <input
              type="radio"
              id="notSpayed"
              name="spayed"
              value="no"
              onChange={handleChange}
              checked={formData.spayed === 'no'}
            />
            <label htmlFor="notSpayed">No</label>
          </div>
        </div>
         <div className='w-full'>
          {/* <ImageUploadComponent handleChange={handleChange} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/> */}
          <div className='flex flex-col gap-5 '> 
        <div className='w-full grid grid-cols-4 gap-5'>
            <div className="custom-file-upload w-full h-full aspect-[4/3] ">
                <label htmlFor="images" className=' w-full h-[100%]   cursor-pointer'>
                <div className='w-full border h-full flex flex-col items-center justify-center rounded shadow hover:shadow-md duration-100 hover:text-custom-violet-light'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"></path>
                        </svg>
                    </span>
                    Upload
                </div>
                <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={(e)=>handleChange(e)}
                /> 
                </label>
            </div>
        {selectedImages.length > 0 && (
            <>
            {
                selectedImages.map((image, index) => (
                    <div key={index} className='relative rounded'> 
                        <img  src={image} alt={`Selected ${index + 1}`} className='rounded' />
                        <button onClick={()=>removeImage(index)} className='bg-red-200 text-red-500 rounded-full hover:bg-red-500 hover:text-white duration-200 font-bold absolute top-1 right-2 p-2'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                                    <path fill="currentColor" fillRule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                ))
            }
            </>
        )}
        </div> 
    </div> 
        </div>
        
        <button type="submit" 
        className='bg-blue-500/80 hover:bg-blue-500 text-white px-5 py-2 rounded-lg w-full md:w-2/3 font-bold duration-200'>Post Adoption</button>
      </form>
      <div className='p-2'> 
        <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
          <div className='relative z-[-100] '>
            <img className='w-full z-0' src={selectedImages.length? selectedImages[0] : formData.img} alt={formData.petNickname} />
            <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
              <p>{formData.category}</p>
              <p>{formData.postDate}</p>
            </div>
            <div className=' absolute bottom-0 left-0 right-0 w-full bg-custom-violet/80 flex justify-between items-center p-2 text-xs text-white'>
              <p className='text-sm'>{formData.petNickname}</p>
            </div>
          </div>
          <div className='p-2'>
            <div className='flex  items-center gap-2'>
              <span className='text-red-500 text-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
              </span>
              <span className=' font-light capitalize'>{formData.location}</span>
            </div>
            <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
              <p className='flex gap-1'>
                <span className=' font-semibold'>Size:</span>
                <span>{formData.size}</span>
              </p>
              <p className='flex gap-1'>
                <span className=' font-semibold'>Age:</span>
                <span>{formData.age}</span>
              </p>
              <p className='flex gap-1'>
                <span className=' font-semibold'>Vaccinated:</span>
                <span>{formData.vaccinated}</span>
              </p>
              <p className='flex gap-1'>
                <span className=' font-semibold'>Gender:</span>
                <span>{formData.gender}</span>
              </p>
              <p className='flex gap-1'>
                <span className=' font-semibold'>Spayed:</span>
                <span>{formData.spayed}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  )
}

export default UserCreatePost
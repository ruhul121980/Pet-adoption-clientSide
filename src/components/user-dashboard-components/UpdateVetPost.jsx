import { getFormattedDate } from '@/utils/getDate';
import React, { useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { handleVetPost } from '@/utils/handleVetPost';
import { uploadImages } from '@/utils/handleUploadImages';

const UpdateVetPost = ({openUpdate,vetPosts,setOpenUpdate}) => {
  const userContext = useUserContext()
    let vetpost = vetPosts[openUpdate-1]
    console.log(" got ", vetPosts)
    console.log(" post ", vetpost)
    const [formData, setFormData] = useState({ 
      id: vetpost.id,
      vetId: vetpost.vetId,
      vetName: vetpost.vetName,
      banned:vetpost.banned,
      img: vetpost.img,
      images: vetpost.images,
      postDate: getFormattedDate(),
      category: vetpost.category,
      serviceTitle: vetpost.serviceTitle,
      serviceDescription: vetpost.serviceDescription,
      location: vetpost.location,
      fee: vetpost.fee,
      meeting: vetpost.meeting,
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorImages, setErrorImages] = useState('');
  
    const handleChange =  (event) => {
      const { name, value, type } = event.target; 
      if (type === 'file') {
      setErrorImages('')
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
        if (name === 'fee') {
          if (value > 0 ) {
            if ( value < 5001) {
              setFormData({ ...formData, [name]: value });
            } else {
              setFormData({ ...formData, fee: '5000' });              
            }
          } else {
            setFormData({ ...formData, fee: '' });
          }
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    };
  
    const removeImage =  (index) => {
      let newList = selectedImages.filter((i,indx )=> indx !== index)
      setSelectedImages(newList)
    }

    // setOpenUpdate
    const handleUpdateVetPost = async (event)=>{
      event.preventDefault();
      // confirm("Confirm Update")
      // console.log(formData)
      const formDataToSend = {...formData}

      let images,imgURLs
      if( selectedImages.length != 0){
        images = selectedImages
        // console.log("got Images ", images) 
        imgURLs = await uploadImages(images)
        formDataToSend.images = imgURLs
        formDataToSend.img = imgURLs[0]
      }else{
        formDataToSend.img = vetpost.img
        formDataToSend.images = vetpost.images
      } 
  
      const {email,_id,password,type} = userContext.user 

      vetPosts[openUpdate-1] = formDataToSend
      
      const updateUserData = { email,_id,password,type,vet_posts:vetPosts}
      
      const serverResponse = await handleVetPost(updateUserData)
        
        if(serverResponse.status ==200){ 
          setOpenUpdate(-1)
        }
    }
  return (
    <div>
        UpdateVetPost {openUpdate}
        <div className='w-full '>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
            <form onSubmit={handleUpdateVetPost} className='grid grid-cols-1 gap-2'>
              <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
                <label htmlFor="serviceTitle" className='font-semibold'>Service Title:</label>
                <input
                  type="text"
                  id="serviceTitle"
                  name="serviceTitle"
                  value={formData.serviceTitle}
                  onChange={handleChange}
                  required
                  className='p-2 bg-gray-500/10 '
                  placeholder='Service Title'
                />
              </div>
              <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
                <label htmlFor="fee" className='font-semibold'>Service Fee:<span className="text-sm font-normal text-black/40">(10-5000 per hour)</span></label>
                <input 
                type="number" 
                name="fee" 
                id="fee" 
                value={formData.fee}
                onChange={handleChange}
                required
                className='p-2 bg-gray-500/10 '
                placeholder='10-5000'
                min='10'
                max='5000'
                />
              </div>
              <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
                <label htmlFor="serviceTitle" className='font-semibold'>Service Description:</label>
                 
                <textarea 
                  name="serviceDescription" 
                  id="serviceDescription" 
                  cols="30" rows="10"
                  value={formData.serviceDescription}
                  onChange={handleChange}
                  required
                  className='p-2 bg-gray-500/10 '
                  placeholder='Service Description'
                >
                </textarea>
              </div>
              <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
                <label htmlFor="category" className='font-semibold'>Pet Category:</label>
                <select 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
                className='p-2 border-none rounded'
                > 
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                  <option value="Other">Other</option>
                  <option value="All">All</option>
                </select>
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
                
              <div className='w-full'>
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
              {errorImages && <p className='text-xs font-semibold text-red-500'>{errorImages}</p>}
              
              <div className=' space-x-5'>
                <button type="submit"   className='py-3 px-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold'>Update Vet Post </button>
                <button onClick={()=>setOpenUpdate(-1)} className='py-3 px-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold'>Cancel </button>
              </div>
            </form>
            <div className='p-2'> 
              <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                <div className='relative z-[-100] w-[400px] h-[400px] overflow-hidden bg-slate-300/30 '>
                  <img className='w-full z-0' src={selectedImages.length? selectedImages[0] : formData.img} alt={formData.petNickname} />
                  <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                    <p>{formData.category}</p>
                    <p>{formData.postDate}</p>
                  </div> 
                </div>
                <div className='p-2'>
                  <div className='flex justify-between items-center'>
                    <div className='flex  items-center gap-2'>
                      <span className='text-red-500 text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                      </span>
                      <span className=' font-light capitalize'>{formData.location}</span>
                    </div >
                    <div className='flex  items-center gap-2'>
                      <span className='text-green-500 text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                          <g fill="currentColor">
                            <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0a5 5 0 0 1 10 0"></path>
                            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207c0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158c0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522c0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569c0 .339-.257.571-.709.614v-1.195z"></path>
                            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"></path>
                            <path d="M9.998 5.083L10 5a2 2 0 1 0-3.132 1.65a6 6 0 0 1 3.13-1.567"></path>
                          </g>
                        </svg>
                      </span>
                      <span className=' font-light capitalize'>{formData.fee}</span>
                    </div >
                  </div>
                  <div className='  w-full   flex flex-col justify-between  text-xs  '>
                    <p className='text-base capitalize  p-2'>{formData.serviceTitle}</p>
                    <div className='flex  items-center gap-2'>
                      <span className='text-sky-500 text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                          <path fill="currentColor" d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.41 4.41 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.41 4.41 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path>
                        </svg>
                      </span>
                      <span className=' font-light capitalize'>{formData.vetName}</span>
                    </div >
                    <p className='text-sm text-justify text-black/80  p-2'>{formData.serviceDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default UpdateVetPost
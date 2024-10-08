import React,{ useEffect, useState }  from 'react'
import { useUserContext } from '../context/UserContext' 
import { getFormattedDate } from '@/utils/getDate';
import { uploadImages } from '@/utils/handleUploadImages';
import { handleVetPost } from '@/utils/handleVetPost';
import { setUserData } from '@/utils/handleUserData';
import { generateUniqueID } from '@/utils/UniqueIDGenerator';
import { getAllVetPosts } from '@/utils/getAllVetPosts'; 
import { handleCheckLicense } from '@/utils/handleLicense';

const VetCreateService = ({setShowOnDashboard}) => { 
    const [licenseActive, setLicenseActive] = useState(false)
    const userContext = useUserContext()
    const {_id,firstName,lastName,banned,email} = userContext.user
    //check license
    const checkLicenseStatus = async ()=>{
      const res = await handleCheckLicense(email);
      if(res.status == 200){
        setLicenseActive(res.data)
      }
    }
    useEffect(()=>{
      checkLicenseStatus()
    },[])

    const [formData, setFormData] = useState({ 
      id: generateUniqueID(),
      vetId: _id,
      vetName: firstName+' '+lastName,
      banned:false,
      img: './veterinarian/dctr-3.png',
      images: [],
      postDate: getFormattedDate(),
      category: 'Dog',
      serviceTitle: '',
      serviceDescription:'',
      location: '',
      fee: '100',
      meeting: [
        // {
        //   userID: '',
        //   transactionID: '',
        //   meetingLink: '',
        //   paid: '',
        //   meetingTime: '',

        // }
      ],
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if( selectedImages.length == 0){
        setErrorImages("No Image Uploaded !")
        return;
      }
      const images = selectedImages
      // console.log("got Images ", images) 
      const imgURLs = await uploadImages(images)
      console.log("Found Urls ", imgURLs)
    
      const formDataToSend = {...formData}
      formDataToSend.images = imgURLs
      formDataToSend.img = imgURLs[0]
      console.log(formData)
  
      const {email,_id,password,type} = userContext.user 
      let allVetPosts = await getAllVetPosts()
      let onlyUserPosts = allVetPosts.data.filter(post=> post.vetId == _id);
      
      const updateUserData = { email,_id,password,type,vet_posts:onlyUserPosts}
      
      updateUserData.vet_posts.unshift(formDataToSend) 
      const serverResponse = await handleVetPost(updateUserData)
        
        if(serverResponse.status ==200){
          setUserData({...userContext.user, ...serverResponse.data})
          setShowOnDashboard('vetServices')
        }
        
        setFormData({
          id: generateUniqueID(),
          vetId: _id,
          vetName: firstName+' '+lastName,
          banned:false,
          img: './veterinarian/dctr-3.png',
          images: [],
          postDate: getFormattedDate(),
          category: 'Dog',
          serviceTitle: '',
          serviceDescription:'',
          location: '',
          fee: '100',
          meeting: [
            // {
            //   userID: '',
            //  userEmail: '',
            //   transactionID: '',
            //   meetingLink: '',
            //   paid: '',
            //   meetingTime: '', 
            // }
          ],
        }); 
        setSelectedImages([]);
    };

    if(banned){
      return (
        <div className='text-center flex items-center flex-col justify-center w-full min-h-[80vh]'>
          <div className=' p-5 shadow-lg rounded-lg max-w-[300px] bg-gray-100 flex flex-col gap-5 py-10 '>
            <h2 className='text-xl font-bold text-red-500'>You Account has been Banned !</h2>
            <h2 className='text-sm  text-gray-500'>Your account has been suspended. For security reasons, we cannot disclose specific details about this action. If you have questions, please contact our support team.</h2>
          </div>
        </div>
      )
    }
    if(!licenseActive){
      return (
        <div className='text-center flex items-center flex-col justify-center w-full min-h-[80vh]'>
          <div className=' p-5 shadow-lg rounded-lg max-w-[300px] bg-gray-100 flex flex-col gap-5 py-10 '>
            <h2 className='text-xl font-bold text-red-500'>License Not Approved !</h2>
            <h2 className='text-sm  text-gray-500'>Wait for Admin Approval !</h2> 
          </div> 
        </div>
      )
    }else{
      return (
        <div>
            <div>
              <h2 className='text-xl md:text-3xl p-3'>Create Vet  Post</h2>         
            </div>  
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
              <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
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
                <button type="submit" 
                className='bg-purple-500/80 hover:bg-purple-500 text-white px-5 py-2 rounded-lg w-full md:w-2/3 font-bold duration-200'>Post Service</button>
              </form>
              <div className='p-2'> 
                <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                  <div className='relative z-[-100] w-[400px] h-[400px] overflow-hidden '>
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
      )
    }
    
}

export default VetCreateService
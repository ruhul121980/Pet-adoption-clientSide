'use client'
import React, { useState } from 'react';
import './customImgInput.css'

const ImageUploadComponent = (selectedImages,setSelectedImages,handleChange) => {
  // const [selectedImages, setSelectedImages] = useState([]);

  // const handleChange = (event) => {
  //   const files = [...event.target.files]; // Get all selected files

  //   const validImages = files.filter((file) => {
  //     const fileType = file.type;
  //     return fileType === 'image/png' || fileType === 'image/jpeg';
  //   });

  //   const imageDataPromises = validImages.map((image) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(image); // Read image as data URL

  //     return new Promise((resolve, reject) => {
  //       reader.onload = (e) => resolve(e.target.result); // Resolve with base64 string
  //       reader.onerror = (error) => reject(error); // Handle errors
  //     });
  //   });

  //   Promise.all(imageDataPromises)
  //     .then((base64Images) => {
  //       setSelectedImages([...selectedImages, ...base64Images]); // Update state
  //     })
  //     .catch((error) => {
  //       console.error('Error reading image files:', error);
  //     });
  // };

  const removeImage =  (index) => {
    let newList = selectedImages.filter((i,indx )=> indx !== index)
    setSelectedImages(newList)
  }
  return (
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
  );
};

export default ImageUploadComponent;

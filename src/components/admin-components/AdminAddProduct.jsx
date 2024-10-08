
import './customImgInput.css'
import React, { useState } from 'react'
import { getFormattedDate } from '@/utils/getDate';
import { uploadImages } from '@/utils/handleUploadImages';
import { handleAddNewProduct } from '@/utils/handleAddNewProduct';
import { generateUniqueID } from '@/utils/UniqueIDGenerator';

const AdminAddProduct = ({setShow}) => {
  
  const [formData, setFormData] = useState({
    id: generateUniqueID(),
    inStock:true,
    productTitle: '',
    productDescription: '',
    size: 'regular',
    category: 'Dog',
    img: './pet-accessories/accessories-3.jpg',
    images: [],
    price: 10,
    postDate: getFormattedDate()
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
      if (name == 'price') {
        if (value > 0 && value < 1000000) {
          setFormData({ ...formData, [name]: value });

        } else {
          formData.price = 10
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
    const imgURLs = await uploadImages(images)

    const product = {...formData}
    console.log(product)
    product.images = imgURLs
    product.img = imgURLs[0]
 
    const serverResponse = await handleAddNewProduct({product:product})
    
    if(serverResponse.status ==200){
       
      setShow('AdminViewProducts')
    }else{
      alert( serverResponse.status + serverResponse.message )
    }
    
    setFormData({
      id: generateUniqueID(),
      inStock:true,
      productTitle: '',
      productDescription: '',
      size: 'regular',
      category: 'Dog',
      img: './pet-adoption/dog.png',
      images: [],
      price: 10,
      postDate: getFormattedDate()
    }); 
    setSelectedImages([]);
  };
  return (
    <>
      <h2 className='text-xl md:text-3xl p-3'>Add New Product</h2>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
          <div className='w-full'>
            <div className='font-semibold'>
              Upload Images: 
            </div>
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
          <div className=" w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="productTitle" className='font-semibold'>Product Title:</label>
            <input
              type="text"
              id="productTitle"
              name="productTitle"
              value={formData.productTitle}
              onChange={handleChange}
              required
              className='p-2 bg-gray-500/10 '
              placeholder='Product Title'
            />
          </div>
          <div className=" w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="price" className='font-semibold'>Product Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className='p-2 bg-gray-500/10 '
              placeholder='Product Title'
            />
          </div>
          <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="category" className='font-semibold'>Category:</label>
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
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
              <option value="All Pets">All Pets</option>
            </select>
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
          <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
            <label htmlFor="productDescription" className='font-semibold'>Product Description:</label>
              
            <textarea 
            name="productDescription" 
            id="productDescription" 
            rows="10"
            className='p-2 bg-gray-500/10 '
            placeholder='Product Description'
            required
            value={formData.productDescription} 
            onChange={handleChange} 
            ></textarea>
          </div>
          <button type="submit" 
          className='bg-blue-500/80 hover:bg-blue-500 text-white px-5 py-2 rounded-lg w-full md:w-2/3 font-bold duration-200'>
            Add Product
          </button>
        </form>
        <div className='p-2'> 
          <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white'>
            <div className=' w-full overflow-hidden flex items-center justify-center object-cover aspect-[4/3]'>
              <img className='w-full z-0 object-cover' src={selectedImages.length? selectedImages[0] : formData.img} alt={formData.productTitle} />
            </div>
            <div className='p-2'>
                
              <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Category:</span>
                  <span>{formData.category}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Date:</span>
                  <span>{formData.postDate}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Size:</span>
                  <span>{formData.size}</span>
                </p>
                <p className='flex gap-1'>
                  <span className=' font-semibold'>Price:</span>
                  <span>{formData.price}</span>
                </p>
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Title:</span>
                  <span>{formData.productTitle}</span>
                </p>
                  
                <p className='flex flex-col gap-1 col-span-2'>
                  <span className=' font-semibold'>Product Description:</span>
                  <span>{formData.productDescription}</span>
                </p>
                  
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminAddProduct


 
 
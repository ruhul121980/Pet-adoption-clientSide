import { handleUpdateProduct } from '@/utils/handleUpdateProduct';
import React, { useState } from 'react'

const UpdateProduct = ({p,handleOpenUpdateVetPost,fetchAllProducts}) => {
    const [formData, setFormData] = useState({
        id:p.id, 
        productTitle: p.productTitle,
        productDescription: p.productDescription,
        size: p.size,
        category: p.category,
        img:p.img,
        images: p.images,
        price: p.price,
        postDate: p.postDate

    });
    
    const [selectedImages, setSelectedImages] = useState(p.images); 

    const handleChange =  (event) => {
    const { name, value } = event.target;
    if (name == 'price') {
        if (value > 0 && value < 1000000) {
        setFormData({ ...formData, [name]: value });
        } else {
        formData.price = 10
        }
    } else {
        setFormData({ ...formData, [name]: value });
        }
    };
      
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const product = {...formData}  
        const serverResponse = await handleUpdateProduct({product:product})
        
        if(serverResponse.status ==200){
            fetchAllProducts()
            handleOpenUpdateVetPost(-1)
        }else{
            alert( serverResponse.status + serverResponse.message )
        } 
          
        setSelectedImages([]);
    };
  return (
    <div>
        <h2 className='text-xl md:text-3xl p-3'>Update Product</h2> 
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
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
                 
                <div className='flex gap-3 font-semibold text-white'>
                    <button type="submit" className='bg-green-500 rounded-lg hover:bg-green-600 p-2 '>Update </button>
                    <button onClick={()=>handleOpenUpdateVetPost(-1)} className='bg-red-500 rounded-lg hover:bg-red-600 p-2 ' >Cancel </button>
                </div>
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
        
    </div>
  )
}

export default UpdateProduct
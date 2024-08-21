import { handleDeleteProduct } from '@/utils/handleDeleteProduct'
import { handleUpdateStock } from '@/utils/handleUpdateStock'
import React from 'react'

const AdminProductCard = ({p,i,fetchAllProducts,handleOpenUpdateVetPost}) => {
    const updateStock =async ()=>{ 
        const updateResponse = await handleUpdateStock(p.id)
        if (updateResponse.status == 200) {
            fetchAllProducts()
        }
    }

    const deleteProduct =async ()=>{
        const updateResponse = await handleDeleteProduct(p.id)
        if (updateResponse.status == 200) {
            fetchAllProducts()
        }
    }
 
  return (
    <div className='p-2'> 
        <div className='w-[400px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white'>
            <div className=' w-full overflow-hidden flex items-center justify-center object-cover aspect-[4/3]'>
                <img className='w-full z-0 object-cover' src={p.images.length? p.images[0] : p.img} alt={p.productTitle} />
            </div>
            <div className='p-2'>
                
            <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Category:</span>
                    <span>{p.category}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Date:</span>
                    <span>{p.postDate}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Size:</span>
                    <span>{p.size}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Price:</span>
                    <span>{p.price}</span>
                </p>
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Title:</span>
                    <span>{p.productTitle}</span>
                </p> 
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Description:</span>
                    <span>{p.productDescription}</span>
                </p>
            </div>
            <div className='grid grid-cols-3 gap-1'>
                <div className='flex flex-col gap-2'>
                    {
                        p.inStock &&
                        <button onClick={updateStock} className='bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 rounded-lg'>Stock Out</button>
                    }
                    {
                        p.inStock == false &&
                        <button onClick={updateStock} className='bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-lg'>Stock Available</button>
                    }
                </div>
                <div>
                    <button onClick={()=>handleOpenUpdateVetPost(i)} className='bg-sky-500 hover:bg-sky-600 text-white font-bold p-2 rounded-lg'>Update Product</button>
                </div>
                <div>
                    <button onClick={deleteProduct} className='bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-lg'>Delete Product</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminProductCard
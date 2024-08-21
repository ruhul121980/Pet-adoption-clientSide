import React, { useEffect, useState } from 'react'
import { getAllProducts } from '@/utils/getAllProducts'
import AdminProductCard from './AdminProductCard'
import UpdateProduct from './UpdateProduct'

const AdminViewProducts = () => {
  const [all_products, setAll_products] = useState(null)
  const fetchAllProducts = async() =>{
    console.log('fetching products')
    const serverResponse = await getAllProducts()
    if (serverResponse.status == 200) {
      setAll_products(serverResponse.all_products)
    }
  }
  useEffect(() => {
     fetchAllProducts()
  }, [])
  
  const [openUpdate, setOpenUpdate] = useState(-1)
  const handleOpenUpdateVetPost = async (index)=>{
    setOpenUpdate(index)
  } 

  if (all_products) {
    return (
      <div>
        {
          openUpdate > -1 ?
          <UpdateProduct 
          p={all_products[openUpdate]}
          handleOpenUpdateVetPost={handleOpenUpdateVetPost}
          fetchAllProducts={fetchAllProducts}
          />
          :
          <>
            <h1 className='text-xl md:text-3xl p-3'>All Products:</h1>
            <div className='flex gap-1 flex-wrap'>
            {
              all_products.map((p,i)=>(
              <AdminProductCard 
                key={i} 
                p={p} 
                i={i}
                fetchAllProducts={fetchAllProducts} 
                handleOpenUpdateVetPost={handleOpenUpdateVetPost}
                />
              ))
            }
            </div>
          </>
        }
      </div>
    )
  } else {
    return (
      <div>Loading All Products </div>
    )
  }  
  
}

export default AdminViewProducts
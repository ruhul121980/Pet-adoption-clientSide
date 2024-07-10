import React, { useEffect, useState } from 'react'
import { getAllProducts } from '@/utils/getAllProducts'
import AdminProductCard from './AdminProductCard'

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
  
  if (all_products) {
    return (
      <div>
        <h1 className='text-xl md:text-3xl p-3'>All Products:</h1>
        <div className='grid grid-cols-3 '>
        {
          all_products.map((p,i)=>(
          <AdminProductCard key={i} p={p} />
          ))
        }
        </div>
      </div>
    )
  } else {
    return (
      <div>Loading All Products </div>
    )
  }  
  
}

export default AdminViewProducts
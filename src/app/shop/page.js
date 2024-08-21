'use client'

import { useUserContext } from "@/components/context/UserContext";
import ProductCard from "@/components/home/ProductCard"
import { getAllProducts } from "@/utils/getAllProducts"
import { useEffect, useState } from "react"

export default  function  shop () {
  const userContext = useUserContext();
  const {petShopCategory, setPetShopCategory} = userContext 

  const [all_products, setAll_products] = useState(null)

  const fetchAllProducts = async() =>{ 
    const serverResponse = await getAllProducts()
    if (serverResponse.status == 200) {
      let allPdt
      if(petShopCategory?.length > 2){
         allPdt = serverResponse.all_products.filter(p=> p.category == petShopCategory)
      }else{
        allPdt = serverResponse.all_products
      }
      setAll_products(allPdt)
    }
  }
  const fetchAllfilteredProducts = async(value) =>{ 
    if (value == 'All') { 
      const serverResponse = await getAllProducts()
      if (serverResponse.status == 200) {
        let allPdt = serverResponse.all_products
        setAll_products(allPdt)
        setPetShopCategory(value)
      }
 

    } else {
      const serverResponse = await getAllProducts()
      if (serverResponse.status == 200) {
        let allPdt
        if(petShopCategory?.length > 2){
          allPdt = serverResponse.all_products.filter(p=> p.category == value)
        }else{
          allPdt = serverResponse.all_products
        }
        setAll_products(allPdt)
        setPetShopCategory(value)
      }
    }
  }
   
  useEffect(() => {
     fetchAllProducts()
     fetchAllfilteredProducts(petShopCategory)
  }, [petShopCategory])
  let category = ['All','Dog', 'Cat' , 'Fish', 'Rabbit', 'All Pets','Other']
  if (all_products) {
    return (
      <div className="bg-gray-100">
        <h1 className='text-xl md:text-3xl p-3'>All Products:</h1>
        <div className="flex gap-2">
            <div className="w-[200px] min-w-[200px] max-w-[200px] p-5 "> 
                <p>Category:</p>
                <div className='flex flex-wrap gap-1 text-xs'>

                  {
                    category.map((c,i)=><button key={i} onClick={()=>fetchAllfilteredProducts(c)} className={` px-3 py-2   rounded-lg ${petShopCategory == c ? ' bg-purple-500/50 ' : ' bg-purple-100 '} hover:bg-purple-500/50`}>{c}</button>)
                  }
                </div>
            </div>
            <div className='grid grid-cols-3 p-5 lg:p-10'>
            {
            all_products.map((p,i)=>(
            <ProductCard key={i} p={p} />
            ))
            }
            </div>
        </div>

      </div>
    )
  } else {
    return (
      <div>Loading All Products </div>
    )
  } 
  };
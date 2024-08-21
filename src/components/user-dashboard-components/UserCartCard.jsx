
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'; 
import { useUserContext } from '../context/UserContext';
import { calculateTotalAmount } from '@/utils/CartCalculations';
import { getRemoveFromCart, updateCartItem } from '@/utils/getAddToCart';

const UserCartCard = ({p,fetchCart}) => {
    const userContext = useUserContext();
    const {user} = userContext
    const router = useRouter(); 
    const [product, setProduct] = useState(p)
    let removing = false
    const handleRemoveFromCart = async ()=>{
        if(!removing){
            removing = true
            console.log('start removing now ',removing)
            // api to remove single product mathching with p.id
            const data = await getRemoveFromCart(p.id,user.type,user.email)
            if(data.status == 200){
                removing = false
                console.log(data)
                fetchCart()
            }
        }
    } 

    // calculateTotalAmount
    // updateCartItem

    const handleIncreament = async ()=>{
        if(product.quantity > 0){
            let qnty = product.quantity + 1
            let totalAmount = calculateTotalAmount(qnty,product.price)
            setProduct({...product,quantity:qnty,totalAmount:totalAmount}) 

            let updateResponse = await updateCartItem(product,qnty,totalAmount,user.type,user.email)
            // console.log("updated Response " , updateResponse)
            if(updateResponse.status == 200 ){
                fetchCart()
            }
        }
    }
    const handleDecreament = async ()=>{
        if(product.quantity > 1){
            let qnty = product.quantity - 1
            let totalAmount = calculateTotalAmount(qnty,product.price)
            setProduct({...product,quantity:qnty,totalAmount:totalAmount}) 
            let updateResponse = await updateCartItem(product,qnty,totalAmount,user.type,user.email)
            // console.log("updated Response " , updateResponse) 
            if(updateResponse.status == 200 ){
                fetchCart()
            }
        }
    }
  return (
    <div className='p-2 flex  '> 
        <div className='w-[400px] h-auto rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white flex flex-col justify-between'>
            <img className='w-full z-0 aspect-[4/3]' src={p.images.length? p.images[0] : p.img} alt={p.productTitle} />
             
            <div className='grid grid-cols-2 w-full gap-1 capitalize p-2'>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Category:</span>
                    <span>{product.category}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Date:</span>
                    <span>{product.postDate}</span>
                </p>
                <p className='flex gap-1'>
                    <span className=' font-semibold'>Size:</span>
                    <span>{product.size}</span>
                </p>
                
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Title:</span>
                    <span>{product.productTitle}</span>
                </p> 
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Description:</span>
                    <span>{product.productDescription}</span>
                </p>
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.price}</span>
                </p>
                 
                <button

                    onClick={handleRemoveFromCart}
                    className='bg-red-900 hover:bg-red-800 text-white rounded-lg flex gap-2 items-center justify-center'>
                    <span className='text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                            <circle cx={10} cy={28} r={2} fill="currentColor"></circle>
                            <circle cx={24} cy={28} r={2} fill="currentColor"></circle>
                            <path fill="currentColor" d="M4.98 2.804A1 1 0 0 0 4 2H0v2h3.18l3.84 19.196A1 1 0 0 0 8 24h18v-2H8.82l-.8-4H26a1 1 0 0 0 .976-.783L29.244 7h-2.047l-1.999 9H7.62Z"></path>
                            <path fill="currentColor" d="M21.586 9.414L18 5.828V14h-2V5.828l-3.586 3.586L11 8l6-6l6 6z"></path>
                        </svg>
                    </span>
                    <span>
                        Remove Item
                    </span>
                </button>
                <p className='flex gap-2 items-center'>
                    <span className=' font-semibold'>Total Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{product.totalAmount}</span>
                </p>
                <div className='flex items-center gap-3 w-full'>
                    <p className='font-bold'>Quanity</p>
                    <div className='flex items-center justify-between w-full'>
                        <button onClick={handleDecreament} className='p-1 text-lg bg-purple-500 hover:bg-purple-800 text-white rounded-full '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5 13v-2h14v2z"></path>
                            </svg>
                        </button>
                        <p  className='font-bold text-lg text-slate-900'>{product.quantity}</p>
                        <button onClick={handleIncreament} className='p-1 text-lg bg-purple-500 hover:bg-purple-800 text-white rounded-full '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                 
            </div> 
        </div>
    </div>
  )
}

export default UserCartCard

  
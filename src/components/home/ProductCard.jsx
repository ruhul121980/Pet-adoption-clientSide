import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { getAddToCart } from '@/utils/getAddToCart';
import { checkProductAdded } from '@/utils/checkProductAdded';

const ProductCard = ({p}) => {
    const userContext = useUserContext();
    const {user} = userContext
    const router = useRouter();
    const [alreadyAdded, setAlreadyAdded] = useState(false)

    const handleAddToCart = async ()=>{
        //check if user logged in or not 
        if (!userContext.user.login && !userContext.user.email) {
            console.log("user not login ")
            router.push('/login')
        } else {
            console.log("user login ")
            //if logged in then 
            const data = await getAddToCart(p.id,user.type,user.email,user._id)
            console.log(data)
            checkAlreadyAdded()
        }
    }
    const checkAlreadyAdded = async()=>{
        if (userContext.user.login && userContext.user.email) {
            //if logged in then 
            const data = await checkProductAdded(p.id,user.type,user.email)
            console.log(data)
            setAlreadyAdded(data.alreadyAdded)
        } 
    }
    useEffect(()=>{
        checkAlreadyAdded()
    },[])

  return (
    <div className='p-2 flex  '> 
        <div className='w-[400px] h-auto rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100 bg-white flex flex-col justify-between'>
            <div className='  aspect-[4/3] w-full flex items-center justify-center object-cover'>
                <img className='w-full z-0 object-cover' src={p.images.length? p.images[0] : p.img} alt={p.productTitle} />
            </div>
             
            <div className='grid grid-cols-2 w-full gap-1 capitalize p-2'>
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
                
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Title:</span>
                    <span>{p.productTitle}</span>
                </p> 
                <p className='flex flex-col gap-1 col-span-2'>
                    <span className=' font-semibold'>Product Description:</span>
                    <span>{p.productDescription}</span>
                </p>
                <p className='flex gap-2'>
                    <span className=' font-semibold'>Price:</span>
                    <span className='font-bold text-lg text-slate-900'>{p.price}</span>
                </p>
                {
                    alreadyAdded && p.inStock &&
                    <div
                    className=' select-none  cursor-not-allowed bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex gap-2 items-center justify-center'>
                        <span className='text-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <circle cx={10} cy={28} r={2} fill="currentColor"></circle>
                                <circle cx={24} cy={28} r={2} fill="currentColor"></circle>
                                <path fill="currentColor" d="M4.98 2.804A1 1 0 0 0 4 2H0v2h3.18l3.84 19.196A1 1 0 0 0 8 24h18v-2H8.82l-.8-4H26a1 1 0 0 0 .976-.783L29.244 7h-2.047l-1.999 9H7.62Z"></path>
                                <path fill="currentColor" d="M21.586 6.586L18 10.172V2h-2v8.172l-3.586-3.586L11 8l6 6l6-6z"></path>
                            </svg>
                        </span>
                        <span>
                            Already Added
                        </span>
                    </div>
                }
                {
                   !p.inStock &&
                    <div
                    className=' select-none  cursor-not-allowed bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex gap-2 items-center justify-center'>
                        <span className='text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m198.24 62.63l15.68-17.25a8 8 0 0 0-11.84-10.76L186.4 51.86A95.95 95.95 0 0 0 57.76 193.37l-15.68 17.25a8 8 0 1 0 11.84 10.76l15.68-17.24A95.95 95.95 0 0 0 198.24 62.63M48 128a80 80 0 0 1 127.6-64.25l-107 117.73A79.63 79.63 0 0 1 48 128m80 80a79.55 79.55 0 0 1-47.6-15.75l107-117.73A79.95 79.95 0 0 1 128 208"></path></svg>
                        </span>
                        <span>
                            Stock Out
                        </span>
                    </div>
                }
                {
                    !alreadyAdded && user.type !='veterinarian' && p.inStock &&
                    <button 
                        onClick={handleAddToCart}
                        className='bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex gap-2 items-center justify-center'>
                        <span className='text-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <circle cx={10} cy={28} r={2} fill="currentColor"></circle>
                                <circle cx={24} cy={28} r={2} fill="currentColor"></circle>
                                <path fill="currentColor" d="M4.98 2.804A1 1 0 0 0 4 2H0v2h3.18l3.84 19.196A1 1 0 0 0 8 24h18v-2H8.82l-.8-4H26a1 1 0 0 0 .976-.783L29.244 7h-2.047l-1.999 9H7.62Z"></path>
                                <path fill="currentColor" d="M21.586 6.586L18 10.172V2h-2v8.172l-3.586-3.586L11 8l6 6l6-6z"></path>
                            </svg>
                        </span>
                        <span>
                            Add to Cart
                        </span>
                    </button>
                    
                }
                {
                    user.type =='veterinarian' && p.inStock &&
                    <button disabled
                        className='bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex gap-2 items-center justify-center'>
                        <span className='text-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <circle cx={10} cy={28} r={2} fill="currentColor"></circle>
                                <circle cx={24} cy={28} r={2} fill="currentColor"></circle>
                                <path fill="currentColor" d="M4.98 2.804A1 1 0 0 0 4 2H0v2h3.18l3.84 19.196A1 1 0 0 0 8 24h18v-2H8.82l-.8-4H26a1 1 0 0 0 .976-.783L29.244 7h-2.047l-1.999 9H7.62Z"></path>
                                <path fill="currentColor" d="M21.586 6.586L18 10.172V2h-2v8.172l-3.586-3.586L11 8l6 6l6-6z"></path>
                            </svg>
                        </span>
                        <span>
                            Login as User
                        </span>
                    </button>
                    
                }
            </div> 
        </div>
    </div>
  )
}

export default ProductCard
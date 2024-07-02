import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { getMyCart } from "@/utils/getMyCart"; 
import UserCartCard from "./UserCartCard";
import { calculateCartTotal } from "@/utils/CartCalculations";

const UserCart = () => {
  const userContext = useUserContext();
  const {user} = userContext
  const router = useRouter();
  const [myCart, setMyCart] = useState(null) 
   
  // get user cart details 
  const fetchCart = async() =>{
    console.log('fetching cart Data')
    const serverResponse = await getMyCart(user.type,user.email,user._id)
    if (serverResponse.status == 200) {
      setMyCart(serverResponse.cart)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])

  //handleCheckout 
  //save full cart data to order obj 
  let fullCart = {
    _id: 'objectID',

    total_amount: '',
    checkout: false,
    checkout_url: 'stripe session',
    transaction_id: 'session Id',
    data: ['allcart']
  } 
  //post request for session url 
  //add into order array, with new ObjectID
  //add objectid into stripe req
  //get session id 
  //save to order arrya and response sent

  // redirect to response with amount to pay 
  // after payment redirect to shop/success with sessionID
  // and then redirected to dashboard saving sessionID and  checkout to true

  return (
    <div className='min-h-[screen]'>
      <h2 className='text-lg font-semibold '>My Cart to Checkout: </h2>
      <div className='grid grid-cols-12 gap-3 relative '>
        <div className='col-span-9  min-h-screen'>
          <p>Cart Items: {myCart && myCart.length} {!myCart && 0}</p>
          <div className="grid grid-cols-2 gap-3 p-2 ">
            {
              myCart && 
              myCart.map((p,i)=>(
                <UserCartCard key={i} p={p} fetchCart={fetchCart} />
              ))
            }
          </div>
        </div>
        <div className='col-span-3 shadow-lg sticky top-[100px] right-[0px] h-[300px] bg-purple-100 rounded-lg p-2 text-purple-600 flex flex-col justify-between'>
          <div>
            <p>Confirm Order:</p>
            <table className=" table-fixed text-xs">
              <thead>
                <tr className="text-sm ">
                  <th className=" p-2">No.</th>
                  <th className=" p-2">Product</th>
                  <th className=" p-2">Qty</th>
                  <th className=" p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  myCart && 
                  myCart.map((c,i)=>(
                    <tr key={i}>
                      <td className=" px-2 text-center">{i+1}</td>
                      <td className=" px-2">{c.productTitle}</td>
                      <td className=" px-2 text-center">{c.quantity}</td>
                      <td className=" px-2 text-center">{c.totalAmount}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <p className="border-t-2 border-purple-600  mt-2 w-full flex justify-between px-5 ">
              <span>Total:</span>
              <span>{myCart && calculateCartTotal(myCart)}</span>
            </p>
          </div>
          
          <button className='text-center p-3 rounded w-full shadow bg-purple-500 hover:bg-purple-600 font-semibold text-white'>Checkout ${myCart && calculateCartTotal(myCart)}</button>
        </div>

      </div>
    </div>
  )
}

export default UserCart
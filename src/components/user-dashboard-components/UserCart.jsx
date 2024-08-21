import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext";
import { getMyCart } from "@/utils/getMyCart"; 
import UserCartCard from "./UserCartCard";
import { calculateCartTotal } from "@/utils/CartCalculations";
import { handleCreateSSLSessionForOrder } from "@/utils/handleCreateStripeSession";
import { TK } from "../TK";

const UserCart = () => {
  const userContext = useUserContext();
  const {user} = userContext
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
 
  const handleCheckoutToStipe = async ()=>{ 
    let p = calculateCartTotal(myCart)
    if (p > 0) {
      console.log(p)
      // let amount = p + '00' 
      let data = await handleCreateSSLSessionForOrder(p,user._id)
      if (data.url) {
        console.log("data found !!", data)
        window.location.href = data.url;//forwarding to ssl session url
      } 
    } 
  } 
  if(user.banned){
    return (
      <div className='text-center flex items-center flex-col justify-center w-full min-h-[80vh]'>
        <div className=' p-5 shadow-lg rounded-lg max-w-[300px] bg-gray-100 flex flex-col gap-5 py-10 '>
          <h2 className='text-xl font-bold text-red-500'>You Account has been Banned !</h2>
          <h2 className='text-sm  text-gray-500'>Your account has been suspended. For security reasons, we cannot disclose specific details about this action. If you have questions, please contact our support team.</h2>
        </div>
      </div>
    )
  }else{
    return (
      <div className='min-h-[screen]'>
        <h2 className='text-lg font-semibold '>My Cart to Checkout: </h2>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 relative '>
          <div className='order-2 lg:order-1 lg:col-span-9  min-h-screen'>
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
          <div className=' order-1 lg:order-2 lg:col-span-3 shadow-lg lg:sticky lg:top-[100px] lg:right-[0px] h-[300px] bg-purple-100 rounded-lg p-2 text-purple-600 flex flex-col justify-between'>
            <div>
              <p>Confirm Order:</p>
              <table className=" table-fixed text-xs w-full">
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
            
            <button 
              onClick={handleCheckoutToStipe}
              className='flex  items-center justify-center  gap-1 text-center p-3 rounded w-full shadow bg-purple-500 hover:bg-purple-600 font-semibold text-white'>
                Checkout <TK/>{myCart && calculateCartTotal(myCart)}
            </button>
          </div>
  
        </div>
      </div>
    )

  }
}

export default UserCart
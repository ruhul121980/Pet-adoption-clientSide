export const getMyOrder =async (user_type, user_email,user_id)=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json', 
           });
     
        const response = await fetch(`http://localhost:4000/api/get-my-order?user_type=${user_type}&user_email=${user_email}&user_id=${user_id}`, {
          method: 'Get',
          headers, 
        });      
    
        const data = await response.json();
    
        return data; // return the response data
      } catch (error) {
        console.error('Fetching error:', error.message);
      }
}

export const getAllOrders =async ( )=>{
  try { 
      const headers = new Headers({
         'Content-Type': 'application/json', 
         });
   
      const response = await fetch(`http://localhost:4000/api/all-orders`, {
        method: 'Get',
        headers, 
      });      
  
      const data = await response.json();
  
      return data; // return the response data
    } catch (error) {
      console.error('Fetching error:', error.message);
    }
}
export const  handleAdoptPost = async (userData)=>{
    try {
      // Prepare the request body and headers
      const body = JSON.stringify({...userData});
      console.log("Body is ",body)
      const headers = new Headers({
         'Content-Type': 'application/json',
         'Access-Control-Request-Method': 'POST'
         });
  
      // Send the POST request
      const response = await fetch('http://localhost:4000/api/create-adoption', {
        method: 'POST',
        headers,
        body,
      }); 
      // Parse the response data 
      const data = await response.json();
      console.log('response:', data);
      console.log('status:', data?.status);
  
      return data; // return the response data
    } catch (error) {
      console.error(' error:', error.message);
    }
}
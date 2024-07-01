export const getAllVetPosts = async ()=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json',
        //    'Access-Control-Request-Method': 'GET'
        });
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/all-vet-posts', {
          method: 'Get',
          headers, 
        });        
    
        // Parse the response data 
        const data = await response.json(); 
        
        console.log('Fetch Posts status:', data?.status);
    
        return data; // return the response data
      } catch (error) {
        console.error('Fetching All Posts error:', error.message);
      //   return Promise.reject(error); // Return a rejected promise for error handling
      }
}
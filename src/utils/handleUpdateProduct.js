export const handleUpdateProduct = async (product)=>{
    try {
        // Prepare the request body and headers
        const body = JSON.stringify(product); 

        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
    
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/update-product', {
          method: 'POST',
          headers,
          body,
        }); 
        // Parse the response data 
        const data = await response.json();
    
        return data; // return the response data
      } catch (error) {
        console.error(' error:', error.message);
      }

}
 
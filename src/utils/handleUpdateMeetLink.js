export const handleUpdateMeetLink = async (email,vetPostID,meetForm,i ) => {
    try {
        // Prepare the request body and headers
        const body = JSON.stringify({email,vetPostID,meetForm,i}); 
        
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
    
        // Send the POST request
        const response = await fetch('http://localhost:4000/api/update-meeting', {
          method: 'POST',
          headers,
          body,
        });  
        const data = await response.json(); 
    
        return data;  
      } catch (error) {
        console.error(' error:', error.message);
      }
}
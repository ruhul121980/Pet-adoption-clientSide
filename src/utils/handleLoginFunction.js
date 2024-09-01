export async function handleLoginFunction(userData) { 
    console.log("front-end requested Data", userData)
    try {
      // Prepare the request body and headers
      const body = JSON.stringify({...userData});

      const headers = new Headers({
         'Content-Type': 'application/json',
         'Access-Control-Request-Method': 'POST'
         });
  
      // Send the POST request
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers,
        body,
      });
      
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('login error:', error.message);
    }
  }
  
  
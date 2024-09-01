export const handleLicense =async (email)=>{
    try { 
        const body = JSON.stringify({ email });
  
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
     
        const response = await fetch('http://localhost:4000/api/license', {
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

export const handleCheckLicense =async (email)=>{
    try { 
        const body = JSON.stringify({ email });
  
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
     
        const response = await fetch('http://localhost:4000/api/check-license', {
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
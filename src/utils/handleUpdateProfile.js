export const handleUpdateProfile = async (obj,type,email)=>{
    try {
        const body = JSON.stringify({obj,type,email});
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
        const response = await fetch('http://localhost:4000/api/update-profile', {
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
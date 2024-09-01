export const handleDeleteProduct = async (id)=>{
    try {
        const body = JSON.stringify({id});
        const headers = new Headers({
           'Content-Type': 'application/json',
           'Access-Control-Request-Method': 'POST'
           });
        const response = await fetch('http://localhost:4000/api/delete-product', {
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
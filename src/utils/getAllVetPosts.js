export const getAllVetPosts = async ()=>{
    try { 
        const headers = new Headers({
           'Content-Type': 'application/json',
        });
        const response = await fetch('http://localhost:4000/api/all-vet-posts', {
          method: 'Get',
          headers, 
        });        
        const data = await response.json(); 
        return data; 
      } catch (error) {
        console.error('Fetching All Posts error:', error.message);
      }
}
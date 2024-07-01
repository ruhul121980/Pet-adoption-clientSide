export const generateUniqueID = ()=> {
    // Combine alphanumeric characters for a wider range
    const charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let uniqueID = "";
    for (let i = 0; i < 6; i++) {
      // Generate a random index within the character pool
      const randomIndex = Math.floor(Math.random() * charPool.length);
      uniqueID += charPool[randomIndex];
    }
  
    return uniqueID;
  }
  
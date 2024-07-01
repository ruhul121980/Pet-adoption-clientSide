export const getUserData = () => {
    const storedUser = localStorage.getItem('petworldUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };
  
  export const setUserData = (user) => {
    console.log("setting user data", user)
    localStorage.setItem('petworldUser', JSON.stringify(user));
  };
  
  export const clearUserData = () => {
    localStorage.removeItem('petworldUser');
  };
  
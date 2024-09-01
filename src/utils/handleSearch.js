export function handleSearch(searchValue, vetPosts) {
    // Convert search value to lowercase for case-insensitive matching
    const searchLower = searchValue.toLowerCase();
  
    // Define the properties to search in
    const propertiesToSearch = [
      'vetName', 'serviceTitle', 'serviceDescription', 'category'
    ];
  
    // Filter the products array
    return vetPosts.filter(product => {
      // Check each property for a match
      return propertiesToSearch.some(prop => {
        // Get the property value, convert to string and lowercase
        const propValue = String(product[prop] || '').toLowerCase();
        // console.log(prop, " " ,propValue)
        // Check if the property value includes the search string
        return propValue.includes(searchLower);
      });
    });
  }
export function handleSearchAdoption(searchValue, allAdoptions) {
    // Convert search value to lowercase for case-insensitive matching
    const searchLower = searchValue.toLowerCase();
  
    // Define the properties to search in
    const propertiesToSearch = [
      'petNickname', 'location', 'size', 'age','gender','phone','category'
    ];
  
    // Filter the products array
    return allAdoptions.filter(product => {
      // Check each property for a match
      return propertiesToSearch.some(prop => {
        // Get the property value, convert to string and lowercase
        const propValue = String(product[prop] || '').toLowerCase();
        // console.log(prop, " " ,propValue)
        // Check if the property value includes the search string
        return propValue.includes(searchLower);
      });
    });
  }
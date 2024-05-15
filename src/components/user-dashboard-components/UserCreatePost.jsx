import React, { useState } from 'react'

const UserCreatePost = () => {
  const [formData, setFormData] = useState({
    petNickname: '',
    location: '',
    age: '',
    sex: '',
    size: '',
    vaccinated: '',
    spayed: '',
    images: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      // Handle multiple file selection
      console.log(event.target.files)
      setSelectedImages([...event.target.files]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const combinedFormData = new FormData();

    // Add text data to the FormData
    for (const key in formData) {
      combinedFormData.append(key, formData[key]);
    }

    // Add selected images to the FormData
    selectedImages.forEach((image) => combinedFormData.append('images', image));

    console.log('Form Data:', combinedFormData.getAll()); // Log the data object

    // Implement your actual form submission logic here (e.g., API call)
    // This is a simplified example, replace with actual logic
    setFormData({
      petNickname: '',
      location: '',
      age: '',
      sex: '',
      size: '',
      vaccinated: '',
      spayed: '',
      images: [],
    });
    setSelectedImages([]);
  };
  return (
    <>
    <h2 className='text-xl md:text-3xl p-3'>Create New Adoption Post</h2>
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 p-3'>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
        <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
          <label htmlFor="petNickname" className='font-semibold'>Pet Nickname:</label>
          <input
            type="text"
            id="petNickname"
            name="petNickname"
            value={formData.petNickname}
            onChange={handleChange}
            required
            className='p-2 bg-gray-500/10 '
            placeholder='Pet Nickname'
          />
        </div>
        <div className="w-full flex flex-col gap-2 md:w-2/3  p-2">
          <label htmlFor="location" className='font-semibold'>Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className='p-2 bg-gray-500/10 '
            placeholder='St no, post code, Address'
          />
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="age" className='font-semibold'>Age:</label>
          <select 
          id="age" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          required
          className='p-2 border-none rounded'
          
          >
            <option value="">Select Age</option>
            <option value="lessThan1Month">Less than 1 month</option>
            <option value="1-3Months">1-3 Months</option>
            <option value="3-6Months">3-6 Months</option>
            <option value="6-10Months">6-10 Months</option>
            <option value="10MonthsPlus">10 Months+</option>
          </select>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="sex" className='font-semibold'>Sex:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="male"
              name="sex"
              value="male"
              onChange={handleChange}
              checked={formData.sex === 'male'}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="sex"
              value="female"
              onChange={handleChange}
              checked={formData.sex === 'female'}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="size" className='font-semibold' >Size:</label>
          <select 
          id="size" 
          name="size" 
          value={formData.size} 
          onChange={handleChange} 
          required
          className='p-2 border-none'
          >
            <option value="">Select Size</option>
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="regular">Regular</option>
            <option value="big">Big</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="vaccinated" className='font-semibold'>Vaccinated:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="vaccinated"
              name="vaccinated"
              value="yes"
              onChange={handleChange}
              checked={formData.vaccinated === 'yes'}
            />
            <label htmlFor="vaccinated">Yes</label>
            <input
              type="radio"
              id="notVaccinated"
              name="vaccinated"
              value="no"
              onChange={handleChange}
              checked={formData.vaccinated === 'no'}
            />
            <label htmlFor="notVaccinated">No</label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="spayed" className='font-semibold'>Spayed/Neutered:</label>
          <div className="flex gap-2">
            <input
              type="radio"
              id="spayed"
              name="spayed"
              value="yes"
              onChange={handleChange}
              checked={formData.spayed === 'yes'}
            />
            <label htmlFor="spayed">Yes</label>
            <input
              type="radio"
              id="notSpayed"
              name="spayed"
              value="no"
              onChange={handleChange}
              checked={formData.spayed === 'no'}
            />
            <label htmlFor="notSpayed">No</label>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 md:w-2/3  p-2">
          <label htmlFor="images" className='font-semibold'>Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleChange}
          />
        </div>
        <button type="submit" 
        className='bg-blue-500/80 hover:bg-blue-500 text-white px-5 py-2 rounded-lg w-full md:w-2/3 font-bold duration-200'>Post Adoption</button>
      </form>
      <div className='p-2'>
        <p>
          Nickname: 
          {formData.petNickname}
        </p>
        <p>
          Age: 
          {formData.age}
        </p>
        <p>
        Location: 
        {formData.location}
        </p>
        <p>
          Sex: 
          {formData.sex}
        </p>
        <p>
          Spayed: 
          {formData.spayed}
        </p>
        <p>
          Vaccinated: 
          {formData.vaccinated}
        </p>
      </div>
    </div>
     
    </>
  )
}

export default UserCreatePost
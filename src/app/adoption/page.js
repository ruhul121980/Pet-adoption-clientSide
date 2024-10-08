'use client'
import { useUserContext } from '@/components/context/UserContext';
import { getAllAdoptionPosts } from '@/utils/getAllAdoptionPosts';
import { handleSearchAdoption } from '@/utils/handleSearch';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState ,useEffect} from 'react';

export default  function  adoption () {
    let findCategories = [
        {
          name:'All', 
          url: '/adoption', 
        },
        {
          name:'Dog', 
          url: '/adoption', 
        },
        {
          name:'Cat', 
          url: '/adoption', 
        },
        {
          name:'Rabbit', 
          url: '/adoption', 
        },
        {
          name:'Bird', 
          url: '/adoption', 
        },
        {
          name:'Fish', 
          url: '/adoption', 
        },
        {
          name:'Other', 
          url: '/adoption', 
        },
      ]

    const userContext = useUserContext();
    const {user} = userContext 
    const [sort,setSort] = useState('All'); 
    const [adoptionPosts, setAdoptionPosts] = useState([]); // Empty array to store posts

    // Function to fetch adoption posts
    const fetchAdoptionPosts = async () => {   
        const result = await getAllAdoptionPosts(); 
        if(result.status == 200){
            const data = result.data
            setAdoptionPosts(data); 
        } 
    };
    const HandleSort = async (value)=>{
      setSort(value)
      if (value !== 'All') {
        let data = await getAllAdoptionPosts()
        if(data.status == 200){
          const filtered = data.data.filter(p=> p.category == value)
          setAdoptionPosts(filtered)
        }
      } else {
        fetchAdoptionPosts()
      }
    }
    
    useEffect(() => {
        fetchAdoptionPosts();
    }, []);


    const [Search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [notfound, setNotfound] = useState('')

    const handleChange = (e)=>{
      const { name, value } = e.target;
      if(name == 'search'){
          setSearch(value)
          const matchingProducts = handleSearchAdoption(value, adoptionPosts);
          if(matchingProducts.length){
            setNotfound('')
            setSearchResult(matchingProducts)
          }else{
            setSearchResult([])
            setNotfound("Service not found ") 
          }
      } 
    }
    
    return  (
    <main  className="min-h-screen  ">
      <section className='flex flex-col items-center justify-center'>
        <h2 className='font-semibold  text-center p-5 text-3xl md:text-4xl lg:text-5xl'>Find Adoptions</h2>
        <div>
          <input value={Search} onChange={handleChange} type='text' id='search' name='search' placeholder='Search.. .' className='py-2 px-3 rounded-xl bg-violet-200/80'/>
        </div>
        <div className='w-full   lg:w-[85%] px-5 flex flex-col md:flex-row gap-5  items-end md:items-center justify-between'>
          <div className='flex justify-start w-full md:w-auto  items-center gap-2 text-xs md:text-sm '>
            {
              findCategories.map(i=>(
                <button 
                key={i.name}
                onClick={()=>HandleSort(i.name)} 
                className={`px-2 py-1 rounded shadow hover:bg-custom-violet hover:text-white transition-all ease-in duration-100 ${sort==i.name ? "bg-custom-violet text-white":""}`}>
                  {i.name}
                </button>
              ))
            }
          </div>
          
        </div>
        <div className='w-full  lg:w-[85%] p-5 flex flex-col lg:flex-row lg:flex-wrap gap-5 md:gap-2 lg:gap-5' >
            {
              searchResult && Search.length > 0 &&
              searchResult.map((i,index)=>(
                <div key={i.petNickname+index} className='w-[250px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                  <div className='relative z-[-100] '>
                    <img className='w-full z-0 min-h-[180px]' src={i.img} alt={i.petNickname} />
                    <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                      <p>{i.category}</p>
                      <p>{i.postDate}</p>
                    </div>
                    <div className=' absolute bottom-0 left-0 right-0 w-full bg-custom-violet/80 flex justify-between items-center p-2 text-xs text-white'>
                      <p className='text-sm'>{i.petNickname}</p>
                    </div>
                  </div>
                  <div className='p-2'>
                    <div className='flex  items-center gap-2'>
                      <span className='text-red-500 text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                      </span>
                      <span className=' font-light capitalize'>{i.location}</span>
                    </div>
                    <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Size:</span>
                        <span>{i.size}</span>
                      </p>
                      <p className='flex gap-1 col-span-2'>
                        <span className=' font-semibold'>Age:</span>
                        <span>{i.age}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Vaccinated:</span>
                        <span>{i.vaccinated}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Gender:</span>
                        <span>{i.gender}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Spayed:</span>
                        <span>{i.spayed}</span>
                      </p>
                    </div>
                  </div>
                  {
                    i.email && i.phone && !i.adopted && user.login &&
                    <div className='p-2 grid grid-cols-2 gap-2 text-center'>
                      <Link href={'mailto:'+i.email} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Email</Link>
                      <Link href={'tel:'+i.phone} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Phone</Link>
                    </div>

                  }
                  {
                    i.email && i.phone && !i.adopted && !user.login &&
                    <div className='p-2 grid grid-cols-2 gap-2 text-center'>
                      <Link href={'/login'} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Email</Link>
                      <Link href={'/login'} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Phone</Link>
                    </div>

                  }
                  {
                    i.adopted &&
                    <div className='p-2'>
                    <div className='p-2 rounded-full bg-violet-500 text-white font-semibold hover:shadow-lg text-center'> Already Adopted </div>
                    </div>
                  }
                </div>
              ))
            }
            {
              adoptionPosts && Search.length < 1 && notfound.length <1 &&
              adoptionPosts.map((i,index)=>(
                <div key={i.petNickname+index} className='w-[250px] rounded-lg overflow-hidden text-xs shadow-md hover:shadow-lg duration-100'>
                  <div className='relative z-[-100] '>
                    <img className='w-full z-0 min-h-[180px]' src={i.img} alt={i.petNickname} />
                    <div className=' absolute top-0 left-0 right-0 w-full bg-black/40 flex justify-between items-center p-2 text-xs text-white'>
                      <p>{i.category}</p>
                      <p>{i.postDate}</p>
                    </div>
                    <div className=' absolute bottom-0 left-0 right-0 w-full bg-custom-violet/80 flex justify-between items-center p-2 text-xs text-white'>
                      <p className='text-sm'>{i.petNickname}</p>
                    </div>
                  </div>
                  <div className='p-2'>
                    <div className='flex  items-center gap-2'>
                      <span className='text-red-500 text-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg> 
                      </span>
                      <span className=' font-light capitalize'>{i.location}</span>
                    </div>
                    <div className='grid grid-cols-2 w-full gap-1 capitalize py-2'>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Size:</span>
                        <span>{i.size}</span>
                      </p>
                      <p className='flex gap-1 col-span-2'>
                        <span className=' font-semibold'>Age:</span>
                        <span>{i.age}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Vaccinated:</span>
                        <span>{i.vaccinated}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Gender:</span>
                        <span>{i.gender}</span>
                      </p>
                      <p className='flex gap-1'>
                        <span className=' font-semibold'>Spayed:</span>
                        <span>{i.spayed}</span>
                      </p>
                    </div>
                  </div>
                  {
                    i.email && i.phone && !i.adopted && user.login &&
                    <div className='p-2 grid grid-cols-2 gap-2 text-center'>
                      <Link href={'mailto:'+i.email} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Email</Link>
                      <Link href={'tel:'+i.phone} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Phone</Link>
                    </div>

                  }
                  {
                    i.email && i.phone && !i.adopted && !user.login &&
                    <div className='p-2 grid grid-cols-2 gap-2 text-center'>
                      <Link href={'/login'} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Email</Link>
                      <Link href={'/login'} className='p-2 rounded-full bg-purple-500 text-white font-semibold hover:shadow-lg'>Phone</Link>
                    </div>

                  }
                  {
                    i.adopted &&
                    <div className='p-2'>
                    <div className='p-2 rounded-full bg-violet-500 text-white font-semibold hover:shadow-lg text-center'> Already Adopted </div>
                    </div>
                  }
                </div>
              ))
            }
        </div>
            {
              !adoptionPosts.length && notfound.length > 2 &&
               <p className='text-center '> No Adoption Post Found </p>
            }
      </section>
      <div className='p-5 flex items-center justify-center '>
        <section className='w-full lg:w-[85%] shadow-lg p-5 flex flex-col md:flex-row justify-between bg-purple-100 rounded-lg '>
          <div className='w-full md:w-2/3 flex flex-col items-center md:items-start justify-center gap-5 p-5' >
            <h3 className='font-extrabold text-3xl md:text-4xl text-center lg:text-5xl text-custom-violet'>Find Your Furry Friend</h3>
            <p className='  text-center md:text-start  w-[80%] font-light text-secondary-color'>Embrace the joy of giving a deserving animal a second chance at happiness by opening your heart and home to a furry friend in need, creating a lifelong bond that enriches both your lives</p>
            <div>
              <Link href={'/login'} className='px-5 py-2 bg-custom-violet text-white rounded shadow hover:bg-custom-violet/90'>Start Pet Adoption</Link>
            </div>
          </div>
          <Image 
          className='w-full md:w-1/3 scale-110 z-[0]' 
          width={500} 
          height={400} 
          src={'/pet-adoption/dogs-cats.png'}
          alt={'2cat and 1 dog'}
          />
        </section>
      </div>
    </main>
    )
  };
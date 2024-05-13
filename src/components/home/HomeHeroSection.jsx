import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
 
function HomeHeroSection() {
  let findCategories = [
    {
      name:'Dog',
      imgUrl: '/adoption-category/dog.png',
      url: '/adoption',
      css: 'group-hover:bg-[#FFF2D2]'
    },
    {
      name:'Cat',
      imgUrl: '/adoption-category/cat.png',
      url: '/adoption',
      css: 'group-hover:bg-[#E7E7E7]'
    },
    {
      name:'Rabbit',
      imgUrl: '/adoption-category/rabbit.png',
      url: '/adoption',
      css: 'group-hover:bg-[#F2DFFF]'
    },
    {
      name:'Bird',
      imgUrl: '/adoption-category/bird.png',
      url: '/adoption',
      css: 'group-hover:bg-[#DBE1FF]'
    },
    {
      name:'Others',
      imgUrl: '/adoption-category/all-other.png',
      url: '/adoption',
      css: 'group-hover:bg-[#E2FFE3]'
    },
  ]
  return (
    <>
      <section className='grid grid-cols-1 lg:grid-cols-2  w-full'>
        <div className=' flex items-center justify-center'>
          <div className=' capitalize flex flex-col justify-center lg:w-[80%] min-h-[50vh]'>
            <h1 className='text-3xl  md:text-5xl lg:text-6xl font-bold'>Your Friendly Paw</h1>
            <h2 className=' text-secondary-color p-3'>Search and post free adoption</h2>
            <div className='rounded shadow grid grid-cols-1 md:grid-cols-3  gap-5 p-5 md:flex-row lg:items-center'>
              <input className='  p-3' type="text" name="keywords" id="keywords"  placeholder='Keywords' />
              <input className='  p-3'  type="text" name="location" id="location"  placeholder='Location' />
              <button   className='w-full text-center p-3 flex items-center justify-center gap-1 transition-all ease-in duration-100  hover:bg-custom-violet-light bg-custom-violet rounded  text-white shadow'   >
                <span className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"></path></svg>              </span>
                <span>
                  Search
                </span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <Image className='w-full' width={500} height={500} src={'/hero1.png'} alt='hero-section'/>
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-[50vh] p-5 pb-10'>
        <div className='w-full shadow-lg bg-purple-100/50 rounded-lg md:w-[90%] lg:w-[85%] py-10'>
          <h2 className='font-semibold text-custom-violet text-center p-5 text-3xl md:text-4xl lg:text-5xl'>Find Adoption</h2>
           <div className='w-full flex items-center justify-center p-5'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-between w-full md:w-[90%] lg:w-[80%] gap-5'>
                {
                  findCategories.map(i=>(
                    <Link key={i.name} href={i.url} className='flex flex-col items-center gap-3 group '>
                      <img 
                      className={`w-[50px] rounded-full bg-white ${i.css}  transition-all ease-in duration-100 md:w-[80px] lg:w-[100px]`} 
                      src={i.imgUrl} 
                      alt={i.name} />
                      <p className=' text-custom-violet group-hover:underline transition-all ease-in duration-100'>{i.name} </p>
                    </Link>
                  ))
                }
              </div> 
           </div>
        </div>
      </section>
    </>
  );
}

export default HomeHeroSection;

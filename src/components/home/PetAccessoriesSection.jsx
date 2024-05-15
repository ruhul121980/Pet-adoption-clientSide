import { petAccessoriesCategoryData } from '@/constants/petAccessoriesData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
 
function PetAccessoriesSection() {
   
  return (
    <div className='min-h-screen py-10 flex flex-col items-center '>
      <h2 className='font-semibold  text-center p-5 text-3xl md:text-4xl lg:text-5xl'>Pet Accessories</h2>
      <div className='w-full z-[-0] lg:w-[85%] p-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2 lg:gap-5' >
            {
              petAccessoriesCategoryData.map(i=>(
                <div key={i.name} className=' overflow-hidden rounded-lg relative  group hover:shadow'>
                  <img className=' group-hover:scale-105 z-[-100]  transition-all ease-in duration-200' src={i.img} alt={i.name} srcset={i.img} />
                  <div className=' absolute bottom-0 left-0 w-full bg-black/60 text-white p-5 pb-2 flex flex-col gap-2 '>
                    <p className=' text-center text-xl md:text-2xl font-semibold'>{i.name}</p>
                    <p className=' text-center text-xs md:text-sm font-light'>{i.description}</p>
                    <div className=' flex items-center justify-center'>
                      <Link href={i.url} className='z-0 bg-custom-violet px-8 md:px-10 lg:px-14 py-3 rounded '>Shop Now</Link>
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
        <div className='p-5 flex items-center justify-center '>
        <section className='w-full lg:w-[85%] shadow-lg p-5 flex flex-col md:flex-row justify-between bg-purple-100 rounded-lg  '>
          
          <Image 
          className='w-full md:w-1/3 scale-110 z-[0]' 
          width={500} 
          height={400} 
          src={'/cats-dogs.png'}
          alt={'2cat and 1 dog'}
          />
          <div className='w-full md:w-2/3 flex flex-col items-center text-center  justify-center gap-5 p-5' >
            <h3 className='font-extrabold text-3xl md:text-4xl text-center lg:text-5xl text-custom-violet'>Adoption & Pet Perks Galore</h3>
            <p className='  text-center  w-[80%] font-light text-secondary-color'>Discover the joy of adoption and enhance your pets life with our premium accessories. Join our community to find the perfect match among dogs, cats, rabbits, birds, and fish. Sign up now and make a difference in a furry friend  life!</p>
            <div>
              <Link href={'/adoption'} className='px-5 py-2 bg-custom-violet text-white rounded shadow hover:bg-custom-violet/90'>Find Accessories</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PetAccessoriesSection;

import Link from 'next/link';
import React from 'react';
import { veterinariansData } from '@/constants/veterinariansData';
 
function VeterinarianSection() {
  
  return (
    <div className=' flex flex-col items-center  justify-center'>
      <div className='w-full md:w-[85%] flex flex-col items-center md:items-start text-center md:text-start  justify-center gap-5 p-5' >
        <h2 className='font-semibold text-3xl md:text-4xl text-center md:text-start lg:text-5xl  '>Meet Our Veterinarians</h2>
        <p className='  text-center md:text-start w-[80%] font-light text-secondary-color'>Each of our vets brings a unique blend of skill, compassion, and dedication to their work, ensuring the best care for your pets. We’re honored to have these outstanding professionals as part of our family, ready to serve you and your pets with the utmost empathy and expertise.</p>
        <div>
          <Link href={'/adoption'} className='text-custom-violet hover:text-custom-violet/90 underline  '>View all Veterinarians
          </Link>
        </div>
      </div>
      <div className='w-full  lg:w-[85%] p-5 grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-2 lg:gap-5' >
            {
              veterinariansData.map((i,index)=>(
                <Link 
                key={i.name + index} 
                href={i.url} 
                className=' relative rounded-lg overflow-hidden text-xs shadow-md group '>
                   <img className=' group-hover:scale-105 duration-200' src={i.img} alt={i.name} />
                   <div className=' bg-black/60 absolute bottom-0 left-0 w-full p-5 text-white capitalize'>
                    <p className='text-base font-semibold lg:text-lg group-hover:underline'>{i.name}</p>
                   </div>
                </Link>
              ))
            }
        </div>
    </div>
  );
}

export default VeterinarianSection;

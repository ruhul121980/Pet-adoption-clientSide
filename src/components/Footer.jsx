import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <div>
        Footer
        <footer className='text-xs flex items-center justify-center text-center  p-3'>
          <span>
          copyright 2024
          </span>
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90m-34-90a34 34 0 0 0 61.2 20.4a6 6 0 0 1 9.6 7.21a46 46 0 1 1 0-55.22a6 6 0 0 1-9.6 7.21A34 34 0 0 0 94 128"></path>
          </svg>
          </span>
          <span>PetWorld, All Rights Reserved  </span>
        </footer>
    </div>
  );
}

export default Footer;

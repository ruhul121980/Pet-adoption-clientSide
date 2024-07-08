'use client'
import React, { useState } from 'react' 
import AdminLeftSideBar from './AdminLeftSideBar';
import AdminUserView from './AdminUserView';
import AdminVetView from './AdminVetView';
import AdminAddProduct from './AdminAddProduct';
import AdminViewProducts from './AdminViewProducts';

const AdminPage = () => { 
    let showData = [
        {
            title: 'View Users',
            value: 'AdminUserView',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.48 6.48 0 0 0-1.905 3.959q-.034.335.025.654a5 5 0 0 1-2.07-.655m14.95.654a5 5 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.48 6.48 0 0 1 1.907 3.96a2.3 2.3 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.84.84 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.84.84 0 0 1-.277.71A6.98 6.98 0 0 1 10 18a6.97 6.97 0 0 1-4.696-1.81"></path>
                </svg>`,
        } ,
        {
            title: 'View Vets',
            value: 'AdminVetView',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128M104 424c0 13.3 10.7 24 24 24s24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24m216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3.9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3.9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2.7-4.4 1.1-6.6 1.9c-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8"></path>
                </svg>`,
        } , 
        {
            title: 'Add New Product',
            value: 'AdminAddProduct',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
                </svg>`,
        } , 
        {
            title: 'View Products',
            value: 'AdminViewProducts',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2M1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1m16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2"></path>
                </svg>`,
        } ,  
    ]
    const [show, setShow] = useState('AdminUserView')
  return (
    <main className='flex flex-row bg-gray-100'>
        <AdminLeftSideBar show={show} setShow={setShow} showData={showData} />
        <div className='p-5 w-full'>
            {
                show == 'AdminUserView' &&
                <AdminUserView/>
            }
            {
                show == 'AdminVetView' &&
                <AdminVetView/>
            }
            {
                show == 'AdminAddProduct' &&
                <AdminAddProduct setShow={setShow}/>
            }
            {
                show == 'AdminViewProducts' &&
                <AdminViewProducts/>
            }
        </div>
    </main>
  )
}

export default AdminPage
import React from 'react'
import UserAdoptionPost from './UserAdoptionPost'
import UserCart from './UserCart'
import UserVeterinarianVisits from './UserVeterinarianVisits'
import UserWishlist from './UserWishlist'
import UserSettings from './UserSettings'
import UserCreatePost from './UserCreatePost'

const UserDashboard = ({showOnDashboard}) => {
     
  return (
    <div>
        {
            showOnDashboard == 'createAdoptionPost' &&
            <UserCreatePost/> 
        }
        {
            showOnDashboard == 'myAdoptionPost' &&
            <UserAdoptionPost/>
        }
        {
            showOnDashboard == 'myCart' &&
            <UserCart/>
        }
        {
            showOnDashboard == 'veterinarianVisits' &&
            <UserVeterinarianVisits/>
        }
        {
            showOnDashboard == 'myWishlist' &&
            <UserWishlist/>
        }
        {
            showOnDashboard == 'settings' &&
            <UserSettings/>
        }
    </div>
  )
}

export default UserDashboard
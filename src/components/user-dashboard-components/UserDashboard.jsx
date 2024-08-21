import React from 'react'
import UserAdoptionPost from './UserAdoptionPost'
import UserCart from './UserCart'
import UserVeterinarianVisits from './UserVeterinarianVisits'
import UserSettings from './UserSettings'
import UserCreatePost from './UserCreatePost'
import VetAllServices from './VetAllServices'
import VetCreateService from './VetCreateService'
import ConfirmedOrder from './ConfirmedOrder'

const UserDashboard = ({showOnDashboard,setShowOnDashboard,user}) => {
 
  return (
    <div>
        {
            showOnDashboard == 'createAdoptionPost' && user.type != 'veterinarian' &&
            <UserCreatePost setShowOnDashboard={setShowOnDashboard}/> 
        }
        {
            showOnDashboard == 'myAdoptionPost' && user.type != 'veterinarian' &&
            <UserAdoptionPost setShowOnDashboard={setShowOnDashboard}/>
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
            showOnDashboard == 'settings' &&
            <UserSettings/>
        }
        {
            showOnDashboard == 'vetServices' &&
            <VetAllServices/>
        }
        {
            showOnDashboard == 'createServices' &&
            <VetCreateService setShowOnDashboard={setShowOnDashboard}/>
        }
        {
            showOnDashboard == 'confirmedOrder' &&
            <ConfirmedOrder/>
        }
    </div>
  )
}

export default UserDashboard
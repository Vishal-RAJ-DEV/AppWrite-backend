import React from 'react'
import { useDispatch  } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout as logoutslice} from '../../Store/AuthSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        authservice.logout()  //here if the logout happens using the appwrite logout function then 
        .then(() =>{           // we need to dispatch the logout action to the redux store so state can be updated
            dispatch(logoutslice());   //using the logout action creator from the AuthSlice
        })
    }
  return (
    <div className=' font-bold flex text-center px-4 py-2 cursor-pointer bg-blue-800 text-white rounded-full focus:ring-2 focus:ring-blue-600' onClick={handleLogOut}>Logout</div>
  )
}

export default LogoutBtn
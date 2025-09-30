import {React, useState , useEffect} from 'react'
import config from '../config/config'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { login , logout  } from '../Store/AuthSlice'

const Appwrite = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();  // here it is used for the authentication state management which allows us to display the user information and handle the login/logout functionality

  useEffect (() =>{
    authservice.getcurrentUser()
    .then((userData)=>{
      userData ? dispatch(login(userData)) : dispatch(logout());
    })
    .finally(() =>{
      setloading(false);  
    })
  } , [])

  return !loading ? (
    <div className=''>

    </div>
  ) : null;
}

export default Appwrite
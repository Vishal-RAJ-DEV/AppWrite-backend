import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AuthLayout = ({children , authentication = true }) => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loader , setloader] = useState(true);

    useEffect(() => {
        //to make it more understand 

        // if(authStatus == true){
        //     navigate("/");
        // }else if (authStatus == false ){
        //     navigate("/login");
        // }

        
        // If authentication is required and the user is NOT authenticated, redirect to login page
        if(authentication && !authStatus){
            navigate("/login");
        }
        // If authentication is NOT required and the user IS authenticated, redirect to home page
        else if (!authentication && authStatus){
            navigate("/");
        }
        // After checking authentication, set loader to false to indicate loading is done
        setloader(false);
    }, [authStatus , navigate, authentication])
    
  return loader ? <div>Loading...</div> : <>{children}</>
}

export default AuthLayout
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../Store/AuthSlice'
import { useDispatch } from 'react-redux'
import { Button, Input } from '../index'
import authservice from '../../appwrite/auth'
import { useForm } from 'react-hook-form'



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setError("")    //here is set this to empty so that we can catch any new errors
        console.log(data);
        try {
            const session = await authservice.login(data);  //here send the login data to authservices as session so after we get the that user data 
            if (session) {
                const userData = await authservice.getcurrentUser();  //if there is sesion exist that moment that get that user data 
                if (userData) dispatch(authLogin(userData)); // if user exist then , dispatch login action to redux store 
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        Logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input  //here is email input 
                            lable="email"
                            placeholder='Enter your email'
                            type="email"
                            {...register("email" ,{
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\S+@\S+\.\S+$/.test(value) || "Invalid email format"
                                }
                            })}

                        />
                        <Input  //here is the password input
                            lable="Password"
                            placeholder='Enter your password'
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />

                        <Button type="submit" className='w-full mt-5'>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from '.'
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"


function signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data.email, data.password, data.name)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            }
            navigate("/")
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account? <Link to='/login' className='font-medium text-primary transition-all duration-200 hover:underline'>Login</Link>
                </p>
                {error && <p className='text-red-500 text-center mt-8'>{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Name:" placeholder="Enter your name" type="text" {...register("name", {
                            required: true,
                            minLength: 3
                        })} />
                        <Input label="Email:" placeholder="Enter your email" type="email" {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Invalid email address"
                            }
                        })} />

                        <Input label="Password:" placeholder="Enter new password" type="password" {...register("password", {
                            required: true,
                            minLength: 6
                        })} />
                        <Button type = "submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default signup
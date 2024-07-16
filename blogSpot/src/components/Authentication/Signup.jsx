import React, { useState } from 'react'
import Input from '../Input'
import {useForm} from 'react-hook-form'
import Button from '../Button'
import authService from '../../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { login } from '../../store/AuthSlice'
import { useNavigate,Link } from 'react-router-dom'

function Signup() {
    console.log(import.meta.env);
    console.log(import.meta.env.VITE_APPWRITE_URL)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register ,  handleSubmit} = useForm()
    const [error ,  setError] = useState("")
    const sign = async(data) =>{
        setError("")
        try {
            const logout1 = await authService.Logout()
            const userData = await authService.CreateAccount(data)
            if(userData) {
                const userData = await authService.CurrentUser()
                console.log(userData)
                if(userData)
                    dispatch(login(userData))
                // const logout2 = await authService.Logout()
                navigate('/')
            }
        } catch (error) { 
            setError(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <h2>Logo</h2>
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
            to='/login'>
                Signin
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    <form className='mt-8' onSubmit={handleSubmit(sign)}>  
        <div className='space-y-5'>
        <Input 
        label='Name'
        type='text'
        placeholder = "enter you name"
        {...register('name',{
            required: true,
        })}
        />
        <Input 
        label='Email'
        type='email'
        placeholder = "enter you mail"
        {...register('email',{
            required: true,
            validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
        })}
        />
        <Input 
        label='Paswword'
        type='password'
        placeholder = "enter password"
        {...register('password',{
            required: true,
        })}
        />
        <Button type='submit'>signup</Button>
        </div>
    </form>

</div>
</div>
  )
}

export default Signup
import React ,{useState} from 'react'
// import service from '../appwrite/Service'
import Input from '../Input'
import authService from '../../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login as authLogin } from '../../store/AuthSlice'
import { useForm } from 'react-hook-form'
import Button from '../Button'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register ,  handleSubmit} = useForm()
  const [error ,  setError] = useState("")
  const login = async(data) =>{
        setError("")
        try {
           const logout1 = await authService.Logout()
           const session =  await authService.Login(data)
           if(session){
              const userData = await authService.CurrentUser();
              console.log(userData)

              if(userData)
                dispatch(authLogin(userData))
                navigate('./')
           }
           console.log(session)

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
                        <h2>Logo</h2>
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link to='./signup' className="font-medium text-primary transition-all duration-200 hover:underline">
                    SignIn
                    </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form className='mt-8' onSubmit={handleSubmit(login)}>  
                <div className='space-y-5'>
                </div>
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
                <Button type='submit'>SignIn</Button>

            </form>
            
        </div>
    </div>

  )
}

export default Login
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/AuthSlice'
import authService from '../../Appwrite/Auth'
function LogoutBtn() {
  const dispatch  = useDispatch()
  const logouthandle = () =>{
    authService.Logout().then(
        dispatch(logout())
    )
  }
  return (
    <div>
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logouthandle}>
            Logout
        </button>
    </div>
  )
}

export default LogoutBtn
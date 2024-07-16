import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../Container'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
function Header() {
  const authData = useSelector((state) => state.auth.Status)
  const UserData = useSelector((state) => state.auth)
  console.log(UserData)
  const navigate =  useNavigate()
  const navItems = [
    {
      name:"Home",
      add : "/",
      active : true
    },
    {
    name:"Login",
    add : "/login",
    active : !authData
    },
    {
      name:"Sign-Up",
      add : "/signup",
      active : !authData
    },
    {
      name:"All Post",
      add : "/allpost",
      active : authData
    },
    {
      name:"Add Post",
      add : "/addpost",
      active : authData
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'><h2>Logo</h2></div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.add)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authData && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
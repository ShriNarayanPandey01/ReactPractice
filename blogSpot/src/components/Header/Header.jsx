import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../Container'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.Status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/allpost", active: authStatus },
    { name: "Add Post", slug: "/addpost", active: authStatus },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <h2 className='text-white font-bold text-2xl'>BlogSpot</h2>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
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

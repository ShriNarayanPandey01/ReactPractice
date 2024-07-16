import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import AllPost from './components/Pages/Allpost'
import PostForm from './components/Post-Form/PostForm'
import { Outlet } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App

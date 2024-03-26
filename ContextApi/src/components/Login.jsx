import React ,{useState,useContext, createContext}from 'react'
import UseContext from '../context/UseContext'
function Login() {
    const [username, setUsername] = useState(null)
    const [pass,setPass] = useState(null)
    const {setValue} = useContext(UseContext)
    const handleSubmit = (e)=>{
        e.preventDefault()
        setValue({username,pass})
        console.log(username)
    }
  return (
    <>
    <div>
        <h2>Login</h2>
        <input type = 'text' placeholder='user' onChange={(e)=>setUsername(e.target.value)}/>
        <input type = 'text' placeholder='pass' onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={handleSubmit}>submit</button>
    </div>
    </>
  )
}

export default Login
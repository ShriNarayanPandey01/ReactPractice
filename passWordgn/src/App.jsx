import { useCallback, useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'


function App() {
  const [password, setPassword] = useState("")
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(8)

  const passwordGen =useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str=str+"1234567890"
    if(charAllowed) str=str+"!@#$%^&*(){}[]"
    for(let i=0;i<length;i++){
       let char = Math.floor(Math.random()*str.length+1)
       pass+=str.charAt(char)
    }
    setPassword(pass)
  },[numAllowed,charAllowed,length])

  const passwordRef = useRef(null)
  useEffect(
    ()=>{passwordGen()},[numAllowed,charAllowed,length]
  )
  return (
    <>
    <div className='w-full max-w-md mb-4 mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-400'>
     <h1 className='text-white text-center'>Password generator</h1>
     <div className='flex-shadow rounded-lg overflow-hidden'>
     <input type='text'
     value={password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passwordRef}/>  
     {/* <button className='outline-none bg-fuchsia-600 text-white rounded-lg px-3 py-1' onClick={copyPaste}>copy</button> */}
     </div>   
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={20}
        value={length}
        className='cursor-pointer' 
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label >length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={numAllowed}
        id="numberInput"
        onChange={()=>{setNumAllowed((prev)=>!prev)}} />
        <label >numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={charAllowed}
        id="charInput"
        onChange={()=>{setCharAllowed((prev)=>!prev)}} />
        <label >char</label>
      </div>

     </div>
    </div>
    </> 
  )
}

export default App

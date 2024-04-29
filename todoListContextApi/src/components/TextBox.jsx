import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TextBox() {
  const {addTodo} = useTodo()
  const [mssg,setMssg] = useState("")
  const addMssg = ()=>{
        console.log(mssg)
        addTodo({ mssg, completed: false})
  }
  const handleChange = (event)=>{
    setMssg(event.target.value)
  }
  return (
    <>
    <div className='flex justify-center'>
        <h1 className="bg-teal-500 border-4 border-teal-500 rounded-md p-2 inline-block">input</h1>
        <input className='p-2 px-4 py- border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' value = {mssg} onChange={handleChange}/>
        <button className='bg-sky-500 w-20 border-solid border-2 border-indigo-600 rounded-lg ' onClick={addMssg}>add</button> 
    </div>
    </>
  )
}

export default TextBox
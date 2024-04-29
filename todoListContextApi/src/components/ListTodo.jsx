import {React,useState} from 'react'
import { useTodo } from '../context/TodoContext'

function ListTodo({Todo}) {
  const [mssg,setMssg] = useState(Todo.mssg)
  const {toggleComplete} = useTodo()
  const {deleteTodo} = useTodo()
  const {updateTodo} = useTodo()
  const updated = ()=>{
       updateTodo(Todo.id,{...Todo, Todo:mssg})
       toggleComplete(Todo.id)
  }
  console.log(Todo.id)
  return (
    <div class='flex justify-center'>
    <div className='bg-white rounded-lg shadow-md p-6 w-1/2 space-x-1'>
        
        {  (!Todo.completed)?(
          <h1>{mssg}</h1>):
          (<input className='border border-gray-300  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={mssg} onChange={(e)=>setMssg(e.target.value)}/>)
        }
        {/* <button onClick={toggle}>Change</button> */}
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => deleteTodo(Todo.id)}>Delete</button>
        
        {(!Todo.completed)?(<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'onClick={()=>toggleComplete(Todo.id)}>EDIT</button>):
        (<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={updated}>SAVE</button>)}
    </div>
    </div>
    
  )
}

export default ListTodo
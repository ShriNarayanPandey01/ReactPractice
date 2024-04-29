import { useState ,useEffect,React } from 'react'
import { TodoProvider } from './context/TodoContext'
import TextBox from './components/TextBox'
import ListTodo from './components/ListTodo'
function App() {
  const [todo,setTodo] = useState([])
  const addTodo = (todos)=>{
    console.log(todos)
    setTodo((prev)=>[{id:Date.now(),...todos},...prev])
    console.log(todo)
  }
  const updateTodo= (id,todos)=>{
    console.log(todos)
    // setTodo((prev)=>prev.id===id?{id:id,Mssg:todos}:prev)
    setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todos : prevTodo )))
  }
  const deleteTodo=(id)=>{
    setTodo((prev)=>prev.filter((pre) => pre.id !== id))
  }
  const toggleComplete= (id)=>{
    setTodo((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodo(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo))
  }, [todo,setTodo,updateTodo])

  
  return (
  <>
   <TodoProvider value={{todo,setTodo,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    
    <br/>
    <TextBox/>
    <br/>
    <div className='space-y-2'>
    {todo.map((todos) => (
                          <div key={todos.id}
                          className='w-full'
                          >
                            <ListTodo Todo={todos} />
                          </div>
                        ))}
    </div>

   </TodoProvider>
  </>
  )
}

export default App




// import { useState, useEffect } from 'react'
// import './App.css'

// import TextBox from './components/TextBox'
// import { TodoProvider } from './context/TodoContext'

// function App() {
//   const [todos, setTodos] = useState([])

//   const addTodo = (todo) => {
//     console.log(todo)
//     setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
//     console.log(todo)
//   }

//   const updateTodo = (id, todo) => {
//     setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
//   }

//   const deleteTodo = (id) => {
//     setTodos((prev) => prev.filter((todo) => todo.id !== id))
//   }

//   const toggleComplete = (id) => {
//     //console.log(id);
//     setTodos((prev) => 
//     prev.map((prevTodo) => 
//       prevTodo.id === id ? { ...prevTodo, 
//         completed: !prevTodo.completed } : prevTodo))
//   }

//   useEffect(() => {
//     const todos = JSON.parse(localStorage.getItem("todos"))

//     if (todos && todos.length > 0) {
//       setTodos(todos)
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos))
//   }, [todos])
  



//   return (
//     <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
//     <TextBox/>
//     </TodoProvider>
//   )
// }

// export default App

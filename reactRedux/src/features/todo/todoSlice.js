import { createSlice,nanoid } from "@reduxjs/toolkit";
const initialState  = {
    todos:[{
        id:1,
        mssg:"hello"   
    }]
}
export  const todoSlice  = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo: (state ,action)=>{
            const todo = {
                id:nanoid(),
                mssg:action.payload
            }
            state.todos.push(todo)
        },
        updateTodo : (state,action)=>{
            state.todos = state.todos.map((todo)=>{action.payload.id===todo.id?todo:{...todo,mssg:action.payload.text} })
        },
        deleteTodo : (state,action)=>{
            state.todos = state.todos.filter((todo)=> todo.id!==action.payload)
        }
    }
})
 export const {addTodo,deleteTodo,updateTodo} = todoSlice.actions
 export default todoSlice.reducer
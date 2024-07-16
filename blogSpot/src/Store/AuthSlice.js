import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'
const initialState =  {
    Status: false,
    UserData : null
}
const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login : (state , action)=>{
            state.Status=true
            console.log(action.payload)
            state.UserData=action.payload.UserData
        },
        logout : (state)=>{
            state.Status=false
            state.UserData=null
        }
    }
})
export const {login , logout} = AuthSlice.actions
export default AuthSlice.reducer
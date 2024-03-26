import React, { createContext } from 'react'
import { useState,useContext } from 'react'
import UseContext from '../context/UseContext'
function Profile() {
  const User = useContext(UseContext)
  if(!User.value)
  return <><h1>Please Login{console.log(User)}</h1></>
  else
  return (
    <>
    <div>Profile {User.value.username}</div>
    </>
  )
}

export default Profile
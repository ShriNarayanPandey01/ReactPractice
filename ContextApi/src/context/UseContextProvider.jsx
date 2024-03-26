import React from 'react'
import { useState } from 'react'
import UseContext from './UseContext'

function UseContextProvider({children}) {
    const [value, setValue] = useState({})
  return (
    <UseContext.Provider value={{value,setValue}}>
        {children}
    </UseContext.Provider>
  )
}

export default UseContextProvider
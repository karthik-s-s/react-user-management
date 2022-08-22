import React,{useState,createContext} from 'react'

export const Mycontext = createContext(null)

function UserContext({children}) {
  
    const [user, setuser] = useState({})
  return (
    <Mycontext.Provider value={{user,setuser}}>
        {children}
    </Mycontext.Provider>
  )
}

export default UserContext
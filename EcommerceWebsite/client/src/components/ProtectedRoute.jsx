import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
    const isLoggedIn = useSelector((state)=>state.counter.isLoggedIn)
    // console.log(`${children}: LoggedIn State=${isLoggedIn}`)
    if(!isLoggedIn){
      // console.log(`in ${children} isLoggedIn comes false`)
      navigate('/login')
    }

  return children
}

export default ProtectedRoute

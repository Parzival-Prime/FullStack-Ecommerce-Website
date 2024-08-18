import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {
    const isLoggedIn = useSelector((state)=>state.counter.isLoggedIn)
    if(!isLoggedIn) return <Navigate to='/login' />

  return children
}

export default ProtectedRoute

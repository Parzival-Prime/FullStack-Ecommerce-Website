import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {

    const isLoggedIn = localStorage.getItem('user')
    // console.log(isLoggedIn)
    if(!isLoggedIn) return <Navigate to='/login' />

  return children
}

export default ProtectedRoute

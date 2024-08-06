import React from 'react'
import { useSelector } from 'react-redux'

function AdminRoute({ children }) {
    const isAdmin = useSelector((state)=>state.counter.isAdmin)

    if (isAdmin) {
        return (<>{children}</>)
    }
}

export default AdminRoute

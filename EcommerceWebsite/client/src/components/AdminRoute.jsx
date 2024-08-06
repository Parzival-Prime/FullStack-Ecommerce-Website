import React from 'react'

function AdminRoute({children}) {
    const loggedUser = JSON.parse(localStorage.getItem('user'))

    if (loggedUser.value.role == 1){
        return (<>{children}</>)
    }
}

export default AdminRoute

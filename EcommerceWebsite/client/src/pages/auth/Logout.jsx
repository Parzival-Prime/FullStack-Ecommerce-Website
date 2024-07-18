import React from 'react'
import { axiosInstance } from '../../App'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setIsLoggedInFalse } from '../../features/counter/counterSlice'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const { data } = await axiosInstance.get('/api/v1/auth/logout')

            if (data?.success) {
                toast.success('User Logged Out Successfully!')
                localStorage.removeItem('user')
                dispatch(setIsLoggedInFalse())
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in Logout')
        }
    }
    return (
        <Button 
        variant='contained'
        color='error'
        sx={{
            width: '8rem'
        }}
        onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default Logout

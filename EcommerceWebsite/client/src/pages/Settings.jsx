import React, { useState, useEffect } from 'react'
import '../styles/settings.css'
import Switch from '@mui/material/Switch';
import { RiSettings5Line } from '@remixicon/react'
import { TextField, Button } from '@mui/material';
import { axiosInstance } from '../App';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/counter/counterSlice';
import { useTheme } from '../theme/theme.js'

function Settings() {
  const dispatch = useDispatch()
  const [answer, setAnswer] = useState('')
  const [password, SetPassword] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const theme = useTheme()

  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }

  const handleSubmit = async () => {
    try {
      console.log(answer, password)
      const { data } = await axiosInstance.post('/api/v1/auth/change-password', { answer, password })

      if (data?.success) {
        console.log(data)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
      // toast.error(error)
    }
  }

  const changeTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className='settings' style={{ backgroundColor: theme.background, color: theme.heading }}>
      <h2 className="settings-heading"><RiSettings5Line size={'2rem'} />Settings</h2>
      <div className="settings-body">
        <div className="toggle-theme">
          Change Theme <div className="theme-toggle-button"><Switch
            defaultChecked
            onChange={changeTheme}
            sx={{
              color: theme.heading
            }}
          /></div>
        </div>
        <div className="change-password">
          Nagesh Naag Shakti <button onClick={() => setIsPopupOpen(true)} style={{ backgroundColor: theme.heading, color: theme.background }}>Change Password</button>
        </div>
        {isPopupOpen && (<div className="settings-popup" style={{ backgroundColor: theme.background }}>
          <h2 className="settings-popup-title">Change Password</h2>
          <div className="settings-popup-body">
            <p className="settings-popup-question">What is your pet's name?</p>
            <TextField label="Your Pet's Name" onChange={(e) => setAnswer(e.target.value)} size='small'
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.heading, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
              }} />
            <TextField label="Your New Password" onChange={(e) => SetPassword(e.target.value)} size='small'
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.heading, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
              }} />
            <Button variant="contained" onClick={() => { handleSubmit(); handlePopupClose() }} size={'small'} sx={{ backgroundColor: theme.heading, color: theme.background }}>Change</Button>
          </div>
        </div>)}
      </div>
      {isPopupOpen && (<div className="settings-backdrop" onClick={handlePopupClose}></div>)}
    </div>
  )
}

export default Settings

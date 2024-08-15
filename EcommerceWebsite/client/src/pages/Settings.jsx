import React, { useState, useEffect } from 'react'
import '../styles/settings.css'
import Switch from '@mui/material/Switch';
import { RiSettings5Line } from '@remixicon/react'
import { TextField, Button } from '@mui/material';
import { axiosInstance } from '../App';
import toast from 'react-hot-toast';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Settings() {
  const [answer, setAnswer] = useState('')
  const [password, SetPassword] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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

  return (
    <div className='settings'>
      <h2 className="settings-heading"><RiSettings5Line size={'2rem'} />Settings</h2>
      <div className="settings-body">
        <div className="toggle-theme">
          Change Theme <div className="theme-toggle-button"><Switch {...label} defaultChecked /></div>
        </div>
        <div className="change-password">
          Nagesh Naag Shakti <button onClick={() => setIsPopupOpen(true)}>Change Password</button>
        </div>
        {isPopupOpen && (<div className="settings-popup">
          <h2 className="settings-popup-title">Change Password</h2>
          <div className="settings-popup-body">
            <p className="settings-popup-question">What is your pet's name?</p>
            <TextField label="Your Pet's Name" onChange={(e) => setAnswer(e.target.value)} size='small' />
            <TextField label="Your New Password" onChange={(e) => SetPassword(e.target.value)} size='small' />
            <Button variant="contained" onClick={() => { handleSubmit(); handlePopupClose() }} size={'small'}>Change</Button>
          </div>
        </div>)}
      </div>
      {isPopupOpen && (<div className="settings-backdrop" onClick={handlePopupClose}></div>)}
    </div>
  )
}

export default Settings

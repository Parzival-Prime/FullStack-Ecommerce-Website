import React, { useState } from 'react'
import { axiosInstance } from '../App'
import '../styles/contact.css'
import toast from 'react-hot-toast'
import { TextField } from '@mui/material'
import { RiSendPlaneFill } from '@remixicon/react'
import { useTheme } from '../theme/theme'

function Contact() {
  const [senderEmail, setSenderEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const theme = useTheme()

  const sendEmail = async () => {
    try {
      const { data } = await axiosInstance.post('/api/v1/contact/email', {
        senderEmail,
        senderName,
        subject,
        message
      })

      if (data) {
        console.log('Email Sent Successfully')
        toast.success('Email sent Successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in sendEmail func')
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    sendEmail()
  }
  return (
    <>
      <div className="contact-line"></div>
      <div className="contact-us" style={{backgroundColor: theme.background}}>
        <h1 className="contact-us-title" style={{color: theme.heading}}>Get In Touch</h1>
        <div className="form-container">
          <form onSubmit={handleSend} className="contact-form">
            <TextField
              variant='outlined'
              label='Enter your Name'
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className='contact-name'
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
              }}
            />
            <TextField
              variant='outlined'
              label='Enter your Email'
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
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
              }}
            />
            <TextField
              variant='outlined'
              label='Subject'
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
              }}
            />
            <TextField
              variant='outlined'
              multiline
              required
              minRows={3}
              maxRows={6}
              label='Type Message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              }}
            />
            <button type='submit' className="contact-form-button" style={{backgroundColor: theme.button, color: theme.background}}>Send <RiSendPlaneFill style={{
              position: 'absolute',
              top: '5px',
              right: '7px',
              color: theme.background
            }} /></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact



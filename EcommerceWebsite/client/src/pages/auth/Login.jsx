import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import "../../styles/login.css";
import { axiosInstance } from "../../App";
import { useDispatch } from "react-redux";
import { setIsLoggedInTrue, setIsLoggedInFalse, setIsAdminTrue, setIsAdminFalse } from '../../features/counter/counterSlice.js'
import {useTheme} from '../../theme/theme.js'

axios.defaults.withCredentials = true;

function Login() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  const [answer, setAnswer] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { from } = location.state || "/"


  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }


  const setItemWithExpiry = (key, value, expiryInHours) => {
    const now = new Date()
    const expiry = new Date(now.getTime() + expiryInHours * 60 * 60 * 1000)
    const item = {
      value: value,
      expiry: expiry.getTime()
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const getCookie = (name) => {
    const cookies = document.cookie.split(';')
    const cookieValue = cookies.map((cookie) => {
      if (((cookie.split('='))[0]).trim() === name) {
        return ((cookie.split('='))[1]).trim()
      }
    })
    // console.log(cookieValue)
    return cookieValue
  }

  const checkCookieAndSetState = () => {
    if ((getCookie('isLoggedIn'))[0] !== undefined) {
      dispatch(setIsLoggedInTrue())
    } else {
      dispatch(setIsLoggedInFalse())
    }
    if ((getCookie('isAdmin'))[1] !== undefined) {
      dispatch(setIsAdminTrue())
    } else {
      dispatch(setIsAdminFalse())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axiosInstance.post(`/api/v1/auth/login`, { email, password });

    if (data?.success) {
      navigate(from)
      setItemWithExpiry('user', data.user, 24)
      checkCookieAndSetState() // checking accessAndisAdmin Tokens and setting States in Store
      navigate(from || '/');
      toast.success('User LoggedIn successfully!')
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="login-container" style={{backgroundColor: theme.background, color: theme.heading}}>
        <div>
          <FlexCenter
            sx={{ display: 'flex', flexDirection: "column", marginBottom: "3rem", gap: "5px" }}
          >
            <h1>SignIn</h1>
            <div>Hi, Welcome back you've been missed</div>
          </FlexCenter>

          <FormControl sx={{ gap: "1rem", display: 'flex' }} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required={true}
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
                // maxWidth: 100
              }}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required={true}
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
                // maxWidth: 100
              }}
            />
            <span className="forgot" onClick={() => setIsPopupOpen(true)} >
              Forgot Password?
            </span>

            <Button
              variant="contained"
              sx={{ marginTop: "2rem", marginBottom: "3rem", backgroundColor: theme.heading,
                color: theme.background }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </FormControl>
          <p className="login-No-Account">Don't have account? &nbsp;
            <span className="registerPage-link" onClick={() => navigate('/register')}>Create One</span>
          </p>
        </div>

      </div>
      {isPopupOpen && (<div className="login-popup"
      style={{ backgroundColor: theme.background, color: theme.heading }}
      >
        {/* <div> */}
        <h2 className="login-popup-title">Change Password</h2>
        <div className="login-popup-body">
          <p className="login-popup-question">What is your pet's name?</p>
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
            }}
          />
          <TextField label="Your New Password" onChange={(e) => setNewPassword(e.target.value)} size='small'
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
          <Button variant="contained" onClick={() => { handleSubmit(); handlePopupClose() }} size={'small'}
          sx={{ backgroundColor: theme.heading, color: theme.background }}
          >Change</Button>
        </div>
        {/* </div> */}
      </div>)}
      {isPopupOpen && (<div className="login-backdrop" onClick={handlePopupClose}></div>)}
    </>
  );
}

export default Login;

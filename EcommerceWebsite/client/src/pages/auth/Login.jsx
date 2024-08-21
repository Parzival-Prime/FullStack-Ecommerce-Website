import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import "../../styles/login.css";
import { axiosInstance } from "../../baseurl.js";
import { useDispatch } from "react-redux";
import {
  setIsLoggedInTrue,
  setIsLoggedInFalse,
  setIsAdminTrue,
  setIsAdminFalse,
} from "../../features/counter/counterSlice.js";
import { useTheme } from "../../theme/theme.js";

axios.defaults.withCredentials = true;

function Login() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { from } = location.state || "/";

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const setItemWithExpiry = (key, value, expiryInHours) => {
    const now = new Date();
    const expiry = new Date(now.getTime() + expiryInHours * 60 * 60 * 1000);
    const item = {
      value,
      expiry: expiry.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    console.log("Cookies conoling from LoginPage: ",cookies)
    return cookies
      .map((cookie) => {
        const [key, value] = cookie.split("=");
        if (key.trim() === name) {
          return value.trim();
        }
        return undefined;
      })
      .find((value) => value !== undefined);
  };

  const checkCookieAndSetState = () => {
    const isLoggedIn = getCookie("isLoggedIn");
    const isAdmin = getCookie("isAdmin");

    if (isLoggedIn) {
      dispatch(setIsLoggedInTrue());
      console.log("Login.jsx says Logged In true")
    } else {
      dispatch(setIsLoggedInFalse());
      console.log("Login.jsx says Logged In false")
    }
    
    if (isAdmin) {
      console.log("Login.jsx says Admin true")
      dispatch(setIsAdminTrue());
    } else {
      console.log("Login.jsx says Admin false")
      dispatch(setIsAdminFalse());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post(`/api/v1/auth/login`, { email, password });

      if (data?.success) {
        setItemWithExpiry("user", data.user, 24);
        checkCookieAndSetState();
        navigate(from || "/");
        toast.success("User Logged In successfully!");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="login-container" style={{ backgroundColor: theme.background, color: theme.heading }}>
        <div>
          <FlexCenter sx={{ display: "flex", flexDirection: "column", marginBottom: "3rem", gap: "5px" }}>
            <h1>Sign In</h1>
            <div>Hi, Welcome back! You've been missed.</div>
          </FlexCenter>

          <FormControl sx={{ gap: "1rem", display: "flex" }} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              sx={{
                "& .MuiInputBase-input": { color: theme.heading },
                "& .MuiInputLabel-root": { color: theme.heading },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: theme.heading },
                  "&:hover fieldset": { borderColor: theme.heading },
                  "&.Mui-focused fieldset": { borderColor: theme.heading },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
              sx={{
                "& .MuiInputBase-input": { color: theme.heading },
                "& .MuiInputLabel-root": { color: theme.heading },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: theme.heading },
                  "&:hover fieldset": { borderColor: theme.heading },
                  "&.Mui-focused fieldset": { borderColor: theme.heading },
                },
              }}
            />
            <span className="forgot" onClick={() => setIsPopupOpen(true)}>
              Forgot Password?
            </span>

            <Button
              variant="contained"
              sx={{ marginTop: "2rem", marginBottom: "3rem", backgroundColor: theme.heading, color: theme.background }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </FormControl>
          <p className="login-No-Account">
            Don't have an account?&nbsp;
            <span className="registerPage-link" onClick={() => navigate("/register")}>
              Create One
            </span>
          </p>
        </div>
      </div>

      {isPopupOpen && (
        <div className="login-popup" style={{ backgroundColor: theme.background, color: theme.heading }}>
          <h2 className="login-popup-title">Change Password</h2>
          <div className="login-popup-body">
            <p className="login-popup-question">What is your pet's name?</p>
            <TextField
              label="Your Pet's Name"
              onChange={(e) => setAnswer(e.target.value)}
              size="small"
              sx={{
                "& .MuiInputBase-input": { color: theme.heading },
                "& .MuiInputLabel-root": { color: theme.heading },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: theme.heading },
                  "&:hover fieldset": { borderColor: theme.heading },
                  "&.Mui-focused fieldset": { borderColor: theme.heading },
                },
              }}
            />
            <TextField
              label="Your New Password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              size="small"
              sx={{
                "& .MuiInputBase-input": { color: theme.heading },
                "& .MuiInputLabel-root": { color: theme.heading },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: theme.heading },
                  "&:hover fieldset": { borderColor: theme.heading },
                  "&.Mui-focused fieldset": { borderColor: theme.heading },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
                handlePopupClose();
              }}
              size="small"
              sx={{ backgroundColor: theme.heading, color: theme.background }}
            >
              Change
            </Button>
          </div>
        </div>
      )}

      {isPopupOpen && <div className="login-backdrop" onClick={handlePopupClose}></div>}
    </>
  );
}

export default Login;

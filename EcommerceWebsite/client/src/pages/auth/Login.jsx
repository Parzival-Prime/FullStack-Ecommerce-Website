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
import { setIsLoggedInTrue, setIsAdminTrue } from '../../features/counter/counterSlice.js'

axios.defaults.withCredentials = true;

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()

  const { from } = location.state || "/"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setItemWithExpiry = (key, value, expiryInHours) => {
    const now = new Date()
    const expiry = new Date(now.getTime() + expiryInHours * 60 * 60 * 1000)
    const item = {
      value: value,
      expiry: expiry.getTime()
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axiosInstance.post(`/api/v1/auth/login`, { email, password });

    if (data?.success) {
      setItemWithExpiry('user', data.user, 24)
      dispatch(setIsLoggedInTrue())
      if (data.user.role == 1) {
        dispatch(setIsAdminTrue())
      }
      navigate(from || '/');
      toast.success('User LoggedIn successfully!')
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="login-container">
        <FlexCenter
          sx={{ flexDirection: "column", marginBottom: "3rem", gap: "5px" }}
        >
          <h1>SignIn</h1>
          <div>Hi, Welcome back you've been missed</div>
        </FlexCenter>

        <FormControl sx={{ gap: "1rem" }} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            required={true}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required={true}
          />
          <span className="forgot" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>

          <Button
            variant="contained"
            sx={{ marginTop: "2rem", marginBottom: "3rem" }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </FormControl>
        {/* <FlexCenter sx={{ gap: "6px" }}>
          <div className="line"></div>
          or SignIn with
          <div className="line"></div>
        </FlexCenter> */}
        <p className="login-No-Account">Don't have account? &nbsp;
          <span className="registerPage-link" onClick={()=>navigate('/register')}>Create One</span>
        </p>
      </div>
    </>
  );
}

export default Login;

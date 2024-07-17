import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import "../../styles/login.css";
import { axiosInstance } from "../../App";

axios.defaults.withCredentials = true;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axiosInstance.post(
      `/api/v1/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    if (data?.success) {
      toast.success("Logged In Successfully");
      console.log(data);
      // navigate("/");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="container">
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
      </div>
    </>
  );
}

export default Login;

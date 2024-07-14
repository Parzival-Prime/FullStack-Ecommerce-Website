import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import {
  Box,
  FormControl,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `http://localhost:3090/api/v1/register`,
      formData
    );

    if (data.success) {
      navigate("/");
    }
  };
  return (
    <>
      <Box
        variant={"div"}
        sx={{
          height: "100vh",
          paddingTop: "2rem",
          background: 'var(--linearGradient1)'
        }}
      >
        <FlexCenter
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "2.5rem",
              fontWeight: '700'
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: ".85rem",
              color: "var(--subTextColor)",
              fontWeight: 'var(--logoFontWeight)'
            }}
          >
            Fill your Information below or register <br /> with your Social
            Account
          </Typography>
        </FlexCenter>

        <FlexCenter>
          <FormControl
            onSubmit={handleSubmit}
            sx={{
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              type="text"
              color="warning"
              focused
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              type="email"
              color="warning"
              focused
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              type="password"
              color="warning"
              focused
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              type="number"
              color="warning"
              focused
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              type="text"
              color="warning"
              focused
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Agree with Terms & Conditions"
              sx={{color: 'var(--subTextColor)'}}
            />
            <Button type="submit" variant="outlined" color="warning">
              Submit
            </Button>
          </FormControl>
        </FlexCenter>
      </Box>
    </>
  );
}

export default Register;

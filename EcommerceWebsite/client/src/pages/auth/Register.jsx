import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import { Box, FormControl, Typography, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Register() {
  const navigate = useNavigate();
  const readyFormData = new FormData();

  const formDataToJson = (formData) => {
    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return jsonObject;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    readyFormData.append("name", formData.name);
    readyFormData.append("email", formData.email);
    readyFormData.append("password", formData.password);
    readyFormData.append("phone", formData.phone);
    readyFormData.append("address", formData.address);
    readyFormData.append("answer", formData.answer);
    readyFormData.append("file", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Form Submitted");
    const { data } = await axios.post(
      `http://localhost:3090/api/v1/auth/register`,
      readyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data.success) {
      console.log(data);
      toast.success("User Created Successfully");
      setFormData("");
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
          background: "var(--linearGradient1)",
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
              fontWeight: "700",
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: ".85rem",
              color: "var(--subTextColor)",
              fontWeight: "var(--logoFontWeight)",
            }}
          >
            Fill your Information below or register <br /> with your Social
            Account
          </Typography>
        </FlexCenter>

        <FlexCenter>
          <Box onSubmit={handleSubmit} component={"form"}>
            <FormControl
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
                multiline
                maxRows={4}
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                type="text"
                color="warning"
                focused
              />
              <TextField
                label="Name of your Pet"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                variant="outlined"
                type="text"
                color="warning"
                focused
              />
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
              </Button>
              <Button type="submit" variant="outlined" color="warning">
                Submit
              </Button>
            </FormControl>
          </Box>
        </FlexCenter>
      </Box>
    </>
  );
}

export default Register;

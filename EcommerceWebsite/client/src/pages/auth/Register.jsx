import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import { Box, FormControl, Typography, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { axiosInstance } from "../../App";
import { yellow, orange } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

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
  const [dateOfBirth, setDateOfBirth] = useState(dayjs('01-january-2000'));
  const readyFormData = new FormData();

  const textFieldRef = useRef(null);


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
    pincode: ""
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
    const file = e.target.files[0]
    readyFormData.append("name", formData.name);
    readyFormData.append("email", formData.email);
    readyFormData.append("password", formData.password);
    readyFormData.append("phone", formData.phone);
    readyFormData.append("dateOfBirth", dateOfBirth.format('DD-MM-YYYY'));
    readyFormData.append("address", formData.address);
    readyFormData.append("pincode", formData.pincode);
    readyFormData.append("answer", formData.answer);
    readyFormData.append("file", file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Form Submitted");
    const { data } = await axiosInstance.post(
      `/api/v1/auth/register`,
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

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);
  return (
    <>
      <Box
        variant={"div"} sx={{ height: "100vh", paddingTop: "6rem", background: "var(--linearGradient1)", }} >
        <FlexCenter sx={{ display: "flex", flexDirection: "column" }} >
          <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: "700", }} >
            Create Account
          </Typography>
          <Typography variant="p" sx={{ fontSize: ".85rem", color: "var(--subTextColor)", fontWeight: "var(--logoFontWeight)", }} >
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  type="number"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        sx={{
                          '& .MuiInputBase-root': {
                            '&.Mui-focused': {
                              borderColor: orange[700], // Color for the focused state
                            },
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: orange[700], // Color for the label in focused state
                            },
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: orange[700], // Default color for the border
                            },
                            '&:hover fieldset': {
                              borderColor: orange[700], // Hover color
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: orange[700], // Color when focused
                            },
                          },
                        }}
                      />
                    ),
                  }}
                />
              </LocalizationProvider>

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
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                variant="outlined"
                type="number"
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

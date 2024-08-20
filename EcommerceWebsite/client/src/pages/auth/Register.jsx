import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlexCenter from "../../components/FlexCenter";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import { Box, FormControl, Typography, Button, TextField } from "@mui/material";
import { RiUploadCloud2Line as CloudUploadIcon } from "@remixicon/react";
import { axiosInstance } from "../../baseurl.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "../../theme/theme";

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
  const theme = useTheme();
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState(dayjs("01-january-2000"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
    pincode: "",
  });
  const [file, setFile] = useState(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const readyFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        readyFormData.append(key, formData[key]);
      });
      readyFormData.append("dateOfBirth", dateOfBirth.format("DD-MM-YYYY"));
      if (file) readyFormData.append("file", file);

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
        toast.success("User Created Successfully");
        navigate("/");
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  const commonTextFieldStyles = {
    '& .MuiInputBase-input': {
      color: theme.heading,
    },
    '& .MuiInputLabel-root': {
      color: theme.heading,
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.heading,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.heading,
      },
      '&:hover fieldset': {
        borderColor: theme.heading,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.heading,
      },
    },
  };

  return (
    <Box
      variant="div"
      sx={{ paddingBlock: "6rem", background: theme.background, color: theme.heading }}
    >
      <FlexCenter sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "700",
            fontFamily: 'var(--sansitaSwashed)',
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
          Fill your Information below or register <br /> with your Social Account
        </Typography>
      </FlexCenter>

      <FlexCenter>
        <Box onSubmit={handleSubmit} component="form">
          <FormControl sx={{ gap: "1rem", marginTop: "2rem" }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              type="text"
              sx={commonTextFieldStyles}
              inputRef={textFieldRef}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              type="email"
              sx={commonTextFieldStyles}
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              type="password"
              sx={commonTextFieldStyles}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              type="number"
              sx={commonTextFieldStyles}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dateOfBirth}
                onChange={(newValue) => setDateOfBirth(newValue)}
                slots={{
                  textField: (params) => (
                    <TextField {...params} sx={commonTextFieldStyles} />
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
              sx={commonTextFieldStyles}
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              variant="outlined"
              type="number"
              sx={commonTextFieldStyles}
            />
            <TextField
              label="Name of your Pet"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              variant="outlined"
              type="text"
              sx={commonTextFieldStyles}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: theme.heading,
                color: theme.background,
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: theme.heading,
                color: theme.background,
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </FlexCenter>
    </Box>
  );
}

export default Register;

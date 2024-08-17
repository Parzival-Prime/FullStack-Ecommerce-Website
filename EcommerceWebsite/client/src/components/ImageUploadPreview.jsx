import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import {useTheme} from '../theme/theme.js'

const ImageUploadPreview = ({  onImageChange }) => {
  const theme = useTheme()
  const showPreview = useSelector((state)=>state.counter.showPreview)

  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(file)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        component="label"
        endIcon={<CloudUploadIcon/>}
        onClick={handleUploadClick}
        sx={{backgroundColor: theme.heading, color: theme.background}}
      >
        Upload Image
      </Button>
      <input
        id="imageUploadInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {showPreview && preview ? (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <img
            src={preview}
            alt="Image Preview"
            style={{
              maxWidth: "6rem",
              maxHeight: "10rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color: theme.heading }}>
          No image selected
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadPreview;

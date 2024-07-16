import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploadPreview = ({  onImageChange }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
      {preview ? (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {/* <Typography variant="h6">Image Preview</Typography> */}
          <img
            src={preview}
            alt="Image Preview"
            style={{
              maxWidth: "9rem",
              maxHeight: "13rem",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No image selected
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadPreview;

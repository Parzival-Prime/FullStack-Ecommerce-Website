import React, { useState } from "react";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import ImageUploadPreview from "../../components/ImageUploadPreview";

function CreateProduct() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (imageData) => {
    console.log(imageData);
    setUploadedImage(imageData);
  };

  return (
    <Box sx={{ height: "90vh", backgroundColor: "limegreen", padding: "15px" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.7rem",
          fontWeight: "400",
          textAlign: "center",
          marginTop: "3rem",
          color: "var(--linearGradient1)",
        }}
      >
        Create Product
      </Typography>
      <Box
        sx={{
          marginTop: "2rem",
          padding: "1rem",
        }}
      >
        <form action="submit">
          <FormControl
            sx={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "var(--linearGradient1)",
            }}
          >
            <TextField
              variant="outlined"
              label="Name of Product"
              required
              focused
              sx={{
                color: "var(--darkColor)",
              }}
            />
            <TextField
              variant="outlined"
              select
              label="Select Category"
              value={""}
              required
              focused
              color="grey"
            />
            <TextField
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField label="Quantity" required focused />
            <TextField
              label="Description"
              multiline
              maxRows={4}
              focused
              required
            />
            <ImageUploadPreview onImageChange={handleImageChange} />
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;

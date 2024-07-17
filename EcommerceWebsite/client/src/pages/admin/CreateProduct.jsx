import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Box,
  FormControl,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import ImageUploadPreview from "../../components/ImageUploadPreview";
import CreateCategory from '../../components/CreateCategory'
import { axiosInstance } from "../../App";

function CreateProduct() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-categories");
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getAllCategories");
    }
  };

  const handleImageChange = (imageData) => {
    console.log(imageData);
    setUploadedImage(imageData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", uploadedImage);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("quantity", quantity);

      const { data } = await axiosInstance.post(
        "/api/v1/product/create-product",
        formData
      );

      if (data?.success) {
        toast.success(data.message);
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setQuantity("");
        setUploadedImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in handleSubmit");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Box
      sx={{ height: "100vh", background: "var(--linearGradient1)", padding: "15px" }}
    >
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
        <form action="submit" onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                color: "var(--darkColor)",
              }}
            />
            <CreateCategory categories={categories} setCategory={setCategory}/>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Quantity"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              maxRows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <ImageUploadPreview onImageChange={handleImageChange} />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;

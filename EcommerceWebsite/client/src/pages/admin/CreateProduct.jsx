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
import { setShowPreviewFalse, setShowPreviewTrue } from "../../features/counter/counterSlice.js";
import { useDispatch } from "react-redux";
import { useTheme } from "../../theme/theme.js";


function CreateProduct() {
  const theme = useTheme()
  const dispatch = useDispatch()
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
    dispatch(setShowPreviewTrue())
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

      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });


      const { data } = await axiosInstance.post(
        "/api/v1/product/create-product",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data?.success) {
        toast.success(data.message);
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setQuantity("");
        setUploadedImage(null);
        dispatch(setShowPreviewFalse())
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
      sx={{ minHeight: "100vh", background: theme.background, padding: "15px", paddingTop: '3rem' }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.7rem",
          fontWeight: "400",
          textAlign: "center",
          marginTop: "3rem",
          color: theme.heading,
          fontFamily: 'var(--sansitaSwashed)'
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
                '& .MuiInputBase-input': {
                  color: theme.heading2, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading2, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading2, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
                '@media (min-width: 700px)': {
                  width: '40rem',
                  alignSelf: 'center'
                }
              }}
            />
            <CreateCategory categories={categories} category={category} setCategory={setCategory} />
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{color: theme.heading}}>$</InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.heading2, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading2, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading2, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
                '@media (min-width: 700px)': {
                  width: '40rem',
                  alignSelf: 'center'
                }
              }}
            />
            <TextField
              label="Quantity"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.heading2, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading2, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading2, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
                '@media (min-width: 700px)': {
                  width: '40rem',
                  alignSelf: 'center'
                }
              }}
            />
            <TextField
              label="Description"
              multiline
              maxRows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.heading2, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.heading2, // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.heading2, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.heading, // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: theme.heading, // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.heading, // Border color when focused
                  },
                },
                '@media (min-width: 700px)': {
                  width: '40rem',
                  alignSelf: 'center'
                }
              }}
            />
            <ImageUploadPreview onImageChange={handleImageChange} />
            <Button type="submit" variant="contained" sx={{backgroundColor: theme.heading, color: theme.background, minWidth: '10rem', maxWidth: '40rem', alignSelf: 'center'}}>
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default CreateProduct;

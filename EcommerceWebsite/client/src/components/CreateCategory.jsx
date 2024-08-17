import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  Select,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import AddCategory from "./AddCategory";
import { useTheme } from '../theme/theme.js'

function CreateCategory({ categories, category, setCategory }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme()
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <FormControl sx={{ width: 330 }}>
          <InputLabel id="select" style={{color: theme.heading}}>Category</InputLabel>
          <Select
            labelId="select"
            id="select-id"
            required
            value={category}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 250,
                  top: 0
                },
              },
            }}
            input={<OutlinedInput id="select-id" label="Select" sx={{
              '& .MuiInputBase-outlined-input': {
                color: theme.heading, // Text color
              },
              '& .MuiInputLabel-root': {
                color: theme.heading, // Label color
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.heading, // Label color
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
            }} />}
          >
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ marginRight: "1rem" }}>
                New Category?
              </Typography>

              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenAdd}
              >
                Add
              </Button>

            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <AddCategory open={Boolean(open)} handleClose={handleClose} />
    </>
  );
}

export default CreateCategory;




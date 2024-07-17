import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  Select,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AddCategory from "./AddCategory";

const dummy = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Electronics",
  },
  {
    id: 4,
    name: "Electronics",
  },
  {
    id: 5,
    name: "Electronics",
  },
  {
    id: 7,
    name: "Electronics",
  },
  {
    id: 8,
    name: "Electronics",
  },
  {
    id: 9,
    name: "Electronics",
  },
  {
    id: 10,
    name: "Electronics",
  },
  {
    id: 11,
    name: "Electronics",
  },
  {
    id: 12,
    name: "Electronics",
  },
  {
    id: 13,
    name: "Electronics",
  },
  {
    id: 14,
    name: "Electronics",
  },
  {
    id: 15,
    name: "Electronics",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  disablePortal: open,
  disableEnforceFocus: open,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateCategory({ categories, category, setCategory }) {
  const [open, setOpen] = useState(false);

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
          <InputLabel id="select">Category</InputLabel>
          <Select
            labelId="select"
            id="select-id"
            required
            onChange={(e) => setCategory(e.target.value)}
            disablePortal={open} // Disable portal when dialog is open
            disableEnforceFocus={open} // Disable enforce focus when dialog is open
            MenuProps={{
              disablePortal: open,
              disableEnforceFocus: open,
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 250,
                },
              },
            }}
            input={<OutlinedInput id="select-id" label="Select" />}
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

              <AddCategory open={Boolean(open)} handleClose={handleClose} />
            </MenuItem>
            {dummy.map((object) => (
              <MenuItem key={object.id} value={object.id}>
                {object.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default CreateCategory;

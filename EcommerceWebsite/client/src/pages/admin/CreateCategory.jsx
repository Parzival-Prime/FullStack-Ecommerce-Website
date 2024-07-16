import React from "react";
import { Box, InputBase, Typography } from "@mui/material";

function CreateCategory() {
  return (
  <>
  <Box sx={{backgroundColor: 'green', height: '70vh'}}>
    <Typography variant="h1" sx={{
        fontSize: '2.7rem',
        fontWeight: '400',
        textAlign: 'center',
        paddingTop: '3rem'
    }}>Create Category</Typography>
    <InputBase>
    Input
    </InputBase>
  </Box>
  </>
  );
}

export default CreateCategory;

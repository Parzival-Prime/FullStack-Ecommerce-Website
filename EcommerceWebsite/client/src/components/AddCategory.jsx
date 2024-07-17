import { useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";
import { axiosInstance } from "../App";

export default function AddCategory({ open, handleClose }) {
  const [name, setName] = useState("");

  const setClose = () => {
    handleClose();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      const { data } = await axiosInstance.post("/api/v1/category/create-category", {
        name,
      });

      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Add Category");
      setClose()
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={setClose}
        sx={{
          '& .MuiDialog-root': {
            top: '-278px'
          },
        }}>
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: "15px" }}
            required
            id="name"
            name="name"
            label="Enter Category Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClose()}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

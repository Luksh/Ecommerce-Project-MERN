import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import { CircularProgress } from "@mui/material";

const DeleteProductDialogue = () => {
  const params = useParams();
  const productId = params?.id;

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isPending, mutate } = useMutation({
    queryKey: ["delete-product"],
    queryFn: async () => {
      return await $axios.delete(`/product/delete/${productId}`);
    },
    onSuccess: () => {
      navigate("/products");
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} fullWidth onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete this product?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible. The product will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="success">
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              mutate();
              handleClose();
            }}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialogue;

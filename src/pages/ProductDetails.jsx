import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetails = () => {
  const params = useParams();
  const productId = params?.id;

  const {} = useQuery({});
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "3rem",
        mt: "5rem",
        width: "70%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="https://media.istockphoto.com/id/136568907/photo/a-purple-winter-parka-for-a-fashion-image.jpg?s=612x612&w=0&k=20&c=fK2_No3CvQnqIY9ti2giLz2w8IaUmSrptu2iSNxd93g="
          alt=""
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">Winter Woolen Jacket</Typography>
        <Chip label="Sonam" variant="outlined" color="success" sx={{ fontSize: "1rem" }} />
        <Typography sx={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Solutrecusandae accusantium dolor aliquam doloremque
          beatae minima asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit. Solutrecusandae accusantium
          dolor aliquam doloremque beatae minima asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Solutrecusandae accusantium dolor aliquam doloremque beatae minima asperiores Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Solutrecusandae accusantium dolor aliquam doloremque beatae minima asperiores
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Solutrecusandae accusantium dolor aliquam doloremque
          beatae minima asperiores Lorem ipsum dolor sit amet consectetur adipisicing elit. Solutrecusandae accusantium
          dolor aliquam doloremque beatae minima asperiores
        </Typography>
        <Typography variant="h6">Price: $50.50</Typography>

        <Chip variant="outlined" color="success" label="Grocery" sx={{ fontSize: "1rem" }} />

        <Typography variant="h6">Available quantity: 10</Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping</Typography>
          <Chip variant="outlined" color="success" label="Yes" sx={{ fontSize: "1rem" }} />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button variant="contained" color="success" startIcon={<EditIcon />} fullWidth>
            Edit
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} fullWidth>
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetails;

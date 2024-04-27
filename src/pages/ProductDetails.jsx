import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fallbackImage } from "../constants/general.constants";
import $axios from "../lib/axios/axios.instance";
import DeleteProductDialogue from "../components/DeleteProductDialogue";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetails = () => {
  const params = useParams();
  const productId = params?.id;

  const { isPending, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  const productDetails = data?.data?.productDetails;

  if (isPending) {
    <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "3rem",
        mt: "5rem",
        width: "70%",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={productDetails?.image || fallbackImage} alt="" />
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
        <Typography variant="h5">{productDetails?.name}</Typography>
        <Chip label={productDetails?.brand} variant="outlined" color="success" sx={{ fontSize: "1rem" }} />
        <Typography sx={{ textAlign: "justify" }}>{productDetails?.description}</Typography>
        <Typography variant="h6">Price: ${productDetails?.price}</Typography>

        <Chip variant="outlined" color="success" label={productDetails?.category} sx={{ fontSize: "1rem" }} />

        <Typography variant="h6">Available quantity: {productDetails?.availableQuantity}</Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free Shipping:</Typography>
          <Chip
            variant="outlined"
            color="success"
            label={productDetails?.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button variant="contained" color="success" startIcon={<EditIcon />} fullWidth>
            Edit
          </Button>
          <DeleteProductDialogue />
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetails;

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Chip, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProductDialogue from "../components/DeleteProductDialogue";
import { fallbackImage } from "../constants/general.constants";
import $axios from "../lib/axios/axios.instance";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetails = () => {
  const [orderedQuantity, setOrderedQuantity] = useState(1);

  const navigate = useNavigate();

  const params = useParams();
  const productId = params?.id;

  const queryClient = useQueryClient();

  // Get user role
  const userRole = localStorage.getItem("role");

  // Fetch product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  // Add item to cart API call
  const { isPending: addItemToCartPending, mutate } = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/item/add", { productId, orderedQuantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-count");
    },
  });

  const productDetails = data?.data?.productDetails;

  if (isPending || addItemToCartPending) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "3rem",
        mt: "1rem",
        width: "70%",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img style={{ width: "450px" }} src={productDetails?.image || fallbackImage} alt="" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <Typography variant="h5">{productDetails?.name}</Typography>
        <Chip label={productDetails?.brand} variant="outlined" color="success" sx={{ fontSize: "1rem" }} />
        <Typography sx={{ textAlign: "justify" }}>{productDetails?.description}</Typography>
        <Typography variant="h6">Price: ${productDetails?.price}</Typography>
        <Chip variant="outlined" color="success" label={productDetails?.category} sx={{ fontSize: "1rem" }} />
        <Typography variant="h6">Available quantity: {productDetails?.availableQuantity}</Typography>

        <Stack direction="row" spacing={2}>
          <Typography variant="h6">Free Shipping:</Typography>
          <Chip
            variant="outlined"
            color="success"
            label={productDetails?.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        {userRole === "seller" && (
          <Stack direction="row" spacing={5} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              fullWidth
              onClick={() => {
                navigate(`/edit-product/${productDetails._id}`);
              }}
            >
              Edit
            </Button>
            <DeleteProductDialogue />
          </Stack>
        )}

        {userRole === "buyer" && (
          <>
            <Stack direction="row">
              <IconButton
                disabled={orderedQuantity === 1}
                onClick={() => {
                  setOrderedQuantity((prev) => prev - 1);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4">{orderedQuantity}</Typography>
              <IconButton
                disabled={orderedQuantity === productDetails?.availableQuantity}
                onClick={() => {
                  setOrderedQuantity((prev) => prev + 1);
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                mutate();
              }}
            >
              Add to cart
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;

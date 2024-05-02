import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import CartItemTable from "../components/CartItemTable";
import OrderSummary from "../components/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import KeepShopping from "../components/KeepShopping";
import $axios from "../lib/axios/axios.instance";

const Cart = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  }); // Fetch cart items list

  const cartData = data?.data?.cartData;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Shopping Cart
      </Typography>
      {cartData?.length === 0 ? (
        <KeepShopping />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", width: "90%" }}
        >
          <CartItemTable cartData={cartData} />
          <OrderSummary />
        </Box>
      )}
    </>
  );
};

export default Cart;

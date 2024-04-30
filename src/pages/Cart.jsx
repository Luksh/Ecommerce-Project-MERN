import { Box } from "@mui/material";
import React from "react";
import CartItemTable from "../components/CartItemTable";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
      <CartItemTable />
      <OrderSummary />
    </Box>
  );
};

export default Cart;

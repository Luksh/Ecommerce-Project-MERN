import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const KeepShopping = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <Typography variant="h6">No items in the cart.</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/products");
        }}
      >
        Keep shopping
      </Button>
    </Box>
  );
};

export default KeepShopping;

import React from "react";
import ProductCard from "../components/ProductCard";
import { Box } from "@mui/material";

const ProductList = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px" }}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Box>
  );
};

export default ProductList;

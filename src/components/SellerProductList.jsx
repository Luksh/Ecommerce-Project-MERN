import { Box, Button, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import ProductCard from "./ProductCard";
import SellProductPrompt from "./SellProductPrompt";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", { page: 1, limit: 5 });
    },
  });

  const productList = data?.data?.productList;

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem" }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate("/add-product");
        }}
      >
        Add Product
      </Button>

      {productList?.length === 0 && <SellProductPrompt />}

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "1rem" }}>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
    </Box>
  );
};

export default SellerProductList;

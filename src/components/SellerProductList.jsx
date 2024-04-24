import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import { Box, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";

const SellerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", { page: 1, limit: 6 });
    },
  });

  const productList = data?.data?.productList;

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px" }}>
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default SellerProductList;

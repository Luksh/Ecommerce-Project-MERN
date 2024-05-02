import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import { Box, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";

const BuyerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer");
    },
  });

  const productList = data?.data?.productList;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px" }}>
      {productList?.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default BuyerProductList;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import { Box, Button, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", { page: 1, limit: 5 });
    },
  });

  const productList = data?.data?.productList;
  console.log(data);

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/add-product");
        }}
        sx={{ marginbottom: "20px" }}
      >
        Add Product
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px" }}>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
    </>
  );
};

export default SellerProductList;

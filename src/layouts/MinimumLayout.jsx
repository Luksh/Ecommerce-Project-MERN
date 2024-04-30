import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MinimumLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default MinimumLayout;

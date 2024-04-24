import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;

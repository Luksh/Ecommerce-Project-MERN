import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#006600",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Typography variant="h5" sx={{ color: "#fff" }}>
        © 2024 Copyright: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footer;

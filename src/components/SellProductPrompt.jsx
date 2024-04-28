import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SellProductPrompt = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <Typography>
        You haven't added any products yet. Listing your products is the first step to unlock the full potential on our
        platform.
      </Typography>
      <Link to="/add-product">
        <Typography variant="h6" sx={{ color: "blue", cursor: "pointer" }}>
          Click here to add a product.
        </Typography>
      </Link>
    </Box>
  );
};

export default SellProductPrompt;

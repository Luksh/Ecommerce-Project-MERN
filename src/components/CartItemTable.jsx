import { CircularProgress, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import $axios from "../lib/axios/axios.instance";
import { Clear } from "@mui/icons-material";

const CartItemTable = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartData = data?.data?.cartData;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">S.N.</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Image</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Product</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Ordered Quantity</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Sub Total</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((item, index) => (
            <TableRow key={item._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">
                <img src={item.image} alt="" style={{ width: "200px" }} />
              </TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.unitPrice}</TableCell>
              <TableCell align="center">{item.orderedQuantity}</TableCell>
              <TableCell align="center">200</TableCell>
              <TableCell align="center">
                <IconButton color="error">
                  <Clear />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemTable;

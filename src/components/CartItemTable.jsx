import { Clear } from "@mui/icons-material";
import { Button, Chip, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import $axios from "../lib/axios/axios.instance";

const CartItemTable = ({ cartData }) => {
  const queryClient = useQueryClient();

  // Clear cart API call
  const { isPending: clearCartPending, mutate: clearCart } = useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/remove");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-list");
    },
  });

  // Remove item from cart API call
  const { isPending: removeItemFromCartPending, mutate: removeItemFromCart } = useMutation({
    mutationKey: ["remove-item-from-cart"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-list"); // Invalidate the cache and refetch the data
    },
  });

  return (
    <TableContainer component={Paper} sx={{ width: 900 }}>
      {(removeItemFromCartPending || clearCartPending) && <LinearProgress />}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>S.N.</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Image</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Product</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Price</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Quantity</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Sub Total</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData?.map((item, index) => (
            <TableRow key={item._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">
                <img src={item.image} alt="" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
              </TableCell>
              <TableCell align="center">
                <Stack spacing={1} alignItems="center">
                  <Typography variant="body2">{item.name}</Typography>
                  <Chip label={item.brand} variant="outlined" color="success" />
                </Stack>
              </TableCell>
              <TableCell align="center">{item.unitPrice}</TableCell>
              <TableCell align="center">{item.orderedQuantity}</TableCell>
              <TableCell align="center">200</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => {
                    removeItemFromCart(item.productId);
                  }}
                >
                  <Clear />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Button variant="contained" color="error" sx={{ margin: "1rem" }} onClick={clearCart}>
          Clear
        </Button>
      </Table>
    </TableContainer>
  );
};

export default CartItemTable;

import { Button, CircularProgress, IconButton, LinearProgress, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import $axios from "../lib/axios/axios.instance";
import { Clear } from "@mui/icons-material";

const CartItemTable = () => {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  }); // Fetch cart items list

  const cartData = data?.data?.cartData;

  // Clear cart API call
  const { isPending: clearCartPending, mutate: clearCart } = useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/remove");
    },
  });

  // Remove item from cart API call
  const { isPending: removeItemFromCartPending, mutate: removeItemFromCart } = useMutation({
    mutationKey: ["remove-item-from-cart"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-list");
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper} sx={{ width: 900 }}>
      {removeItemFromCartPending && <LinearProgress />}
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
              <Typography>Ordered Quantity</Typography>
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

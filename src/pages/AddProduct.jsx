import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { productCategories } from "../constants/general.constants";
import addProductValidationSchema from "../validations/add.product.validation";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/create", values);
    },
    onSuccess: () => {
      navigate("/products");
    },
  });

  return (
    <>
      {isPending && <LinearProgress />}
      <Box
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "1rem" }}
      >
        <Formik
          initialValues={{
            image: null,
            name: "",
            brand: "",
            price: 0,
            availableQuantity: 1,
            freeShipping: false,
            category: "",
            description: "",
          }}
          validationSchema={addProductValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  gap: "10px",
                  width: "350px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                <Typography variant="h5">Add Product</Typography>
                <FormControl>
                  <TextField label="Name" {...formik.getFieldProps("name")} required />
                  {formik.touched.name && formik.errors.name ? (
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField label="Brand" {...formik.getFieldProps("brand")} required />
                  {formik.touched.brand && formik.errors.brand ? (
                    <FormHelperText error>{formik.errors.brand}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField label="Price" {...formik.getFieldProps("price")} type="number" required />
                  {formik.touched.price && formik.errors.price ? (
                    <FormHelperText error>{formik.errors.price}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Available Quantity"
                    {...formik.getFieldProps("availableQuantity")}
                    type="number"
                    required
                  />
                  {formik.touched.availableQuantity && formik.errors.availableQuantity ? (
                    <FormHelperText error>{formik.errors.availableQuantity}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={<Checkbox {...formik.getFieldProps("freeShipping")} />}
                    label="Free Shipping"
                  />
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" {...formik.getFieldProps("category")}>
                    {productCategories.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.category && formik.errors.category ? (
                    <FormHelperText error>{formik.errors.category}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    multiline
                    rows={4}
                    label="Description"
                    {...formik.getFieldProps("description")}
                    required
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormHelperText error>{formik.errors.description}</FormHelperText>
                  ) : null}
                </FormControl>

                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;

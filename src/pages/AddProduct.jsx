import { Box, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import addProductValidationSchema from "../validations/add.product.validation";

const AddProduct = () => {
  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: 0,
          category: "",
          freeShipping: null,
          availableQuantity: 1,
          description: "",
          image: null,
        }}
        validationSchema={addProductValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h3">Add Product</Typography>
              <FormControl>
                <TextField label="Name" {...formik.getFieldProps("name")} />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddProduct;

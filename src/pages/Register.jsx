import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { registerValidationSchema } from "../validations/register.validation";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Box>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "", role: "", gender: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, touched, errors, getFieldProps }) => {
          return (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                gap: "10px",
                width: "300px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
            >
              <Typography variant="h3">Register</Typography>
              <FormControl>
                <TextField label="First Name" {...getFieldProps("firstName")} required />
                {touched.firstName && errors.firstName ? (
                  <FormHelperText error>{errors.firstName}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField label="Last Name" {...getFieldProps("lastName")} required />
                {touched.lastName && errors.lastName ? <FormHelperText error>{errors.lastName}</FormHelperText> : null}
              </FormControl>

              <FormControl>
                <TextField label="Email" {...getFieldProps("email")} required />
                {touched.email && errors.email ? <FormHelperText error>{errors.email}</FormHelperText> : null}
              </FormControl>

              <FormControl>
                <TextField label="Password" {...getFieldProps("password")} required />
                {touched.password && errors.password ? <FormHelperText error>{errors.password}</FormHelperText> : null}
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select label="Role" {...getFieldProps("role")}>
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                </Select>
                {touched.role && errors.role ? <FormHelperText error>{errors.role}</FormHelperText> : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" {...getFieldProps("gender")}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="preferNotToSay">Prefer Not To Say</MenuItem>
                </Select>
                {touched.gender && errors.gender ? <FormHelperText error>{errors.gender}</FormHelperText> : null}
              </FormControl>

              <Button variant="contained" type="submit">
                Register
              </Button>

              <Link to="/login">Already Registered? Login</Link>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Register;

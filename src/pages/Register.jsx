import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../validations/register.validation";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prevValue) => !prevValue);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      navigate("/login");
    },
    onError: (error) => {
      error.response.data.message;
    },
  });

  return (
    <>
      {isPending && <LinearProgress />}
      <Box
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "1rem" }}
      >
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "", role: "", gender: "" }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) => {
            mutate(values);
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
                  gap: "1rem",
                  width: "350px",
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
                  {touched.lastName && errors.lastName ? (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField label="Email" {...getFieldProps("email")} required />
                  {touched.email && errors.email ? <FormHelperText error>{errors.email}</FormHelperText> : null}
                </FormControl>

                {/* <FormControl>
              <TextField label="Password" {...getFieldProps("password")} required />
              {touched.password && errors.password ? <FormHelperText error>{errors.password}</FormHelperText> : null}
            </FormControl> */}

                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    {...getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {touched.password && errors.password ? (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  ) : null}
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
    </>
  );
};

export default Register;

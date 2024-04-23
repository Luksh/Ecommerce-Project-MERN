import { Box, Button, FormControl, FormHelperText, LinearProgress, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import { loginValidationSchema } from "../validations/login.validation";

const Login = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      navigate("/home");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <>
      {isPending && <LinearProgress />}
      <Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
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
                  width: "300px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
              >
                <Typography variant="h3">Login</Typography>
                <FormControl>
                  <TextField label="Email" {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField label="Password" {...formik.getFieldProps("password")} />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>{formik.errors.password}</FormHelperText>
                  ) : null}
                </FormControl>

                <Button variant="contained" type="submit" disabled={isPending}>
                  Login
                </Button>

                <Link to="/register">New here? Register</Link>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default Login;

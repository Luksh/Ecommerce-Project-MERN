import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required.").trim(),
  password: Yup.string().required("Password is required."),
});

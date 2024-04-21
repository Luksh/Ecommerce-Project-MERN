import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .max(30, "First name cannot be more than 30 characters.")
    .required("First name is required."),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim()
    .max(30, "Last name cannot be more than 30 characters."),
  email: Yup.string()
    .email("Invalid email.")
    .required("Email is required.")
    .trim()
    .max(65, "Email cannot be more than 65 characters."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot be more than 20 characters.")
    .required("Password is required."),
  role: Yup.string()
    .required("Role is required.")
    .trim()
    .oneOf(["buyer", "seller"], "Role must be either buyer or seller."),
  gender: Yup.string()
    .trim()
    .oneOf(["male", "female", "preferNotToSay"], "Gender must be either male or female or preferNotToSay."),
});

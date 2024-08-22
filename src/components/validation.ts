import * as Yup from "yup";

export const askCardValidationScheme = Yup.object({
  question: Yup.string().required("Question is required"),
});

export const doCardValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const sayCardValidationSchema = Yup.object({
  statement: Yup.string().required("Statement is required"),
});

export const contactValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at least 10 digits"),
  email: Yup.string().email("Invalid email address"),
  country_code: Yup.string().required("Country code is required"),
});

export const attributeValidationSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  type: Yup.string().required("Type is required"),
});

export const tagValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

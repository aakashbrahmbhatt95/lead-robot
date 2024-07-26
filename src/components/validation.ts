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

import * as Yup from "yup";
import { weekdaysMap } from "./Schedules/Inbound/helper";

export const loginFormValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const askCardValidationScheme = Yup.object({
  question: Yup.string().required("Question is required"),
  response_type: Yup.string().required("Response type is required"),
});

export const doCardValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  action_id: Yup.string().required("Action is required"),
});

export const sayCardValidationSchema = Yup.object({
  statement: Yup.string().required("Statement is required"),
});

export const contactValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric"),
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

const dayValidation = Yup.object().shape({
  active: Yup.boolean(),
  startTime: Yup.string().when("active", {
    is: true, // If active is true, then startTime is required
    then: (schema) => schema.required("Start time is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  endTime: Yup.string().when("active", {
    is: true, // If active is true, then apply the following validations
    then: (schema) =>
      schema
        .required("End time is required")
        .test(
          "is-greater",
          "End time must be later than start time",
          function (value) {
            const { startTime } = this.parent;
            return !startTime || !value || value > startTime;
          }
        ),
    otherwise: (schema) => schema.nullable(),
  }),
});

const scheduleValidation = weekdaysMap.reduce((acc, day) => {
  acc[day] = dayValidation;
  return acc;
}, {} as any); // Define the accumulator type to prevent TypeScript errors

// Main validation schema for the form
export const inboundValidationSchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().min(
    Yup.ref("startDate"),
    "End date must be later than start date"
  ),
  schedule: Yup.object().shape(scheduleValidation), // Apply dynamic schedule validation
});

export const outboundValidationSchema = Yup.object().shape({
  formValues: Yup.array()
    .of(
      Yup.object().shape({
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date().min(
          Yup.ref("startDate"),
          "End date must be later than start date"
        ),
        callTimeStart: Yup.string().required("Call start time is required"),
        callTimeEnd: Yup.string()
          .required("Call end time is required")
          .test(
            "is-greater",
            "Call end time must be later than call start time",
            function (value) {
              const { callTimeStart } = this.parent; // Access the value of callTimeStart
              if (!callTimeStart || !value) return true; // If either field is empty, skip validation
              return value > callTimeStart; // Check if callTimeEnd is later than callTimeStart
            }
          ),
        weeks: Yup.array()
          .of(Yup.string()) // Assuming weeks is an array of string days like ["Monday", "Tuesday"]
          .min(1, "At least one weekday must be selected"),
      })
    )
    .required("At least one schedule is required")
    .min(1, "At least one schedule is required"),
});

export const CampaignValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

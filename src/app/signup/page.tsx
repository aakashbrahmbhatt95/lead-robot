"use client";

import { useState, useEffect } from "react";
import { Formik, Form, useField, FieldAttributes } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import watson from "../../../public/Watson.svg";
import checkcircle from "../../../public/CheckCircle.svg";
import googleicon from "../../../public/Google.svg";
import arrowleft from "../../../public/ArrowLeft.svg";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import eye from "../../../public/eye.svg";
import eyeclosed from "../../../public/EyeClosed.svg";
import { Input } from "@/components/ui/input";
import infoicon from "../../../public/Info.svg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import AutoSubmitToken from "@/components/AutoSubmitToken";

interface FormikInputProps extends FieldAttributes<any> {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const FormikInput: React.FC<FormikInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mt-4 relative">
      <Label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </Label>
      <Input
        {...field}
        {...props}
        className={`rounded-[6px] mt-1 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 absolute text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Signup = () => {
  const [step, setStep] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [formValue, setFormValue] = useState<FormValues | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  interface PasswordRequirementsProps {
    password: string | undefined; // Change the type to handle undefined
  }

  const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
    password,
  }) => {
    const requirements = [
      {
        text: "Between 10 and 20 characters",
        test: (pw: string) => pw.length >= 10 && pw.length <= 20,
      },
      {
        text: "At least one uppercase letter",
        test: (pw: string) => /[A-Z]/.test(pw),
      },
      {
        text: "At least one lowercase letter",
        test: (pw: string) => /[a-z]/.test(pw),
      },
      {
        text: "At least one number",
        test: (pw: string) => /\d/.test(pw),
      },
      {
        text: "At least one special character",
        test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
      },
    ];

    return (
      <ul className="p-2">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            {password && req.test(password) ? (
              <Image
                src={checkcircle}
                alt=""
                className=" text-green-700 w-8 h-8"
              />
            ) : (
              <Image
                src={infoicon}
                alt=""
                className=" text-green-700 w-8 h-8"
              />
            )}
            {req.text}
          </li>
        ))}
      </ul>
    );
  };

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(10, "Password must be at least 10 characters")
      .max(20, "Password must be no more than 20 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  if (!isMounted) return null;

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div
        className={`flex items-center justify-between bg-white ${
          step === "password" || step === "verification"
            ? "w-[50%] xl:w-[30%]"
            : "w-[60%]"
        } rounded-[24px] gap-10 p-8 px-10`}
      >
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          {step === "email" && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailValidationSchema}
              onSubmit={(values) => {
                setStep("name");
              }}
            >
              {({ errors, touched }: any) => (
                <Form className="flex flex-col gap-4 w-full">
                  <Image src={watson} alt="Logo" className="" />
                  <p className="text-[#71717A] text-[20px] ">Hi!</p>
                  <h2 className="text-[#18181B] text-[30px] font-semibold ">
                    Sign up
                  </h2>
                  <p className="text-[#71717A] text-[14px] ">
                    Create an account or login with Google or your personal
                    email.
                  </p>
                  <Button
                    variant={"outline"}
                    className="rounded-[20px] flex items-center gap-4 w-full"
                  >
                    <Image
                      src={googleicon}
                      alt="Google Icon"
                      className="w-6 h-6"
                    />
                    Continue with Google
                  </Button>
                  <div className="flex items-center justify-center my-4 w-full">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <FormikInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />

                  <div className="flex items-center justify-between w-full mt-4">
                    <Link
                      href="/forgot-password"
                      className="text-[14px] underline"
                    >
                      Forgot Password
                    </Link>
                    <Button type="submit" className="rounded-[6px] w-[93px]">
                      Continue
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {step === "name" && (
            <>
              <Button
                variant={"outline"}
                className="w-12 border-none"
                onClick={() => setStep("email")}
              >
                <Image src={arrowleft} alt="" className="w-full" />
              </Button>
              <p className="text-[#71717A] text-[14px] ">Welcome</p>
              <h2 className="text-[#18181B] text-[30px] font-semibold ">
                Create Account
              </h2>
              <p className="text-[#71717A] text-[14px] ">
                Enter your personal details to get started.
              </p>
              <h4 className="text-[20px] font-semibold text-[#18181B]">
                name@email.com
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("password");
                }}
                className="flex flex-col gap-4 w-full"
              >
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="rounded-[6px] w-full mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="rounded-[6px] w-full mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-[6px] w-[93px] ml-auto"
                >
                  Continue
                </Button>
              </form>
            </>
          )}

          {step === "password" && (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={passwordValidationSchema}
              onSubmit={(values) => {
                setStep("verification");
              }}
            >
              {({ errors, touched }: any) => (
                <Form className="flex flex-col gap-4 w-full">
                  <Button
                    variant={"outline"}
                    className="w-12 border-none"
                    onClick={() => setStep("name")}
                  >
                    <Image src={arrowleft} alt="Back" className="w-full" />
                  </Button>
                  <p className="text-[#71717A] text-[14px]">Thank You</p>
                  <h2 className="text-[#18181B] text-[30px] font-semibold">
                    Enter Your Password
                  </h2>
                  <p className="text-[#71717A] text-[14px]">
                    setup a secure password
                  </p>

                  <div className="relative mt-4">
                    <FormikInput
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 h-[40px] -right-12 top-9 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Image src={eyeclosed} alt="" className="w-full" />
                      ) : (
                        <Image src={eye} alt="" className="w-full" />
                      )}
                    </button>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          type="button"
                          className="absolute top-10 -right-16 "
                        >
                          <Image src={infoicon} alt="" className="w-6 h-6" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-64 p-4">
                        <PasswordRequirements password={formValue?.password} />
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="relative mt-4">
                    <FormikInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 h-[40px] -right-12 top-9 pr-3 flex items-center text-sm leading-5"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Image src={eyeclosed} alt="" className="w-full" />
                      ) : (
                        <Image src={eye} alt="" className="w-full" />
                      )}
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="rounded-[6px] w-[93px] ml-auto"
                  >
                    Continue
                  </Button>
                  <AutoSubmitToken setFormValue={setFormValue} />
                </Form>
              )}
            </Formik>
          )}
          {step === "verification" && (
            <div className="flex flex-col gap-3 py-6">
              <div className="flex items-center gap-6">
                <Link href="/login">
                  <Image src={arrowleft} className="" alt="" />
                </Link>
                <p className="text-[#71717A]">Back to login</p>
              </div>
              <h2 className="text-[30px] font-semibold">Check your email</h2>
              <p className="text-[#71717A] text-[14px]">
                We’ve sent you a link to verify your email to:
              </p>
              <h4 className="text-[#18181B] font-semibold">name@email.com</h4>
              <p className="text-[#171717] text-[14px]">
                Didn’t receive the email?{" "}
                <Link href="resend-password-link" className="underline mt-5">
                  Resend password link
                </Link>
              </p>
            </div>
          )}
        </div>
        {(step === "email" || step === "name") && (
          <div className="bg-[#FAFAFA] w-[482px] border border-[#D4D4D8] h-[622px]"></div>
        )}
      </div>
    </main>
  );
};

export default Signup;

"use client";

import { useState, useEffect } from "react";
import { Formik, Form, useField, FieldAttributes } from "formik";
import * as Yup from "yup";
import { Button } from "@/lib/ui/button";
import watson from "../../../public/Watson.svg";
import googleicon from "../../../public/Google.svg";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/lib/ui/label";
import { Input } from "@/lib/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/ui/hover-card";

import { Eye, EyeClosed, ArrowLeft } from "@phosphor-icons/react";
import { Info, CheckCircle } from "@phosphor-icons/react";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, SIGN_UP_URL } from "@/utils/apiConstants";
import { useToast } from "@/lib/ui/use-toast";
import { getCookie } from "cookies-next";
import { SESSION_KEY } from "@/utils/constants";
import { useRouter } from "next/navigation";
import AutoSubmitToken from "@/lib/atoms/AutoSubmitToken";

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
  const router = useRouter();

  useEffect(() => {
    if (getCookie(SESSION_KEY)) {
      router.push("/campaigns");
    }
  }, []);

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
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [step, setStep] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formValue, setFormValue] = useState<FormValues | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegistration = async (payload: any) => {
    const res = await HttpUtil.makePOST(`${BASE_URL}${SIGN_UP_URL}`, {
      email: payload.email,
      password: payload.password,
    });
    if (res.error) {
      res.data.errors.map((ele: any) =>
        toast({
          variant: "destructive",
          description: ele.message || "Something went worng, Please try again!",
        })
      );
    } else {
      toast({
        description: "User Registered Successfully",
      });
      setStep("verification");
    }
  };

  interface PasswordRequirementsProps {
    password: string | undefined;
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
        <p className="text-[#18181B] font-medium text-[16px] mb-3">
          Your password must contain:
        </p>
        {requirements.map((req, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-[#71717A] text-xs"
          >
            {password && req.test(password) ? (
              <CheckCircle size={16} color="#34d399" weight="light" />
            ) : (
              <Info size={16} color="#ef4444" weight="light" />
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

  if (!isMounted) return <div></div>;

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div
        className={`flex items-center justify-between bg-white ${
          step === "password" || step === "verification"
            ? "w-[60%] xl:w-[47%] 2xl:w-[42%]"
            : "w-[60%]"
        } rounded-[24px] gap-10 p-8 px-10`}
      >
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          {step === "email" && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailValidationSchema}
              onSubmit={(values: any) => {
                setDetails({
                  ...details,
                  email: values.email,
                });
                setStep("password");
              }}
            >
              {({ errors, touched }: any) => (
                <Form className="flex flex-col gap-4 w-full">
                  <Image src={watson} alt="Logo" className="" />
                  <p className="text-[#71717A] text-[20px] ">Hi!</p>
                  <h2 className="text-[#18181B] text-[30px] font-semibold custom-h1">
                    Sign up
                  </h2>
                  <p className="text-[#71717A] text-[14px] ">
                    Create an account or login with Google or your personal
                    email.
                  </p>
                  <Button
                    variant="outline"
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
                    <div className="flex items-center gap-3">
                      <Link
                        href="/forgot-password"
                        className="text-[14px] underline"
                      >
                        Forgot Password
                      </Link>
                      <Link href="/login" className="text-[14px] underline">
                        Login
                      </Link>
                    </div>
                    <Button type="submit" className="rounded-[6px] w-[93px]">
                      Continue
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {step === "password" && (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={passwordValidationSchema}
              onSubmit={(values: any) => {
                const payload = {
                  ...details,
                  password: values.password,
                };
                handleRegistration(payload);
              }}
            >
              {({ errors, touched }: any) => (
                <Form className="flex flex-col gap-4 w-full">
                  <Button
                    variant="outline"
                    className="w-12 border-none"
                    onClick={() => setStep("email")}
                  >
                    <ArrowLeft size={20} weight="light" />
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
                      className="absolute inset-y-0 h-[40px] -right-12 top-[40px] w-[36px] flex items-center justify-center text-sm leading-5 rounded-[6px] border border-slate-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeClosed size={16} weight="light" />
                      ) : (
                        <Eye size={16} weight="light" />
                      )}
                    </button>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          type="button"
                          className="absolute inset-y-0 h-[40px] -right-24 top-[40px] w-[36px] flex items-center justify-center text-sm leading-5 rounded-[6px] border border-slate-400"
                        >
                          <Info size={20} weight="light" color="#ef4444" />
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
                      className="absolute inset-y-0 h-[40px] -right-12 top-[40px] w-[36px] flex items-center justify-center text-sm leading-5 rounded-[6px] border border-slate-400"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeClosed size={16} weight="light" />
                      ) : (
                        <Eye size={16} weight="light" />
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
                  <ArrowLeft size={20} weight="light" />
                </Link>
                <p className="text-[#71717A]">Back to login</p>
              </div>
              <h2 className="text-[30px] font-semibold">Check your email</h2>
              <p className="text-[#71717A] text-[14px]">
                We’ve sent you a link to verify your email to:
              </p>
              <h4 className="text-[#18181B] font-semibold">{details.email}</h4>
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

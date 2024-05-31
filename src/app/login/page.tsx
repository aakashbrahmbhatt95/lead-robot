"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import watson from "../../../public/Watson.svg";
import googleicon from "../../../public/Google.svg";
import arrowleft from "../../../public/ArrowLeft.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import eye from "../../../public/eye.svg";
import eyeclosed from "../../../public/EyeClosed.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginAction } from "@/redux/action/login-action";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, LOGIN_URL } from "@/utils/apiConstants";
import { TOKEN_KEY, SESSION_KEY } from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next";

interface LoginFormValues {
  email: string;
  password: string;
}

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [step, setStep] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { login } = useAppSelector((state: any) => state.loginReducer);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div className="flex items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          {step === "email" ? (
            <>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={emailValidationSchema}
                onSubmit={(values: LoginFormValues) => {
                  setEmail(values?.email);
                  setStep("password");
                }}
              >
                <Form className="flex flex-col gap-4 w-full">
                  <Image src={watson} alt="Logo" className="" />
                  <p className="text-[#71717A] text-[20px] ">Hi!</p>
                  <h2 className="text-[#18181B] text-[30px] font-semibold ">
                    Login
                  </h2>
                  <p className="text-[#71717A] text-[14px] ">
                    Continue with Google or your personal Email
                  </p>
                  <div className="relative mt-4">
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <Field
                      as={Input}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="rounded-[6px] w-full mt-1"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs absolute"
                    />
                  </div>
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
              </Formik>
            </>
          ) : (
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
                Login with your password
              </h2>
              <p className="text-[#71717A] text-[14px] ">
                Create an account or login with Google or your personal email.
              </p>
              <Formik
                initialValues={{ password: "" }}
                validationSchema={passwordValidationSchema}
                onSubmit={(values: LoginFormValues) => {
                  const payload = {
                    email: email,
                    password: values?.password,
                  };
                  HttpUtil.makePOST(`${BASE_URL}${LOGIN_URL}`, payload)
                    .then((res) => {
                      if (res.success && res?.data?.meta?.is_authenticated) {
                        console.log('res', res?.data?.meta?.is_authenticated)
                        toast({
                          description: "User Logged In Successfully",
                        });
                        setCookie(TOKEN_KEY, res.data.meta.access_token)
                        setCookie(SESSION_KEY, res.data.meta.session_token)
                        router.push('/')
                      }
                      if (res.error) {
                        res.data.errors.map((ele: any) =>
                          toast({
                            variant: "destructive",
                            description:
                              ele.message ||
                              "Something went worng, Please try again!",
                          })
                        );
                      }
                    })
                    .catch((err: any) => {
                      console.log('err', err)
                      toast({
                        variant: "destructive",
                        description: JSON.stringify(err),
                      });
                    })
                  // dispatch(loginAction(payload));
                }}
              >
                <Form className="flex flex-col gap-4 w-full">
                  <div className="relative mt-4">
                    <Label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <Field
                      as={Input}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="rounded-[6px] mt-1"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 h-[40px] -right-12 top-5 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Image src={eyeclosed} alt="" className="w-full" />
                      ) : (
                        <Image src={eye} alt="" className="w-full" />
                      )}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs absolute top-[70px]"
                    />
                  </div>

                  <p className="text-[12px] text-[##1B1B1B] my-5">
                    By continuing, you agree to the{" "}
                    <Link href="" className="underline">
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="" className="underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="" className="underline">
                      Cookie Notice
                    </Link>
                  </p>
                  <Button
                    type="submit"
                    className="w-[93px] ml-auto rounded-[6px]"
                  >
                    Continue
                  </Button>
                </Form>
              </Formik>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;

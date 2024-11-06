"use client";

import { useState, useEffect } from "react";
import { Button } from "@/lib/ui/button";
import watson from "../../../public/Watson.svg";
import googleicon from "../../../public/Google.svg";
import Image from "next/image";
import { Input } from "@/lib/ui/input";
import Link from "next/link";
import { Label } from "@/lib/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, LOGIN_URL } from "@/utils/apiConstants";
import { TOKEN_KEY, SESSION_KEY } from "@/utils/constants";
import { useToast } from "@/lib/ui/use-toast";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { loginFormValidation } from "@/components/validation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    if (getCookie(SESSION_KEY)) {
      router.push("/campaigns");
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div className="flex items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          <Formik
            enableReinitialize={true}
            initialValues={{ email: "", password: "" }}
            validationSchema={loginFormValidation}
            onSubmit={(values: any) => {
              const payload = {
                email: values?.email,
                password: values?.password,
              };
              HttpUtil.makePOST(`${BASE_URL}${LOGIN_URL}`, payload)
                .then((res) => {
                  if (res.success && res?.data?.meta?.is_authenticated) {
                    toast({
                      description: "User Logged In Successfully",
                    });
                    setCookie(TOKEN_KEY, res.data.meta.access_token);
                    setCookie(SESSION_KEY, res.data.meta.session_token);
                    router.push("/campaigns");
                  }
                  if (res.error) {
                    res.data.errors.map((ele: any) =>
                      toast({
                        variant: "destructive",
                        description:
                          ele.message ||
                          "Something went wrong, Please try again!",
                      })
                    );
                  }
                })
                .catch((err: any) => {
                  toast({
                    variant: "destructive",
                    description: JSON.stringify(err),
                  });
                });
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
              <Button
                variant="outline"
                className="rounded-[20px] flex items-center gap-4 w-full"
              >
                <Image src={googleicon} alt="Google Icon" className="w-6 h-6" />
                Continue with Google
              </Button>
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
                  className="text-red-500 mt-1 text-xs absolute"
                />
              </div>
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
                    <Eye size={16} weight="light" />
                  ) : (
                    <EyeClosed size={16} weight="light" />
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs absolute top-[70px]"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/forgot-password"
                    className="text-[14px] underline"
                  >
                    Forgot Password
                  </Link>
                  <Link href="/signup" className="text-[14px] underline">
                    Sign Up
                  </Link>
                </div>
                <Button type="submit" className="rounded-[6px] w-[93px]">
                  Continue
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default Login;

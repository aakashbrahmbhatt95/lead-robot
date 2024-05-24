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

const Login = () => {
  const [step, setStep] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div className="flex  items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          {step === "email" ? (
            <>
              <Image src={watson} alt="Logo" className="" />
              <p className="text-[#71717A] text-[20px] text-center">Hi!</p>
              <h2 className="text-[#18181B] text-[30px] font-semibold text-center">
                Login
              </h2>
              <p className="text-[#71717A] text-[14px] text-center">
                Continue with Google or your personal Email
              </p>
              <Button
                variant={"outline"}
                className="rounded-[20px] flex items-center gap-4 w-full"
              >
                <Image src={googleicon} alt="Google Icon" className="w-6 h-6" />
                Login with Google
              </Button>
              <div className="flex items-center justify-center my-4 w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
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
              <p className="text-[#71717A] text-[14px] text-center">Welcome</p>
              <h2 className="text-[#18181B] text-[30px] font-semibold text-center">
                Login with your password
              </h2>
              <p className="text-[#71717A] text-[14px] text-center">
                Create an account or login with Google or your personal email.
              </p>
            </>
          )}

          {step === "email" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("password");
              }}
              className="flex flex-col gap-4 w-full"
            >
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="rounded-[6px] w-full mt-1"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <Link href="/forgot-password" className="text-[14px] underline">
                  Forgot Password
                </Link>
                <Button type="submit" className="rounded-[6px] w-[93px]">
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-4 w-full">
              <div className="relative mt-4">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
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
              <Button type="submit" className="w-[93px] ml-auto rounded-[6px]">
                Continue
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;

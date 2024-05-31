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
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, LOGIN_URL, REQUEST_PASSWORD } from "@/utils/apiConstants";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleForgotPassword = async () => {
    HttpUtil.makePOST(`${BASE_URL}${REQUEST_PASSWORD}`, {
      email,
    })
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          toast({
            description:
              "Instructions to reset your password have been sent to your email ID",
          });
        }
        if (res.error) {
          res.data.errors.map((ele: any) =>
            toast({
              variant: "destructive",
              description:
                ele.message || "Something went worng, Please try again!",
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
    setStep("checkEmail");
  };

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div className="flex items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          {step === "email" && (
            <>
              <div className="flex items-center">
                {" "}
                <Button
                  variant={"outline"}
                  className="w-12 border-none"
                  onClick={() => setStep("email")}
                >
                  <Image src={arrowleft} alt="" className="w-full" />
                </Button>
                <p className="text-[#71717A] text-[14px] text-center">
                  Back to Login
                </p>
              </div>

              <h2 className="text-[#18181B] text-[30px] font-semibold text-center">
                Forgot Your Password ?
              </h2>
              <p className="text-[#71717A] text-[14px] text-center">
                We’ll send you instructions to reset it.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
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
                    type="text"
                    placeholder="name@company.com"
                    required
                    className="rounded-[6px] w-full mt-1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <Link
                    href="login-with-email-link"
                    className="text-[#171717] underline"
                  >
                    Login with email link instead
                  </Link>
                  <Button
                    type="submit"
                    className="rounded-[6px] text-[14px] ml-auto"
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            </>
          )}
          {step === "checkEmail" && (
            <div className="flex flex-col gap-3 py-6">
              <div className="flex items-center gap-6">
                <Link href="/login">
                  <Image src={arrowleft} className="" alt="" />
                </Link>
                <p className="text-[#71717A]">Back to login</p>
              </div>
              <h2 className="text-[30px] font-semibold">Check your email</h2>
              <p className="text-[#71717A] text-[14px]">
                Instructions to reset your password have been sent to:
              </p>
              <h4 className="text-[#18181B] font-semibold">{email}</h4>
              <p className="text-[#171717] text-[14px] mt-4">
                Didn’t receive the email?{" "}
                <Link href="resend-password-link" className="underline mt-5">
                  Resend password link
                </Link>
              </p>
            </div>
          )}

          {step === "password" && (
            <>
              <Button
                variant={"outline"}
                className="w-12 border-none"
                onClick={() => setStep("name")}
              >
                <Image src={arrowleft} alt="Back" className="w-full" />
              </Button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("verification");
                }}
                className="flex flex-col gap-4 w-full"
              >
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
                <div className="relative mt-4">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    className="rounded-[6px] mt-1"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 h-[40px] -right-12 top-5 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Image src={eyeclosed} alt="" className="w-full" />
                    ) : (
                      <Image src={eye} alt="" className="w-full" />
                    )}
                  </button>
                </div>
                <p className="text-[12px] text-[#1B1B1B] my-5">
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
              </form>
            </>
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
      </div>
    </main>
  );
};

export default ForgotPassword;

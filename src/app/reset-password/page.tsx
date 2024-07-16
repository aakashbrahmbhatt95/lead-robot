"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/lib/ui/button";
import arrowleft from "../../../public/ArrowLeft.svg";
import Image from "next/image";
import { Input } from "@/lib/ui/input";
import Link from "next/link";
import { Label } from "@/lib/ui/label";
import eye from "../../../public/eye.svg";
import eyeclosed from "../../../public/EyeClosed.svg";
import { BASE_URL, CHANGE_PASSWORD } from "@/utils/apiConstants";
import { HttpUtil } from "@/utils/http-util";
import { useToast } from "@/lib/ui/use-toast";
import { getCookie, setCookie } from "cookies-next";
import { SESSION_KEY } from "@/utils/constants";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      const temp = {
        current_password: values?.currentPassword,
        new_password: values?.confirmPassword,
      };

      HttpUtil.makePOST(`${BASE_URL}${CHANGE_PASSWORD}`, temp, {
        "X-Session-Token": getCookie(SESSION_KEY),
      })
        .then((res) => {
          if (res.success && res?.data?.meta?.is_authenticated) {
            toast({
              description: "Password Changed Successfully",
            });
            setCookie(SESSION_KEY, res.data.meta.session_token);
            router.push("/");
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
    },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex justify-center items-center bg-[#f4f4f5] min-h-screen">
      <div className="flex items-center justify-center bg-white w-[578px] rounded-[24px] p-8">
        <div className="flex flex-col items-start gap-4 w-full max-w-md">
          <Button variant={"outline"} className="w-12 border-none">
            <Image src={arrowleft} alt="" className="w-full" />
          </Button>
          <p className="text-[#71717A] text-[14px] text-center">Thank You</p>
          <h2 className="text-[#18181B] text-[30px] font-semibold text-center">
            Enter Your Password
          </h2>
          <p className="text-[#71717A] text-[14px] text-center">
            setup a secure password
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div className="relative mt-4">
              <Label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                {...formik.getFieldProps("currentPassword")}
                className="rounded-[6px] mt-1"
              />
              {formik.touched.currentPassword &&
              typeof formik.errors.currentPassword === "string" ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
              <button
                type="button"
                className="absolute inset-y-0 h-[40px] -right-12 top-5 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <Image src={eyeclosed} alt="" className="w-full" />
                ) : (
                  <Image src={eye} alt="" className="w-full" />
                )}
              </button>
            </div>
            <div className="relative mt-4">
              <Label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </Label>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...formik.getFieldProps("newPassword")}
                className="rounded-[6px] mt-1"
              />
              {formik.touched.newPassword &&
              typeof formik.errors.newPassword === "string" ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.newPassword}
                </div>
              ) : null}

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
                {...formik.getFieldProps("confirmPassword")}
                className="rounded-[6px] mt-1"
              />
              {formik.touched.confirmPassword &&
              typeof formik.errors.confirmPassword === "string" ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
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
            <Button type="submit" className="w-[93px] ml-auto rounded-[6px]">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/lib/ui/select";
import { SheetClose, SheetContent } from "../../ui/sheet";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { addSayAction, editSayAction } from "@/redux/action/campaigns-action";
import { useFormik } from "formik";
import { useEffect } from "react";
import { contactValidationSchema } from "@/components/validation";
import { Input } from "../../ui/input";

const EditContactPopup = ({
  isEditContactPopup,
  setIsEditContactPopup,
}: any) => {
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      firstName: isEditContactPopup?.firstName || "",
      lastName: isEditContactPopup?.lastName || "",
      contactNumber: isEditContactPopup?.contactNumber || "",
      email: isEditContactPopup?.email || "",
    },
    enableReinitialize: true,
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
        email: values.email,
      };
      if (isEditContactPopup?.isEdit) {
        dispatch(editSayAction(body, isEditContactPopup?.id));
      } else {
        dispatch(addSayAction(body));
      }
      setIsEditContactPopup(null);
    },
  });

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsEditContactPopup(null)}
        />
      </div>
          <div className="flex items-center justify-between">
            <CardTitle>Edit Contact</CardTitle>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <Label>First Name</Label>
              <Input
                name="firstName"
                className="mt-1"
                placeholder="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-600">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="mt-3">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                className="mt-1"
                placeholder="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-600">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="mt-3">
              <Label>Phone Number</Label>
              <div className="flex w-[100%] gap-2 items-center">
                <div 
                className="w-[30%]">
              <Select
                name="country_code"
                defaultValue={formik.values.country_code}
                onValueChange={(value) =>
                  formik.setFieldValue("country_code", value)
                }
              >
                <SelectTrigger className="w-full mt-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IND +91">IND +91</SelectItem>
                  <SelectItem value="US +1">US +1</SelectItem>
                </SelectContent>
              </Select>
              </div>
                <Input
                  name="contactNumber"
                  className="mt-1 w-[70%]"
                  placeholder="Phone Number"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.contactNumber && formik.errors.contactNumber ? (
                <div className="text-red-600">{formik.errors.contactNumber}</div>
              ) : null}
            </div>
            <div className="mt-3">
              <Label>Email (Optional)</Label>
              <Input
                name="email"
                className="mt-1"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="w-full flex justify-end mt-4">
              <SheetClose asChild>
                <Button type="submit" variant="outline">
                  Save
                </Button>
              </SheetClose>
            </div>
          </form>
    </SheetContent>
  );
};

export default EditContactPopup;

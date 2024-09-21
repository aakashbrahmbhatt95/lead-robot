import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SheetClose, SheetContent } from "../ui/sheet";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch } from "@/redux/store";
import { addDoAction, editDoAction } from "@/redux/action/campaigns-action";
import { X } from "lucide-react";
import { useFormik } from "formik";
import { doCardValidationSchema } from "@/components/validation";

const DoCardPopup = ({
  isDoSetPopup,
  taskSetDetails,
  setIsDoSetPopup,
}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDoSetPopup?.isEdit) {
      formik.setValues({
        name: isDoSetPopup?.data?.name || "",
        number: isDoSetPopup?.data?.number || "",
        description: isDoSetPopup?.data?.description || "",
        action: isDoSetPopup?.action || "",
        is_active: isDoSetPopup?.is_active,
        is_required: isDoSetPopup?.is_required,
      });
    }
  }, [isDoSetPopup?.isEdit]);

  const formik: any = useFormik({
    initialValues: {
      name: isDoSetPopup?.name || "",
      number: isDoSetPopup?.number || "",
      description: isDoSetPopup?.validations?.description || "",
      action: isDoSetPopup?.action || "",
      options: [],
      is_active: isDoSetPopup?.is_active || true,
      is_required: isDoSetPopup?.is_required || true,
    },
    enableReinitialize: true,
    validationSchema: doCardValidationSchema,
    onSubmit: (values) => {
      const body = {
        taskset_id: taskSetDetails?.id,
        order: isDoSetPopup?.isEdit
          ? isDoSetPopup?.order
          : taskSetDetails?.tasks?.length
            ? taskSetDetails?.tasks?.length
            : 0,
        is_required: values.is_required,
        is_active: values.is_active,
        include_condition: "string",
        exclude_condition: "string",
        action: values.action,
        data: {
          name: values.name,
          number: values.number,
          description: values.description,
        },
        instruction: "string",
        say_during: "string",
        say_after: "string",
      };
      if (isDoSetPopup?.isEdit) {
        dispatch(editDoAction(body, isDoSetPopup?.id));
      } else {
        dispatch(addDoAction(body));
      }
      setIsDoSetPopup(null);
    },
  });

  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X className="cursor-pointer" onClick={() => setIsDoSetPopup(null)} />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle> Do </CardTitle>
            <Switch
              checked={formik.values.is_active}
              onCheckedChange={(checked) =>
                formik.setFieldValue("is_active", checked)
              }
            />
          </div>
          <CardDescription>
            Read{" "}
            <Link href="" className="underline">
              what is tool calling?
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-2">
              {formik.values.action && (
                <Select
                  name="action"
                  value={formik.values.action}
                  onValueChange={(value) =>
                    formik.setFieldValue("action", value)
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="end call">End call</SelectItem>
                    <SelectItem value="transfer call">Transfer call</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="reschedule">Reschedule</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
                    <SelectItem value="addcampagin">Add Campaign</SelectItem>
                    <SelectItem value="removecampaign">
                      Remove Campaign
                    </SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="mt-3">
              <Label>Name</Label>
              <Input
                name="name"
                className="mt-1"
                placeholder="Transfer call name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-3">
              <Label className="mt-3">Description (optional)</Label>
              <Textarea
                name="description"
                className="h-[150px] mt-1"
                placeholder="Enter description here..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex items-center space-x-2 mt-5 ">
              <Checkbox
                checked={formik.values.is_required}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("is_required", checked)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            <div className="mt-3">
              <Label>Number</Label>
              <Input
                name="number"
                className="mt-1"
                placeholder="Search your phonebook"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-full flex justify-end mt-4">
              <SheetClose>
                <Button type="submit" variant="outline">
                  Save
                </Button>
              </SheetClose>
            </div>
          </form>
        </CardContent>
      </Card>
    </SheetContent>
  );
};

export default DoCardPopup;

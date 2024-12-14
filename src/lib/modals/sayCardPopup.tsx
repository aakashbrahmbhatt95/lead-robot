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
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { addSayAction, editSayAction } from "@/redux/action/campaigns-action";
import { useFormik } from "formik";
import { useEffect } from "react";
import { sayCardValidationSchema } from "@/components/validation";

const SayCardPopup = ({
  isSaySetPopup,
  taskSetDetails,
  setIsSaySetPopup,
}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSaySetPopup?.isEdit === true) {
      formik.setValues({
        statement: isSaySetPopup.statement || "",
        is_active: isSaySetPopup.is_active,
        is_required: isSaySetPopup.is_required,
      });
    }
  }, [isSaySetPopup?.isEdit]);

  const formik: any = useFormik({
    initialValues: {
      statement: isSaySetPopup?.statement || "",
      is_active: isSaySetPopup?.is_active || true,
      is_required: isSaySetPopup?.is_required || true,
    },
    enableReinitialize: true,
    validationSchema: sayCardValidationSchema,
    onSubmit: (values) => {
      const body = {
        taskset_id: taskSetDetails?.id,
        order: isSaySetPopup?.isEdit
          ? isSaySetPopup?.order
          : taskSetDetails?.tasks?.length
          ? taskSetDetails?.tasks?.length
          : 0,
        is_required: values.is_required,
        is_active: values.is_active,
        include_condition: "string",
        exclude_condition: "string",
        statement: values.statement,
      };
      if (isSaySetPopup?.isEdit) {
        dispatch(editSayAction(body, isSaySetPopup?.id));
      } else {
        dispatch(addSayAction(body));
      }
      setIsSaySetPopup(null);
    },
  });

  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X className="cursor-pointer" onClick={() => setIsSaySetPopup(null)} />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Say</CardTitle>
            <Switch
              checked={formik.values.is_active}
              onCheckedChange={(checked: any) =>
                formik.setFieldValue("is_active", checked)
              }
            />
          </div>
          <CardDescription>
            Explore more in{" "}
            <Link href="" className="underline">
              prompt engineering guide
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Label>Statement</Label>
            <Textarea
              name="statement"
              placeholder="Write statement here..."
              value={formik.values.statement}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.statement && formik.errors.statement ? (
              <div className="text-red-600">{formik.errors.statement}</div>
            ) : null}
            <div className="flex items-center space-x-2 mt-5">
              <Checkbox
                checked={formik.values.is_required}
                onCheckedChange={(checked: any) =>
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

            <div className="w-full flex justify-end mt-4">
              <SheetClose asChild>
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

export default SayCardPopup;

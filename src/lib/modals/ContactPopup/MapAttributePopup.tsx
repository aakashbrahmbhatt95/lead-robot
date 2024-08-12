import { CardTitle } from "../../ui/card";
import { SheetClose, SheetContent } from "../../ui/sheet";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { useFormik } from "formik";
import { attributeValidationSchema } from "@/components/validation";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";

const NewAttributePopup = ({ isNewAttribute, setIsNewAttribute }: any) => {
  const dispatch = useAppDispatch();

  const formik: any = useFormik({
    initialValues: {
      name: isNewAttribute?.name || "",
      type: isNewAttribute?.type || "",
    },
    enableReinitialize: true,
    validationSchema: attributeValidationSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        type: values.type,
      };
      //   if (isNewAttribute?.isEdit) {
      //     dispatch(editSayAction(body, isNewAttribute?.id));
      //   } else {
      //     dispatch(addSayAction(body));
      //   }
      setIsNewAttribute(false);
    },
  });

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsNewAttribute(false)}
        />
      </div>
      <div className="flex items-center justify-between">
        <CardTitle>Create Attribute</CardTitle>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <Label>Name</Label>
          <Input
            name="name"
            className="mt-1"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mt-3">
          <Label>Type</Label>
          <div className="mt-1">
            <Select
              name="type"
              defaultValue={formik.values.type}
              onValueChange={(value) => formik.setFieldValue("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.type && formik.errors.type ? (
              <div className="text-red-600">{formik.errors.type}</div>
            ) : null}
          </div>
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

export default NewAttributePopup;

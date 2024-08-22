import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../lib/ui/select";
import { SheetClose, SheetContent } from "../../lib/ui/sheet";
import { Label } from "../../lib/ui/label";
import { Button } from "../../lib/ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { useFormik } from "formik";
import { Input } from "../../lib/ui/input";
import { useEffect } from "react";
import { CardTitle } from "../../lib/ui/card";
import { attributeTypes } from "./helper";
import {
  addAttributeAction,
  editAttributeAction,
} from "../../redux/action/attributes-action";
import { attributeValidationSchema } from "@/components/validation";

const AttributePopup = ({ isAttributePopup, setIsAttributePopup }: any) => {
  const dispatch = useAppDispatch();
  const isEdit = isAttributePopup !== "add";

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        type: isAttributePopup?.type || "",
        choices: isAttributePopup?.choices || [],
        label: isAttributePopup?.label || "",
        key: isAttributePopup?.key || "",
      });
    }
  }, [isEdit]);

  const formik: any = useFormik({
    initialValues: {
      type: isAttributePopup?.type || "",
      choices: isAttributePopup?.choices || [],
      label: isAttributePopup?.label || "",
    },
    enableReinitialize: true,
    validationSchema: attributeValidationSchema,
    onSubmit: (values) => {
      const body = {
        type: values?.type,
        choices:
          values?.type === "select" && values?.choices?.length
            ? values?.choices
            : [],
        label: values?.label,
        key: values?.label?.trim().replace(/\s+/g, "_").toLowerCase(),
      };
      if (isEdit) {
        dispatch(editAttributeAction(body, isAttributePopup?.id));
      } else {
        dispatch(addAttributeAction(body));
      }
      setIsAttributePopup(null);
    },
  });

  const handleAddChoice = () => {
    formik.setFieldValue("choices", [...formik.values.choices, ""]);
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = formik.values.choices.filter(
      (_: string, i: number) => i !== index
    );
    formik.setFieldValue("choices", newChoices);
  };

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsAttributePopup(null)}
        />
      </div>
      <div className="flex items-center justify-between">
        <CardTitle>{isEdit ? "Edit Attribute" : "Add Attribute"}</CardTitle>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <Label>Label</Label>
          <Input
            name="label"
            className="mt-1"
            placeholder="Label"
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.label && formik.errors.label ? (
            <div className="text-red-600 mt-1">{formik.errors.label}</div>
          ) : null}
        </div>
        <div className="mt-3">
          <Label>Type</Label>
          <Select
            name="type"
            defaultValue={formik.values.type}
            onValueChange={(value) => formik.setFieldValue("type", value)}
          >
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {attributeTypes?.map((ele) => {
                return <SelectItem value={ele?.value}>{ele?.label}</SelectItem>;
              })}
            </SelectContent>
          </Select>
          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-600 mt-1">{formik.errors.type}</div>
          ) : null}
        </div>
        {formik.values.type === "select" && (
          <div className="mt-4">
            <Label className="block">Choices</Label>
            {formik.values.choices.map((choice: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input
                  name={`choices[${index}]`}
                  className="mt-1"
                  placeholder={`Choice ${index + 1}`}
                  value={choice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveChoice(index)}
                >
                  -
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={handleAddChoice}
            >
              + Add Choice
            </Button>
          </div>
        )}
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

export default AttributePopup;

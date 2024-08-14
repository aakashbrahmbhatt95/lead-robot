import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { SheetClose, SheetContent } from "../ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { Button } from "@/lib/ui/button";
import { Textarea } from "@/lib/ui/textarea";
import { Label } from "@/lib/ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { useAppDispatch } from "@/redux/store";
import { addAskAction, editAskAction } from "@/redux/action/campaigns-action";
import { useFormik } from "formik";
import { askCardValidationScheme } from "@/components/validation";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const AskCardPopup = ({
  isAskSetPopup,
  taskSetDetails,
  setIsAskSetPopup,
}: any) => {
  const dispatch = useAppDispatch();
  const [isValidationEnabled, setIsValidationEnabled] = useState(false);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    if (isAskSetPopup?.isEdit === true) {
      formik.setValues({
        question: isAskSetPopup?.question || "",
        response_type: isAskSetPopup?.response_type || "",
        regex_format: isAskSetPopup?.validations?.regex_format || "",
        error_response: isAskSetPopup?.error_response || "",
        options: [],
        is_active: isAskSetPopup.is_active,
        is_required: isAskSetPopup.is_required,
      });
    }
  }, [isAskSetPopup?.isEdit]);

  const formik: any = useFormik({
    initialValues: {
      question: isAskSetPopup?.question || "",
      response_type: isAskSetPopup?.response_type || "",
      regex_format: isAskSetPopup?.validations?.regex_format || "",
      error_response: isAskSetPopup?.error_response || "",
      options: [],
      is_active: isAskSetPopup?.is_active || true,
      is_required: isAskSetPopup?.is_required || true,
    },
    validationSchema: askCardValidationScheme,
    onSubmit: (values) => {
      const body = {
        taskset_id: taskSetDetails?.id,
        order: 0,
        is_required: values?.is_required,
        is_active: values.is_active,
        include_condition: "string",
        exclude_condition: "string",
        question: values.question,
        response_type: values?.response_type,
        error_response: values?.error_response,
        validations: {
          regex_format: values?.regex_format,
        },
      };
      if (isAskSetPopup?.isEdit) {
        dispatch(editAskAction(body, isAskSetPopup?.id));
      } else {
        dispatch(addAskAction(body));
      }
      setIsAskSetPopup(null);
    },
  });

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X className="cursor-pointer" onClick={() => setIsAskSetPopup(null)} />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle> Ask </CardTitle>
            <Switch
              checked={formik.values.is_active}
              onCheckedChange={(checked) =>
                formik.setFieldValue("is_active", checked)
              }
            />
          </div>
          <CardDescription>
            Explore more in
            <Link href="" className="underline ml-1">
              prompt engineering guide
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Label>Question (Ask For)</Label>
            <Textarea
              name="question"
              placeholder="Ask question here..."
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.question && formik.errors.question ? (
              <div className="text-red-600">{formik.errors.question}</div>
            ) : null}
            <div className="mt-5">
              <Label className="mt-5">Response Type</Label>
              <Select
                name="response_type"
                defaultValue={formik.values.response_type}
                onValueChange={(value) =>
                  formik.setFieldValue("response_type", value)
                }
              >
                <SelectTrigger className="w-full mt-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="option">Option</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="yesno">Yes/No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formik.values.response_type === "text" ||
            formik.values.response_type === "number" ? (
              <div className="mt-5">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={isValidationEnabled}
                    onCheckedChange={setIsValidationEnabled}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Add Validation
                  </label>
                </div>
                {isValidationEnabled && (
                  <div className="mt-5 flex flex-col gap-4">
                    <Label>Regex Format</Label>
                    <Textarea
                      name="regex_format"
                      placeholder="Enter regex format"
                      value={formik.values.regex_format}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Label className="mt-3">Error Response (optional)</Label>
                    <Textarea
                      name="error_response"
                      placeholder="Enter error response"
                      value={formik.values.error_response}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                )}
              </div>
            ) : null}
            {formik.values.response_type === "option" ? (
              <div className="mt-5">
                <button
                  className="w-full flex justify-center my-5"
                  onClick={handleAddOption}
                >
                  <Plus />
                </button>
                {options.map((option: any, index: any) => (
                  <Input
                    key={index}
                    placeholder={option}
                    className="mt-2"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                      formik.setFieldValue("options", newOptions);
                    }}
                  />
                ))}
              </div>
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

export default AskCardPopup;

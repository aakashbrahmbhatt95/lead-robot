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
import { Minus, X } from "lucide-react";
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
        options: isAskSetPopup?.validations?.options,
        is_active: isAskSetPopup.is_active,
        is_required: isAskSetPopup.is_required,
      });
      setOptions(isAskSetPopup?.validations?.options);
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
        order: isAskSetPopup?.isEdit
          ? isAskSetPopup?.order
          : taskSetDetails?.tasks?.length
            ? taskSetDetails?.tasks?.length
            : 0,
        is_required: values?.is_required,
        is_active: values.is_active,
        include_condition: "string",
        exclude_condition: "string",
        question: values.question,
        response_type: values?.response_type,
        error_response: values?.error_response,
        validations: {
          regex_format: values?.regex_format,
          options: options,
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
    <SheetContent className="overflow-scroll">
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
              {formik.touched.response_type && formik.errors.response_type ? (
                <div className="text-red-600">
                  {formik.errors.response_type}
                </div>
              ) : null}
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
                {options.map((option: any, index: any) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      placeholder={option}
                      className="flex-grow"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                        formik.setFieldValue("options", newOptions);
                      }}
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        const newOptions = options.filter(
                          (_: any, i: number) => i !== index
                        );
                        setOptions(newOptions);
                        formik.setFieldValue("options", newOptions);
                      }}
                    >
                      <Minus />
                    </button>
                  </div>
                ))}
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={handleAddOption}
                  >
                    <Plus />
                  </button>
                </div>
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

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

const AskCardPopup = ({
  isAskSetPopup,
  taskSetDetails,
}: any) => {
  const dispatch = useAppDispatch();
  const [isValidationEnabled, setIsValidationEnabled] = useState(true);
  const [options, setOptions] = useState<any>([]);
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    setFormData({
      name: isAskSetPopup?.name,
      question: isAskSetPopup?.question,
      responseType: isAskSetPopup?.response_type,
      regexFormat: isAskSetPopup?.validations?.regex_format,
      errorResponse: isAskSetPopup?.error_response,
      options: [],
      is_active: isAskSetPopup?.is_active,
    });
  }, [isAskSetPopup]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleSave = () => {
    const body = {
      taskset_id: taskSetDetails?.id,
      order: isAskSetPopup?.order,
      is_required: true,
      is_active: formData.is_active,
      include_condition: "string",
      exclude_condition: "string",
      question: formData.question,
      response_type: formData.responseType,
      error_response: formData.errorResponse,
      validations: {
        regex_format: formData.regexFormat,
      },
    };
    if (isAskSetPopup?.isEdit) {
      dispatch(editAskAction(body, isAskSetPopup?.id));
    } else {
      dispatch(addAskAction(body));
    }
  };

  return (
    <SheetContent>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle> Ask </CardTitle>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
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
          <div className="mb-5">
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Action Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <Label>Question (Ask For)</Label>
          <Textarea
            name="question"
            placeholder="Ask question here..."
            value={formData.question}
            onChange={handleInputChange}
          />
          <div className="mt-5">
            <Label className="mt-5">Response Type</Label>
            <Select
              name="responseType"
              defaultValue={formData.responseType}
              onValueChange={(value) =>
                setFormData({ ...formData, responseType: value })
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
          {formData.responseType === "text" ||
          formData.responseType === "number" ? (
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
                    name="regexFormat"
                    placeholder="Enter regex format"
                    value={formData.regexFormat}
                    onChange={handleInputChange}
                  />
                  <Label className="mt-3">Error Response (optional)</Label>
                  <Textarea
                    name="errorResponse"
                    placeholder="Enter error response"
                    value={formData.errorResponse}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          ) : null}
          {formData.responseType === "option" ? (
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
                    setFormData({
                      ...formData,
                      options: newOptions,
                    });
                  }}
                />
              ))}
            </div>
          ) : null}
          <div className="w-full flex justify-end mt-4">
            <SheetClose>
              <Button type="button" variant="outline" onClick={handleSave}>
                Save
              </Button>
            </SheetClose>
          </div>
        </CardContent>
      </Card>
    </SheetContent>
  );
};

export default AskCardPopup;

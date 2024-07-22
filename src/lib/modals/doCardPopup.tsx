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
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useAppDispatch } from "@/redux/store";
import { addDoAction, editDoAction } from "@/redux/action/campaigns-action";

const DoCardPopup = ({ isDoSetPopup, taskSetDetails }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData({
      name: isDoSetPopup?.data?.name,
      number: isDoSetPopup?.data?.number,
      description: isDoSetPopup?.data?.description,
      action: isDoSetPopup?.action,
      is_active: isDoSetPopup?.is_active,
      is_required: isDoSetPopup?.is_required,
    });
  }, [isDoSetPopup]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const body = {
      taskset_id: taskSetDetails?.id,
      order: isDoSetPopup?.order,
      is_required: formData?.is_required,
      is_active: formData?.is_active,
      include_condition: "string",
      exclude_condition: "string",
      action: formData?.action,
      data: {
        name: formData?.name,
        number: formData?.number,
        description: formData?.description,
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
  };

  return (
    <SheetContent>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle> Do </CardTitle>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
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
          <div className="mt-2">
            <Select
              name="action"
              defaultValue={formData.action}
              onValueChange={(value) =>
                setFormData({ ...formData, action: value })
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
                <SelectItem value="addcampagin">Add Campagin</SelectItem>
                <SelectItem value="removecampaign">Remove Campaign</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-3">
            <Label>Name</Label>
            <Input
              name="name"
              className="mt-1"
              placeholder="Transfer call name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3">
            <Label className="mt-3">Description (optional)</Label>
            <Textarea
              name="description"
              className="h-[150px] mt-1"
              placeholder="Enter description here..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2 mt-5 ">
            <Checkbox
              checked={formData.is_required}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_required: checked })
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
              value={formData.number}
              onChange={handleInputChange}
            />
          </div>
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

export default DoCardPopup;

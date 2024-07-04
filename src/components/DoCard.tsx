import { useState, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DotsThree,
  CopySimple,
  TrashSimple,
  CalendarBlank,
} from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const DoCard = ({ allClosed, handleToggle, type }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState(inputValue);
  const [isConditionEnabled, setIsConditionEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    setSavedValue(inputValue);
  };

  const toggleCondition = () => {
    setIsConditionEnabled((prev) => !prev);
  };

  const renderFields = () => {
    switch (type) {
      case "end call":
        return (
          <>
            <Label>Name</Label>
            <Input placeholder="Enter Name" />
          </>
        );
      case "transfer call":
        return (
          <>
            <Label>Number</Label>
            <Input placeholder="Enter phone number" />
            <Label>Name</Label>
            <Input placeholder="Enter Name" />
          </>
        );
      case "sms":
        return (
          <>
            <Label>Name</Label>
            <Textarea placeholder="Enter your name" />
            <Label>Number</Label>
            <Input placeholder="Enter phone number" />
          </>
        );
      case "email":
        return (
          <>
            <Label>Name</Label>
            <Input placeholder="Enter name" />
            <Label>Email</Label>
            <Textarea placeholder="Enter your email address" />
          </>
        );
      case "availability":
        return (
          <div className="flex flex-col gap-4">
            <Label>Name</Label>
            <Input placeholder="Calendar availability name" />
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {selectedDate
                    ? selectedDate.toDateString()
                    : "Select Date range"}
                  <CalendarBlank className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Label>Time Zone</Label>
            <Select>
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Select Time Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GMT">GMT</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="PST">PST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "book":
      case "reschedule":
        return (
          <>
            <Label>Appointment</Label>
            <Input placeholder="Enter appointment details" />
          </>
        );
      case "cancel":
        return (
          <>
            <Label>Reason</Label>
            <Textarea placeholder="Enter cancellation reason" />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Sheet>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={allClosed.includes("do") ? "item-1" : undefined}
      >
        <AccordionItem value="item-1">
          <Card className="w-full">
            <CardHeader className="space-y-0 py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AccordionTrigger onClick={() => handleToggle("do")} />
                  <CardTitle className="text-sm">2. Do</CardTitle>
                </div>
                <Switch defaultChecked className="" />
              </div>
            </CardHeader>
            {allClosed.includes("do") && (
              <AccordionContent className="">
                <CardContent className="flex flex-col items-start py-1">
                  <SheetTrigger>
                    {savedValue ? (
                      <p className="text-[#18181B] text-sm">{savedValue}</p>
                    ) : (
                      <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="text-sm border-none focus-visible::outline-none w-full"
                        placeholder="Book a meeting..."
                      />
                    )}
                  </SheetTrigger>
                  <div className="flex items-center gap-4 justify-end mt-4">
                    <Badge>Tool</Badge>
                    <DotsThree size={20} />
                    <CopySimple size={20} />
                    <TrashSimple size={20} />
                    <div className="flex gap-1">
                      <Checkbox id="terms" className="" defaultChecked />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Required
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            )}
          </Card>
        </AccordionItem>
      </Accordion>
      <SheetContent>
        <SheetClose />
        <Card className="w-[330px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>2. Do</CardTitle>
              <Switch defaultChecked />
            </div>
            <CardDescription>
              Read{" "}
              <Link href="" className="underline">
                what is tool calling
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue={type}>
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="end call">End call</SelectItem>
                <SelectItem value="transfer call">Transfer Call</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="reschedule">Reschedule</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
                <SelectItem value="addcampagin">Add Campaign</SelectItem>
                <SelectItem value="removecampaign">Remove Campaign</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2 mt-5">
              <Checkbox id="terms" className="" defaultChecked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            <div className="my-5">{renderFields()}</div>
            <div className="flex items-center gap-4">
              <Switch
                checked={isConditionEnabled}
                onCheckedChange={setIsConditionEnabled}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Condition
              </label>
            </div>
            {isConditionEnabled && (
              <>
                <div className="my-5">
                  <Select defaultValue="include">
                    <SelectTrigger className="w-full mt-3">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="include">Include If</SelectItem>
                      <SelectItem value="exclude">Exclude If</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea placeholder="don't end call if..." />
              </>
            )}
            <Button
              className="bg-black hover:bg-black w-full mt-6"
              onClick={handleSave}
            >
              Save
            </Button>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default DoCard;

import { SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import Link from "next/link";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { DotsThree, CopySimple, TrashSimple } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Badge } from "./ui/badge";

const DoCard = ({ allClosed, handleToggle, type }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState(inputValue);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    setSavedValue(inputValue);
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
            <div className="mb-5">
              <Label>Number</Label>
              <Input placeholder="Search your phonebook" />
            </div>
            <div className="flex items-center gap-4">
              <Switch />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Condition
              </label>
            </div>
            <div className="w-full flex justify-end mt-4">
              <SheetClose>
                <Button variant="outline" onClick={handleSave}>
                  Save
                </Button>
              </SheetClose>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default DoCard;

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

const DoCard = ({ allClosed, handleToggle }: any) => {
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
            {allClosed.includes("do") &&
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
            </AccordionContent>}
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
                stateful multi-prompt agent best practices.
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Prompt</Label>
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="When users ask to book an appointment, book it on the calendar."
            />
            <Button className="w-full mt-4">Connect cal.com account</Button>
            <div className="flex items-center space-x-2 mt-5">
              <Checkbox id="terms" className="" defaultChecked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            <CardTitle className="mt-5">Response</CardTitle>
            <Select>
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Free text</SelectItem>
                <SelectItem value="2">Number</SelectItem>
              </SelectContent>
            </Select>
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

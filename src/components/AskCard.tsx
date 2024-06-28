import { SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "./ui/switch";
import Link from "next/link";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  CaretDown,
  DotsThree,
  CopySimple,
  TrashSimple,
} from "@phosphor-icons/react";
import TaskSheet from "./TaskSheet";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AskCard = ({ allClosed, handleToggle, type }: any) => {
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
        value={allClosed.includes("ask") ? "item-1" : undefined}
      >
        <AccordionItem value="item-1">
          <Card className="w-full">
            <CardHeader className="space-y-0 py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AccordionTrigger onClick={() => handleToggle("ask")} />
                  <CardTitle className="text-sm">1. Ask </CardTitle>
                </div>
                <Switch defaultChecked className="" />
              </div>
            </CardHeader>
            {allClosed.includes("ask") && (
              <AccordionContent>
                <CardContent className="flex flex-col items-start py-1">
                  <SheetTrigger>
                    {savedValue ? (
                      <p className="text-[#18181B] text-sm">{savedValue}</p>
                    ) : (
                      <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="text-sm border-none focus-visible::outline-none"
                        placeholder="begin with saying..."
                      />
                    )}
                  </SheetTrigger>
                  <div className="flex items-center gap-4 justify-end mt-4 w-full">
                    <DotsThree size={20} />
                    <CopySimple size={20} />
                    <TrashSimple size={20} />
                    <div className="flex gap-1 ">
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
              <CardTitle> Ask </CardTitle>
              <Switch defaultChecked />
            </div>
            <CardDescription>
              Explore more in
              <Link href="" className="underline">
                prompt engineering guide
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-5">
              <Label>Name</Label>
              <Input placeholder="Action Name" />
            </div>
            <Label>Question (Ask For)</Label>
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="When users ask to book an appointment, book it on the calendar."
            />
            <div className="mt-5">
              <Label className="mt-5">Response Type</Label>
              <Select defaultValue={type}>
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
            <div className="flex items-center space-x-2 mt-5 ">
              <Checkbox id="terms" className="" defaultChecked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
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

export default AskCard;

import { useState } from "react";
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

const AskCard = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCardClick = () => {
    setIsSheetOpen(true);
  };

  const taskDetails = {
    title: "1. Say",
    description:
      "This verification process helps protect your personal information...",
  };

  return (
    <Sheet>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <Card className="w-full" onClick={handleCardClick}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <AccordionTrigger></AccordionTrigger>
                <CardTitle className="text-sm">1. Ask </CardTitle>
                <Switch defaultChecked className="" />
              </div>
            </CardHeader>
            <AccordionContent>
              <CardContent>
                <p className="text-[#18181B] text-sm">
                  “...this verification process helps protect your personal
                  information...”
                </p>
                <p className="text-[#71717A] text-sm underline">Show more </p>
                <div className="flex items-center gap-4 justify-end mt-4">
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
          </Card>
        </AccordionItem>
      </Accordion>
      <SheetContent>
        <SheetClose />
        <Card className="w-[330px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>1. Ask </CardTitle>
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
            <Textarea placeholder="When users ask to book an appointment, book it on the calendar." />
            <Button className="w-full mt-4">Connect cal.com account</Button>
            <div className="flex items-center space-x-2 mt-5 ">
              <Checkbox id="terms" className="" defaultChecked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            <CardTitle className="mt-5">Response </CardTitle>
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
              <Button variant="outline" className=" ">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>{" "}
      </SheetContent>
    </Sheet>
  );
};

export default AskCard;

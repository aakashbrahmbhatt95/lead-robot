import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import TaskCard from "./TaskCard";
import { Badge } from "./ui/badge";

const DoCard = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Card className="w-[330px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CaretDown size={16} />
                <CardTitle className="text-sm">2. Do </CardTitle>
              </div>
              <Switch defaultChecked className="" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-start">
            <p className="text-[#18181B] text-sm">“Book a meeting”</p>
            <div className="flex items-center gap-4 justify-end mt-4">
              <Badge>Tool</Badge>
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
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetClose />
        <Card className="w-[330px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>2. Do </CardTitle>
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

export default DoCard;

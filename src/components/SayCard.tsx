import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "./ui/switch";
import Link from "next/link";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
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
import TaskCard from "./TaskCard";

const SayCard = () => {
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
      <SheetTrigger>
        <Card className="w-[330px]" onClick={handleCardClick}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CaretDown size={16} />
              <CardTitle className="text-sm">1. Say </CardTitle>
              <Switch defaultChecked className="" />
            </div>
          </CardHeader>
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
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetClose />
        <TaskCard />
      </SheetContent>
    </Sheet>
  );
};

export default SayCard;

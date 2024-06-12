import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "./ui/switch";
import {
  CaretDown,
  DotsThree,
  TrashSimple,
  CopySimple,
  Plus,
} from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addComponent } from "@/redux/componentsSlice";
import DoCard from "./DoCard";
import SayCard from "./SayCard";

const ParentTaskCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const components = useAppSelector((state) => state.components.components);

  const handleAddComponent = (type: string) => {
    dispatch(addComponent(type));
  };

  return (
    <div>
      <Card className="w-[330px]">
        <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center">
          <div className="flex items-center justify-between w-full px-4">
            <CardTitle className="text-sm">Task Set</CardTitle>
            <div className="flex items-center gap-3">
              <DotsThree size={20} />
              <CopySimple size={20} />
              <TrashSimple size={20} />
              <CaretDown size={16} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start mt-4">
          <div className="flex items-center justify-between w-full">
            <p className="text-[#18181B] text-sm font-semibold">
              Agent speaks first
            </p>
            <Switch />
          </div>
          <Input placeholder="AI Responds to user" className="w-full mt-4" />
          <div className="w-full flex justify-center mt-4 relative">
            <Popover>
              <PopoverTrigger>
                <button>
                  <Plus />
                </button>
              </PopoverTrigger>
              <PopoverContent className=" bg-white border rounded shadow-lg p-2 flex justify-between gap-4 items-center">
                <button
                  onClick={() => handleAddComponent("do")}
                  className="px-4 border rounded-md py-1"
                >
                  Do
                </button>
                <button
                  onClick={() => handleAddComponent("say")}
                  className="px-4 border rounded-md py-1"
                >
                  Say
                </button>
                <button
                  onClick={() => handleAddComponent("ask")}
                  className="px-4 border rounded-md py-1"
                >
                  Ask
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentTaskCard;

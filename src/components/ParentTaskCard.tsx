import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "./ui/switch";
import {
  CaretDown,
  DotsThree,
  TrashSimple,
  CopySimple,
  Plus,
  CaretRight,
  PencilSimple,
} from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "./ui/sheet";
import Link from "next/link";
import { Chat, Question, Wrench } from "@phosphor-icons/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const ParentTaskCard: React.FC = () => {
  const renderDropdownItems = () => (
    <div className="flex flex-col p-2">
      <button className="px-4 py-2 text-left hover:bg-gray-100">Text</button>
      <button className="px-4 py-2 text-left hover:bg-gray-100">Number</button>
      <button className="px-4 py-2 text-left hover:bg-gray-100">Option</button>
      <button className="px-4 py-2 text-left hover:bg-gray-100">Date</button>
    </div>
  );
import { useAppSelector } from "@/redux/store";

const ParentTaskCard: React.FC<{ id: string, handleDelete: (id: string) => void, handleCopy: (id: string) => void }> = ({ id, handleDelete, handleCopy }) => {
  const [components, setComponents] = useState<string[]>([]);
  // const components = useAppSelector((state) => state.components.components);
  const [allClosed, setAllClosed] = useState<any>([]);

  const handleAddComponent = (type: string) => {
    setComponents((prevComponents) => [...prevComponents, type]);
  };

  useEffect(() => {
    setAllClosed(components);
  }, [components]);

  const handleToggle = (e: any) => {
    let temp;
    if (allClosed.includes(e)) {
      temp = allClosed.filter((item: any) => item !== e);
    } else {
      temp = [...allClosed, e];
    }
    setAllClosed(temp);
  };

  return (
    <div>
      <Sheet>
        <Card className="w-[330px]">
          <SheetTrigger className="w-full">
            <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center w-full">
              <div className="flex items-center justify-between w-full px-4">
                <CardTitle className="text-sm">Task Set</CardTitle>
                <div className="flex items-center gap-3">
                  <DotsThree size={20} />
                  <CopySimple size={20} onClick={(e) => {
                    e.preventDefault()
                    handleCopy(id)
                  }} />
                  <TrashSimple size={20} onClick={(e) => {
                    e.preventDefault()
                    handleDelete(id)}
                   } />
                  <CaretDown size={16} />
                </div>
              </div>
            </CardHeader>
          </SheetTrigger>
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
                <PopoverContent className="bg-white border rounded shadow-lg p-2 flex justify-between items-center">
                  <Popover>
                    <PopoverTrigger>
                      <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
                        <Chat size={20} />
                        <span className="border-r pr-4">Say</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>{renderDropdownItems()}</PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger>
                      <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
                        <Question size={20} />
                        <span className="border-r pr-4">Ask</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>{renderDropdownItems()}</PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger>
                      <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
                        <Wrench size={20} />
                        <span className="pr-4">Do</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>{renderDropdownItems()}</PopoverContent>
                  </Popover>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          {components.length ? (
            <div className="flex justify-center">
              <button onClick={() => setAllClosed([])}>
                Collapse all actions
              </button>
            </div>
          ) : null}
          <div className="px-3 flex flex-col justify-center items-center w-full gap-5 py-10">
            {components.map((component, index) => {
              if (component === "do")
                return (
                  <DoCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                  />
                );
              if (component === "say")
                return (
                  <SayCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                  />
                );
              if (component === "ask")
                return (
                  <AskCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                  />
                );
              return null;
            })}
          </div>
        </Card>

        <SheetContent>
          <SheetClose />
          <Card className="w-[330px]">
            <CardHeader>
              <div className="flex flex-col items-start">
                <Button variant={"outline"}>
                  <CaretRight />
                </Button>
                <h4 className="font-semibold">Edit Task Set</h4>
              </div>
              <CardDescription>
                <div className="flex items-center gap-3">
                  <p className="font-medium">Assist</p>
                  <PencilSimple />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                Explore more in{" "}
                <Link href="" className="underline">
                  prompt engineering guide
                </Link>
              </div>
              <div className="w-full flex justify-end mt-4">
                <Button variant="outline" className=" ">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ParentTaskCard;

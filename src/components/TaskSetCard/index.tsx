import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { Switch } from "@/lib/ui/switch";
import {
  CaretDown,
  DotsThree,
  TrashSimple,
  CopySimple,
  Plus,
} from "@phosphor-icons/react";
import { Input } from "@/lib/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/lib/ui/popover";
import { Sheet } from "@/lib/ui/sheet";
import { Chat } from "@phosphor-icons/react";
import { deletetaskSetAction } from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";
import SayCard from "./SayCard";
import AskCard from "./AskCard";
import EditTaskSetPopup from "@/lib/modals/editTaskSetPopup";
import { renderDropdownItems } from "./helper";
import AskCardPopup from "@/lib/modals/askCardPopup";
import SayCardPopup from "@/lib/modals/sayCardPopup";
import DoCard from "./DoCard";
import DoCardPopup from "@/lib/modals/doCardPopup";

const TaskSetCard: React.FC<{
  ele: any;
}> = ({ ele }) => {
  const dispatch = useAppDispatch();
  const [isEditTaskSetPopup, setIsEditTaskSetPopup] = useState(null);
  const [isAskSetPopup, setIsAskSetPopup] = useState<any>(null);
  const [isSaySetPopup, setIsSaySetPopup] = useState<any>(null);
  const [isDoSetPopup, setIsDoSetPopup] = useState<any>(null);
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialOpenAccordions: any = {};
    ele?.asks?.forEach((_: any, index: any) => {
      initialOpenAccordions[`ask-${index}`] = true;
    });
    ele?.says?.forEach((_: any, index: any) => {
      initialOpenAccordions[`say-${index}`] = true;
    });
    ele?.dos?.forEach((_: any, index: any) => {
      initialOpenAccordions[`do-${index}`] = true;
    });
    setOpenAccordions(initialOpenAccordions);
  }, [ele]);

  const handleAddComponent = (type: string, subType: string) => {
    const rawValue = Date.now() / 1000;
    const roundedValue = Math.round(rawValue);
    if (type === "ask") {
      setIsAskSetPopup({
        response_type: subType,
        isEdit: false,
        is_active: true,
        order: roundedValue,
      });
    } else if (type === "say") {
      setIsSaySetPopup({
        isEdit: false,
        is_active: true,
        is_required: true,
        order: roundedValue,
      });
    } else if (type === "do") {
      setIsDoSetPopup({
        action: subType,
        isEdit: false,
        is_active: true,
        is_required: true,
        order: roundedValue,
      });
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAllAccordions = () => {
    const newOpenAccordions = Object.keys(openAccordions).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as { [key: string]: boolean }
    );
    setOpenAccordions(newOpenAccordions);
  };

  return (
    <div>
      <Card className="w-[330px]">
        <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center w-full">
          <div className="flex items-center justify-between w-full px-4">
            <CardTitle onClick={() => setIsEditTaskSetPopup(ele)}>
              <p className="text-sm cursor-pointer">{ele?.name}</p>
            </CardTitle>
            <div className="flex items-center ml-3 gap-3">
              <DotsThree size={20} />
              <CopySimple size={20} />
              <TrashSimple
                size={20}
                onClick={() => {
                  dispatch(deletetaskSetAction(ele?.id));
                }}
              />
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
              <PopoverContent className="bg-white border rounded shadow-lg p-2 flex justify-between items-center">
                <button
                  className="px-4 rounded-md py-1 text-sm flex items-center gap-1"
                  onClick={() => handleAddComponent("say", "")}
                >
                  <Chat size={20} />
                  <span>Say</span>
                </button>
                {renderDropdownItems("ask", handleAddComponent)}
                {renderDropdownItems("do", handleAddComponent)}
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <div className="flex justify-center">
          <button onClick={collapseAllAccordions}>Collapse all actions</button>
        </div>
        <div className="px-3 flex flex-col justify-center items-center w-full gap-5 py-10">
          {ele?.asks?.map((askDetail: any, index: any) => {
            return (
              <AskCard
                key={index}
                askDetail={askDetail}
                setIsAskSetPopup={setIsAskSetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`ask-${index}`]}
                toggleAccordion={() => toggleAccordion(`ask-${index}`)}
              />
            );
          })}
          {ele?.says?.map((sayDetail: any, index: any) => {
            return (
              <SayCard
                key={index}
                sayDetail={sayDetail}
                setIsSaySetPopup={setIsSaySetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`say-${index}`]}
                toggleAccordion={() => toggleAccordion(`say-${index}`)}
              />
            );
          })}
          {ele?.dos?.map((doDetail: any, index: any) => {
            return (
              <DoCard
                key={index}
                doDetail={doDetail}
                setIsDoSetPopup={setIsDoSetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`do-${index}`]}
                toggleAccordion={() => toggleAccordion(`do-${index}`)}
              />
            );
          })}
        </div>
      </Card>
      <Sheet
        open={isEditTaskSetPopup !== null}
        onOpenChange={() => setIsEditTaskSetPopup(null)}
      >
        <EditTaskSetPopup
          isEditTaskSetPopup={isEditTaskSetPopup}
          setIsEditTaskSetPopup={setIsEditTaskSetPopup}
        />
      </Sheet>
      <Sheet
        open={isAskSetPopup !== null}
        onOpenChange={() => setIsAskSetPopup(null)}
      >
        <AskCardPopup isAskSetPopup={isAskSetPopup} taskSetDetails={ele} />
      </Sheet>
      <Sheet
        open={isSaySetPopup !== null}
        onOpenChange={() => setIsSaySetPopup(null)}
      >
        <SayCardPopup isSaySetPopup={isSaySetPopup} taskSetDetails={ele} />
      </Sheet>
      <Sheet
        open={isDoSetPopup !== null}
        onOpenChange={() => setIsDoSetPopup(null)}
      >
        <DoCardPopup isDoSetPopup={isDoSetPopup} taskSetDetails={ele} />
      </Sheet>
    </div>
  );
};

export default TaskSetCard;

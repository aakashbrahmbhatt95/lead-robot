import React, { useState } from "react";
import { Card, CardContent } from "@/lib/ui/card";
import { Switch } from "@/lib/ui/switch";
import { editTaskSetAction } from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";

import { Accordion, AccordionContent, AccordionItem } from "@/lib/ui/accordion";
import TaskSetPopover from "./common/TaskSetPopover";
import TaskSetSideBars from "./SubCards/TaskSetSideBars";
import SubCardContainer from "./SubCards/SubCardContainer";
import SubCardHeader from "./SubCards/SubCardHeader";

const TaskSetCard: React.FC<{
  ele: any;
  isCardDraggingRef: any;
  setIsCardDraggingState: any;
}> = ({ ele, isCardDraggingRef, setIsCardDraggingState }) => {
  const dispatch = useAppDispatch();
  const [isEditTaskSetPopup, setIsEditTaskSetPopup] = useState(null);
  const [isAskSetPopup, setIsAskSetPopup] = useState<any>(null);
  const [isSaySetPopup, setIsSaySetPopup] = useState<any>(null);
  const [isDoSetPopup, setIsDoSetPopup] = useState<any>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const handleAddComponent = (type: string, subType: string) => {
    const rawValue = Date.now() / 1000;
    const roundedValue = Math.round(rawValue);

    if (type === "ask") {
      setIsAskSetPopup({
        response_type: subType,
        isEdit: false,
        order: roundedValue,
      });
    } else if (type === "say") {
      setIsSaySetPopup({
        isEdit: false,
        order: roundedValue,
      });
    } else if (type === "do") {
      setIsDoSetPopup({
        action: subType,
        isEdit: false,
        order: roundedValue,
      });
    }
  };

  const toggleTaskAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[330px]"
      value={isAccordionOpen ? "item-1" : ""}
    >
      <AccordionItem value="item-1">
        <Card className="w-[330px]">
          <SubCardHeader
            ele={ele}
            setIsEditTaskSetPopup={setIsEditTaskSetPopup}
            toggleTaskAccordion={toggleTaskAccordion}
          />
          <AccordionContent>
            <CardContent className="flex flex-col items-start mt-4">
              {ele?.is_parent && (
                <div className="flex items-center justify-between w-full">
                  <p className="text-[#18181B] text-sm font-semibold">
                    Agent speaks first
                  </p>
                  <Switch
                    checked={ele?.speak_first}
                    onCheckedChange={(checked: any) =>
                      dispatch(
                        editTaskSetAction(
                          {
                            campaign_id: ele?.campaign,
                            name: ele?.name,
                            speak_first: checked,
                            x_position: ele?.x_position,
                            y_position: ele?.y_position,
                            is_parent: ele?.is_parent,
                          },
                          ele?.id
                        )
                      )
                    }
                  />
                </div>
              )}
              <TaskSetPopover handleAddComponent={handleAddComponent} />
              <SubCardContainer
                ele={ele}
                isCardDraggingRef={isCardDraggingRef}
                setIsCardDraggingState={setIsCardDraggingState}
                setIsAskSetPopup={setIsAskSetPopup}
                setIsSaySetPopup={setIsSaySetPopup}
                setIsDoSetPopup={setIsDoSetPopup}
              />
            </CardContent>
            <TaskSetPopover handleAddComponent={handleAddComponent} />
          </AccordionContent>
        </Card>
        <TaskSetSideBars
          ele={ele}
          isEditTaskSetPopup={isEditTaskSetPopup}
          setIsEditTaskSetPopup={setIsEditTaskSetPopup}
          isAskSetPopup={isAskSetPopup}
          setIsAskSetPopup={setIsAskSetPopup}
          isSaySetPopup={isSaySetPopup}
          setIsSaySetPopup={setIsSaySetPopup}
          isDoSetPopup={isDoSetPopup}
          setIsDoSetPopup={setIsDoSetPopup}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default TaskSetCard;

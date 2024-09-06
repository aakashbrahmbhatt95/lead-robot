import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { Switch } from "@/lib/ui/switch";
import {
  DotsThree,
  TrashSimple,
  CopySimple,
  Plus,
  Chat,
} from "@phosphor-icons/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/lib/ui/popover";
import { Sheet } from "@/lib/ui/sheet";
import {
  copytaskSetAction,
  deletetaskSetAction,
  editTaskSetAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import SayCard from "./SayCard";
import AskCard from "./AskCard";
import EditTaskSetPopup from "@/lib/modals/editTaskSetPopup";
import { DropdownItems } from "./DropdownItems";
import AskCardPopup from "@/lib/modals/askCardPopup";
import SayCardPopup from "@/lib/modals/sayCardPopup";
import DoCard from "./DoCard";
import DoCardPopup from "@/lib/modals/doCardPopup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { taskSetListReducer } from "@/redux/reducer/campaigns-reducer";

const TaskSetCard: React.FC<{ ele: any; isCardDraggingRef: any }> = ({
  ele,
  isCardDraggingRef,
}) => {
  const dispatch = useAppDispatch();
  const [isEditTaskSetPopup, setIsEditTaskSetPopup] = useState(null);
  const [isAskSetPopup, setIsAskSetPopup] = useState<any>(null);
  const [isSaySetPopup, setIsSaySetPopup] = useState<any>(null);
  const [isDoSetPopup, setIsDoSetPopup] = useState<any>(null);
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const { taskSetList }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

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

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOnDragStart = () => {
    isCardDraggingRef.current = true;
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(ele.tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedItem);

    const updatedTaskSetList = taskSetList.map((taskSet: any) => {
      if (taskSet.id === ele?.id) {
        return { ...taskSet, tasks: updatedTasks };
      }
      return taskSet;
    });

    dispatch(taskSetListReducer(updatedTaskSetList));
    isCardDraggingRef.current = false;
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
          <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center w-full">
            <div className="flex items-center justify-between w-full px-4">
              <CardTitle onClick={() => setIsEditTaskSetPopup(ele)}>
                <p className="text-sm cursor-pointer">{ele?.name}</p>
              </CardTitle>
              <div className="flex items-center ml-3 gap-3">
                <DotsThree
                  onClick={() => setIsEditTaskSetPopup(ele)}
                  size={20}
                  className="cursor-pointer"
                />
                <CopySimple
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(copytaskSetAction(ele?.id));
                  }}
                />
                {ele?.is_parent ? null : (
                  <TrashSimple
                    className="cursor-pointer"
                    size={20}
                    onClick={() => {
                      dispatch(deletetaskSetAction(ele?.id));
                    }}
                  />
                )}
                <AccordionTrigger onClick={toggleTaskAccordion} />
              </div>
            </div>
          </CardHeader>
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
                    {DropdownItems("ask", handleAddComponent)}
                    {DropdownItems("do", handleAddComponent)}
                  </PopoverContent>
                </Popover>
              </div>
              <DragDropContext
                onDragEnd={handleOnDragEnd}
                onDragStart={handleOnDragStart}
              >
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="px-3 flex flex-col justify-center items-center w-full gap-5 pt-10"
                    >
                      {ele?.tasks?.map((taskDetail: any, index: any) => (
                        <Draggable
                          key={taskDetail.id}
                          draggableId={`${taskDetail.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full"
                            >
                              {taskDetail?.type === "ask" ? (
                                <AskCard
                                  askDetail={taskDetail}
                                  setIsAskSetPopup={setIsAskSetPopup}
                                  taskSetDetails={ele}
                                  isOpen={openAccordions[`ask-${index}`]}
                                  toggleAccordion={() =>
                                    toggleAccordion(`ask-${index}`)
                                  }
                                />
                              ) : taskDetail?.type === "do" ? (
                                <DoCard
                                  doDetail={taskDetail}
                                  setIsDoSetPopup={setIsDoSetPopup}
                                  taskSetDetails={ele}
                                  isOpen={openAccordions[`do-${index}`]}
                                  toggleAccordion={() =>
                                    toggleAccordion(`do-${index}`)
                                  }
                                />
                              ) : taskDetail?.type === "say" ? (
                                <SayCard
                                  sayDetail={taskDetail}
                                  setIsSaySetPopup={setIsSaySetPopup}
                                  taskSetDetails={ele}
                                  isOpen={openAccordions[`say-${index}`]}
                                  toggleAccordion={() =>
                                    toggleAccordion(`say-${index}`)
                                  }
                                />
                              ) : null}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
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
                  {DropdownItems("ask", handleAddComponent)}
                  {DropdownItems("do", handleAddComponent)}
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </Card>
        <Sheet open={isEditTaskSetPopup !== null}>
          {isEditTaskSetPopup !== null && (
            <EditTaskSetPopup
              isEditTaskSetPopup={isEditTaskSetPopup}
              setIsEditTaskSetPopup={setIsEditTaskSetPopup}
            />
          )}
        </Sheet>
        <Sheet open={isAskSetPopup !== null}>
          {isAskSetPopup !== null && (
            <AskCardPopup
              isAskSetPopup={isAskSetPopup}
              taskSetDetails={ele}
              setIsAskSetPopup={setIsAskSetPopup}
            />
          )}
        </Sheet>
        <Sheet open={isSaySetPopup !== null}>
          {isSaySetPopup !== null && (
            <SayCardPopup
              isSaySetPopup={isSaySetPopup}
              taskSetDetails={ele}
              setIsSaySetPopup={setIsSaySetPopup}
            />
          )}
        </Sheet>
        <Sheet open={isDoSetPopup !== null}>
          {isDoSetPopup !== null && (
            <DoCardPopup
              isDoSetPopup={isDoSetPopup}
              taskSetDetails={ele}
              setIsDoSetPopup={setIsDoSetPopup}
            />
          )}
        </Sheet>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskSetCard;

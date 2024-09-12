import React, { useState } from "react";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import AskCard from "./AskCard";
import DoCard from "./DoCard";
import SayCard from "./SayCard";
import { useAppDispatch } from "@/redux/store";
import SortableItem from "./SubCardSortableItem";
import {
  editAskAction,
  editDoAction,
  editSayAction,
} from "@/redux/action/campaigns-action";

const SubCardContainer = ({
  ele,
  isCardDraggingRef,
  setIsCardDraggingState,
  setIsAskSetPopup,
  setIsSaySetPopup,
  setIsDoSetPopup,
}: any) => {
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(ele.tasks.map((task: any) => task.id));

  const sortedTasks = [...ele?.tasks].sort((a, b) => a.order - b.order);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  
  const handleOnDragStart = () => {
    isCardDraggingRef.current = true;
    setIsCardDraggingState(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      if (oldIndex !== newIndex) {
        setItems((items: any) => arrayMove(items, oldIndex, newIndex));
      }
      // Update the tasks order in the state
      const updatedTasks = Array.from(ele.tasks);
      const [reorderedItem]: any = updatedTasks.splice(oldIndex, 1);
      if (reorderedItem?.type === "say") {
        dispatch(
          editSayAction(
            {
              taskset_id: ele?.id,
              order: newIndex,
              is_required: reorderedItem.is_required,
              is_active: reorderedItem.is_active,
              include_condition: reorderedItem?.include_condition,
              exclude_condition: reorderedItem?.exclude_condition,
              statement: reorderedItem.statement,
            },
            reorderedItem?.id
          )
        );
      } else if (reorderedItem?.type === "ask") {
        dispatch(
          editAskAction(
            {
              taskset_id: reorderedItem?.id,
              order: newIndex,
              is_required: reorderedItem?.is_required,
              is_active: reorderedItem.is_active,
              include_condition: "string",
              exclude_condition: "string",
              question: reorderedItem.question,
              response_type: reorderedItem?.response_type,
              error_response: reorderedItem?.error_response,
              validations: {
                regex_format: reorderedItem?.regex_format,
              },
            },
            reorderedItem?.id
          )
        );
      } else if (reorderedItem?.type === "do") {
        dispatch(
          editDoAction(
            {
              taskset_id: ele?.id,
              order: newIndex,
              is_required: reorderedItem.is_required,
              is_active: reorderedItem.is_active,
              include_condition: "string",
              exclude_condition: "string",
              action: reorderedItem.action,
              data: {
                name: reorderedItem.name,
                number: reorderedItem.number,
                description: reorderedItem.description,
              },
              instruction: "string",
              say_during: "string",
              say_after: "string",
            },
            reorderedItem?.id
          )
        );
      }
      isCardDraggingRef.current = false;
      setIsCardDraggingState(false);
    }
  };

  const sensors = useSensors(useSensor(MouseSensor));
  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleDragEnd}
      // sensors={sensors}
    >
      <SortableContext items={items}>
        {sortedTasks?.map((taskDetail: any, index: any) => (
          <SortableItem key={taskDetail.id} id={taskDetail.id}>
            {taskDetail?.type === "ask" ? (
              <AskCard
                askDetail={taskDetail}
                setIsAskSetPopup={setIsAskSetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`ask-${index}`]}
                toggleAccordion={() => toggleAccordion(`ask-${index}`)}
              />
            ) : taskDetail?.type === "do" ? (
              <DoCard
                doDetail={taskDetail}
                setIsDoSetPopup={setIsDoSetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`do-${index}`]}
                toggleAccordion={() => toggleAccordion(`do-${index}`)}
              />
            ) : taskDetail?.type === "say" ? (
              <SayCard
                sayDetail={taskDetail}
                setIsSaySetPopup={setIsSaySetPopup}
                taskSetDetails={ele}
                isOpen={openAccordions[`say-${index}`]}
                toggleAccordion={() => toggleAccordion(`say-${index}`)}
              />
            ) : null}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SubCardContainer;

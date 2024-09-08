import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SayCard from "./SayCard";
import AskCard from "./AskCard";
import DoCard from "./DoCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { taskSetListReducer } from "@/redux/reducer/campaigns-reducer";

const SubCardContainer = ({
  ele,
  isCardDraggingRef,
  setIsAskSetPopup,
  setIsSaySetPopup,
  setIsDoSetPopup,
}: any) => {
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useAppDispatch();

  const { taskSetList }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

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
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      <Droppable droppableId="droppable">
        {(provided: any) => (
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
                {(provided: any) => (
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
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SubCardContainer;

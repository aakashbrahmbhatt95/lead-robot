import AskCardPopup from "@/lib/modals/askCardPopup";
import DoCardPopup from "@/lib/modals/doCardPopup";
import EditTaskSetPopup from "@/lib/modals/editTaskSetPopup";
import SayCardPopup from "@/lib/modals/sayCardPopup";
import { Sheet } from "@/lib/ui/sheet";

const TaskSetSideBars = ({
  isEditTaskSetPopup,
  setIsEditTaskSetPopup,
  isAskSetPopup,
  setIsAskSetPopup,
  isSaySetPopup,
  setIsSaySetPopup,
  isDoSetPopup,
  setIsDoSetPopup,
  ele,
}: any) => {
  return (
    <>
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
    </>
  );
};

export default TaskSetSideBars;

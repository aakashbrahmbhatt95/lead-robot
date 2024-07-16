import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/lib/ui/sheet";
import { Input } from "@/lib/ui/input";

const TaskSheet = ({ taskDetails }: any) => {
  return (
    <div className="">
      <h2>Edit Task</h2>
      <div className="space-y-4">
        <div>
          <label>Task Title</label>
          <Input value={taskDetails.title} />
        </div>
        <div>
          <label>Task Description</label>
          <Input value={taskDetails.description} />
        </div>
      </div>
    </div>
  );
};

export default TaskSheet;

import { DotsThree, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SheetClose, SheetContent } from "../ui/sheet";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/store";
import {
  deletetaskSetAction,
  editTaskSetAction,
} from "@/redux/action/campaigns-action";
import { X } from "lucide-react";

const EditTaskSetPopup = ({
  isEditTaskSetPopup,
  setIsEditTaskSetPopup,
}: any) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(isEditTaskSetPopup?.name);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setName(isEditTaskSetPopup?.name);
  }, [isEditTaskSetPopup]);

  const handleEditTask = () => {
    const body = {
      campaign_id: isEditTaskSetPopup?.campaign,
      name: name,
      speak_first: false,
      x_position: isEditTaskSetPopup?.x_position,
      y_position: isEditTaskSetPopup?.y_position,
    };
    setIsEditTaskSetPopup(null);
    dispatch(editTaskSetAction(body, isEditTaskSetPopup?.id));
  };

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => {
            setIsEditTaskSetPopup(null);
            setIsEdit(false);
          }}
        />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-sm">
              Edit {isEditTaskSetPopup?.name}
            </CardTitle>
            <div className="flex items-center gap-3">
              <DotsThree size={20} />
              <PencilSimple
                className="cursor-pointer"
                size={20}
                onClick={() => setIsEdit(true)}
              />
              <TrashSimple
                size={20}
                className="cursor-pointer"
                onClick={() => {
                  dispatch(deletetaskSetAction(isEditTaskSetPopup?.id));
                  setIsEditTaskSetPopup(null);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start mt-4">
          {isEdit && (
            <>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                className="mt-2"
                onClick={handleEditTask}
                disabled={name === ""}
              >
                Save
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </SheetContent>
  );
};

export default EditTaskSetPopup;

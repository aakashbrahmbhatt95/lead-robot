import { DotsThree, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SheetContent } from "../ui/sheet";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/store";
import {
  deletetaskSetAction,
  editTaskSetAction,
} from "@/redux/action/campaigns-action";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const EditTaskSetPopup = ({
  isEditTaskSetPopup,
  setIsEditTaskSetPopup,
}: any) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);

  useEffect(() => {
    setFormValues({
      name: isEditTaskSetPopup?.name,
      is_parent: isEditTaskSetPopup?.is_parent,
    });
  }, [isEditTaskSetPopup]);

  const handleEditTask = () => {
    const body = {
      campaign_id: isEditTaskSetPopup?.campaign,
      name: formValues?.name,
      speak_first: false,
      x_position: isEditTaskSetPopup?.x_position,
      y_position: isEditTaskSetPopup?.y_position,
      is_parent: formValues?.is_parent,
    };
    setIsEditTaskSetPopup(null);
    dispatch(editTaskSetAction(body, isEditTaskSetPopup?.id));
  };

  return (
    <SheetContent className="overflow-scroll">
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
                value={formValues?.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
              <div className="flex items-center space-x-2 mt-5">
                <Checkbox
                  checked={formValues.is_parent}
                  onCheckedChange={(checked: any) => {
                    setFormValues({ ...formValues, is_parent: checked });
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  is Parent
                </label>
              </div>
              <Button
                className="mt-4"
                onClick={handleEditTask}
                disabled={formValues?.name === ""}
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

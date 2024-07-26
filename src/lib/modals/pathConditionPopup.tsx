import { Button } from "@/lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { SheetClose, SheetContent } from "@/lib/ui/sheet";
import { Textarea } from "@/lib/ui/textarea";
import {
  deletePathConditionAction,
  editPathConditionAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";
import { PencilSimple } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useState } from "react";

const PathConditionPopup = ({
  isOpenEditPathCondition,
  setIsOpenEditPathCondition,
}: any) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    dispatch(
      editPathConditionAction(
        {
          from_taskset_id: isOpenEditPathCondition?.source,
          to_taskset_id: isOpenEditPathCondition?.target,
          condition: isOpenEditPathCondition?.label,
          description: isOpenEditPathCondition?.description,
        },
        isOpenEditPathCondition?.id
      )
    );
    setIsEdit(false);
  };
  return (
    <SheetContent>
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => {
            setIsOpenEditPathCondition(null);
            setIsEdit(false);
          }}
        />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <CardTitle className="mb-2"> Edit path condition </CardTitle>
          <div className="flex items-center gap-3">
            {isEdit ? (
              <Input
                type="text"
                name="name"
                value={isOpenEditPathCondition?.label}
                onChange={(e) => {
                  const temp = {
                    ...isOpenEditPathCondition,
                    label: e.target.value,
                  };
                  setIsOpenEditPathCondition(temp);
                }}
              />
            ) : (
              <>
                <p className="font-medium">{isOpenEditPathCondition?.label}</p>
                <PencilSimple
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setIsEdit(true)}
                />
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-3">
            <Label>Description (Optional)</Label>
            <Textarea
              value={isOpenEditPathCondition?.description}
              onChange={(e) => {
                const temp = {
                  ...isOpenEditPathCondition,
                  description: e.target.value,
                };
                setIsOpenEditPathCondition(temp);
              }}
              className="mt-1"
              placeholder="Transition to reschedule booking"
              disabled={!isEdit}
            />
          </div>
          <CardDescription className="mt-2">
            Describe the condition that triggers the transition to the next
            prompt.
          </CardDescription>
          <div className="w-full flex justify-end mt-5">
            <SheetClose>
              <Button
                type="button"
                variant="outline"
                className="mr-2 border-none"
                onClick={() => {
                  dispatch(
                    deletePathConditionAction(isOpenEditPathCondition?.id)
                  );
                  setIsOpenEditPathCondition(null);
                }}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSave}
                disabled={!isEdit || isOpenEditPathCondition?.label === ""}
              >
                Save
              </Button>
            </SheetClose>
          </div>
        </CardContent>
      </Card>
    </SheetContent>
  );
};

export default PathConditionPopup;

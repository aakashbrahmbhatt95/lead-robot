import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SheetClose, SheetContent } from "../ui/sheet";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { addSayAction, editSayAction } from "@/redux/action/campaigns-action";

const SayCardPopup = ({
  isSaySetPopup,
  taskSetDetails,
}: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData({
      statement: isSaySetPopup?.statement,
      is_active: isSaySetPopup?.is_active,
      is_required: isSaySetPopup?.is_required,
    });
  }, [isSaySetPopup]);

  const handleSave = () => {
    const body = {
      taskset_id: taskSetDetails?.id,
      order: isSaySetPopup?.order,
      is_required: formData.is_required,
      is_active: formData.is_active,
      include_condition: "string",
      exclude_condition: "string",
      statement: formData.statement,
    };
    if (isSaySetPopup?.isEdit) {
      dispatch(editSayAction(body, isSaySetPopup?.id));
    } else {
      dispatch(addSayAction(body));
    }
  };

  return (
    <SheetContent>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Say </CardTitle>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />
          </div>
          <CardDescription>
            Explore more in{" "}
            <Link href="" className="underline">
              prompt engineering guide
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Statement</Label>
          <Textarea
            name="statement"
            placeholder="Write statement here..."
            value={formData.statement}
            onChange={(e) =>
              setFormData({ ...formData, statement: e.target.value })
            }
          />
          <div className="flex items-center space-x-2 mt-5 ">
            <Checkbox
              checked={formData.is_required}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_required: checked })
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Required
            </label>
          </div>

          <div className="w-full flex justify-end mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" onClick={handleSave}>
                Save
              </Button>
            </SheetClose>
          </div>
        </CardContent>
      </Card>
    </SheetContent>
  );
};
export default SayCardPopup;

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { Switch } from "@/lib/ui/switch";
import { Label } from "@/lib/ui/label";
import { Checkbox } from "@/lib/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { DotsThree, CopySimple, TrashSimple } from "@phosphor-icons/react";
import { deleteSaysAction } from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";

const SayCard = ({
  sayDetail,
  setIsSaySetPopup,
  taskSetDetails,
  isOpen,
  toggleAccordion,
}: any) => {
  const dispatch = useAppDispatch();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={isOpen ? "item-1" : null}
    >
      <AccordionItem value="item-1">
        <Card className="w-full">
          <CardHeader className="space-y-0 py-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AccordionTrigger onClick={toggleAccordion} />
                <CardTitle className="text-sm">{sayDetail?.id}. Say</CardTitle>
              </div>
              <Switch defaultChecked={sayDetail?.is_active} />
            </div>
          </CardHeader>
          <AccordionContent>
            <CardContent className="flex flex-col items-start py-1">
              <p className="text-[#18181B] text-sm">{sayDetail?.statement}</p>
              <div className="flex items-center gap-4 justify-end mt-4 w-full">
                <DotsThree
                  size={20}
                  onClick={() =>
                    setIsSaySetPopup({ ...sayDetail, isEdit: true })
                  }
                />
                <CopySimple size={20} />
                <TrashSimple
                  size={20}
                  onClick={() =>
                    dispatch(
                      deleteSaysAction(sayDetail?.id, taskSetDetails?.id)
                    )
                  }
                />
                <div className="flex gap-1 ">
                  <Checkbox defaultChecked={sayDetail?.is_required} />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required
                  </Label>
                </div>
              </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default SayCard;

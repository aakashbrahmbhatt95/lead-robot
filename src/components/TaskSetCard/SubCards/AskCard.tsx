import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Switch } from "@/lib/ui/switch";
import { Label } from "@/lib/ui/label";
import { Checkbox } from "@/lib/ui/checkbox";
import { DotsThree, TrashSimple } from "@phosphor-icons/react";
import {
  deleteAskAction,
  editAskAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";
import { useSortable } from "@dnd-kit/sortable";

const AskCard = ({
  askDetail,
  setIsAskSetPopup,
  taskSetDetails,
  isOpen,
  toggleAccordion,
}: any) => {
  const dispatch = useAppDispatch();
  const { attributes, listeners } = useSortable({ id: askDetail.id });
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={isOpen ? "item-1" : ""}
    >
      <AccordionItem value="item-1">
        <Card className="w-full">
          <CardHeader className="space-y-0 py-0">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-4"
                style={{ flexBasis: "75%" }}
              >
                <AccordionTrigger onClick={toggleAccordion} />
                <CardTitle
                  className="text-sm cursor-move w-full text-start"
                  {...attributes}
                  {...listeners}
                >
                  {askDetail?.order}. Ask
                </CardTitle>
              </div>
              <div style={{ flexBasis: "25%" }}>
                <Switch
                  checked={askDetail?.is_active}
                  onCheckedChange={(checked: any) => {
                    dispatch(
                      editAskAction(
                        {
                          ...askDetail,
                          taskset_id: taskSetDetails?.id,
                          is_active: checked,
                        },
                        askDetail?.id
                      )
                    );
                  }}
                />
              </div>
            </div>
            <p className="text-[#18181B] pt-[8px] pb-1 text-start text-sm break-words">
              {askDetail?.question?.slice(0, 100) + (askDetail?.question?.length > 100 ? "..." : "")}
            </p>
          </CardHeader>
          <AccordionContent>
            <CardContent className="flex flex-col items-start py-1">
              <div className="flex items-center gap-4 justify-end mt-4 w-full">
                <DotsThree
                  className="cursor-pointer"
                  size={20}
                  onClick={() =>
                    setIsAskSetPopup({ ...askDetail, isEdit: true })
                  }
                />
                {/* <CopySimple size={20} className="cursor-pointer" /> */}
                <TrashSimple
                  className="cursor-pointer"
                  size={20}
                  onClick={() => dispatch(deleteAskAction(askDetail?.id))}
                />
                <div className="flex gap-1 items-center">
                  <Checkbox
                    checked={askDetail?.is_required}
                    onCheckedChange={(checked: any) => {
                      dispatch(
                        editAskAction(
                          {
                            ...askDetail,
                            taskset_id: taskSetDetails?.id,
                            is_required: checked,
                          },
                          askDetail?.id
                        )
                      );
                    }}
                  />
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

export default AskCard;

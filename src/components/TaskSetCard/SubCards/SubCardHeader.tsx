import { AccordionTrigger } from "@/lib/ui/accordion";
import { CardHeader, CardTitle } from "@/lib/ui/card";
import {
  copytaskSetAction,
  deletetaskSetAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch } from "@/redux/store";
import { DotsThree, TrashSimple, CopySimple } from "@phosphor-icons/react";

const SubCardHeader = ({
  ele,
  setIsEditTaskSetPopup,
  toggleTaskAccordion,
}: any) => {
  const dispatch = useAppDispatch();

  return (
    <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center w-full">
      <div className="flex items-center justify-between w-full px-4">
        <CardTitle onClick={() => setIsEditTaskSetPopup(ele)}>
          <p className="text-sm cursor-pointer">{ele?.name}</p>
        </CardTitle>
        <div className="flex items-center ml-3 gap-3">
          <DotsThree
            onClick={() => setIsEditTaskSetPopup(ele)}
            size={20}
            className="cursor-pointer"
          />
          <CopySimple
            size={20}
            className="cursor-pointer"
            onClick={() => {
              dispatch(copytaskSetAction(ele?.id));
            }}
          />
          {ele?.is_parent ? null : (
            <TrashSimple
              className="cursor-pointer"
              size={20}
              onClick={() => {
                dispatch(deletetaskSetAction(ele?.id));
              }}
            />
          )}
          <AccordionTrigger onClick={toggleTaskAccordion} />
        </div>
      </div>
    </CardHeader>
  );
};

export default SubCardHeader;

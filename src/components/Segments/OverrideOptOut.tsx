import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Checkbox } from "@/lib/ui/checkbox";

interface OverrideOptOutProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

const OverrideOptOut = ({ values, setFieldValue }: OverrideOptOutProps) => {
  const handleCheckboxChange = (option: string) => {
    setFieldValue("overrideOptOut", option);
  };

  return (
    <div className="py-5 px-3 mt-8 border-[1px] border-gray-300">
      <Accordion type="single" collapsible>
        <AccordionItem value="speechsettings">
          <AccordionTrigger>
            <p className="font-bold">
              Override Opt-Outs:
              <span className="italic font-normal">(advanced)</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center py-3 gap-2 border-t-[1px] border-gray-300">
              <Checkbox
                checked={values.overrideOptOut === "global"}
                onCheckedChange={() => handleCheckboxChange("global")}
              />
              <p>
                <span className="font-bold">
                  Override global opt-out preferences
                </span>{" "}
                and include
              </p>
              <span className="font-bold">0</span>
              <p> contacts who have opted out of all communications.</p>
            </div>
            <div className="flex items-center py-3 gap-2 border-t-[1px] border-gray-300">
              <Checkbox
                checked={values.overrideOptOut === "campaign"}
                onCheckedChange={() => handleCheckboxChange("campaign")}
              />
              <p>
                <span className="font-bold">
                  Override campaign-specific opt-out preferences
                </span>{" "}
                and include
              </p>
              <span className="font-bold">0</span>
              <p> contacts who have opted out of this campaign.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OverrideOptOut;

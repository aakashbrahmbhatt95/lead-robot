import { Input } from "@/lib/ui/input";
import { ArrowRight } from "lucide-react";

interface CallTimeSpreadProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  isEdit: boolean;
}

const CallTimeSpread: React.FC<CallTimeSpreadProps> = ({
  values,
  setFieldValue,
  isEdit,
}) => (
  <div className="flex items-center my-5 ml-3 gap-3">
    <label className="block pl-2 pr-5 text-sm font-medium w-fit text-gray-700">
      Call Time Spread
    </label>
    {!isEdit ? (
      <>
        <Input
          type="time"
          className="w-[120px]"
          name="callTimeStart"
          value={values?.callTimeStart || ""}
          onChange={(e) => setFieldValue("callTimeStart", e.target.value)}
        />
        <ArrowRight />
        <Input
          type="time"
          className="w-[120px]"
          name="callTimeEnd"
          value={values?.callTimeEnd || ""}
          onChange={(e) => setFieldValue("callTimeEnd", e.target.value)}
        />
      </>
    ) : (
      <p className="block pl-2 text-sm font-medium w-[100px] text-gray-700">
        {`${values?.callTimeStart} - ${values?.callTimeEnd}`}
      </p>
    )}
  </div>
);

export default CallTimeSpread;

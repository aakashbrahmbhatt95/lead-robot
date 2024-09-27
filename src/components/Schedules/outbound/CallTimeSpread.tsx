import { Input } from "@/lib/ui/input";
import { ArrowRight } from "lucide-react";
import { ErrorMessage } from "formik";

interface CallTimeSpreadProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  index: number;
  isEdit: boolean;
}

const CallTimeSpread: React.FC<CallTimeSpreadProps> = ({
  values,
  setFieldValue,
  index,
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
          disabled={!values.callTimeStart}
          min={values.callTimeStart || undefined}
        />
        <div className="flex flex-col">
          <ErrorMessage
            name={`formValues.${index}.callTimeStart`}
            component="div"
            className="text-red-500 text-sm"
          />
          <ErrorMessage
            name={`formValues.${index}.callTimeEnd`}
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </>
    ) : (
      <p className="block pl-2 text-sm font-medium text-gray-700">
        {`${values?.callTimeStart} - ${values?.callTimeEnd}`}
      </p>
    )}
  </div>
);

export default CallTimeSpread;

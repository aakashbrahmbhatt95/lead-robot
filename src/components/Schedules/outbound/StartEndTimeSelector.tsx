import { Input } from "@/lib/ui/input";
import { ErrorMessage } from "formik";

const StartEndTimeSelector = ({ values, setFieldValue, outboundData }: any) => {
  return (
    <div className="flex items-center gap-2.5 mx-4">
      <div className="basis-1/2">
        <label className="block mt-3 text-sm font-medium text-gray-700">
          Start
        </label>
        <Input
          className="mt-2 w-full"
          type="date"
          name="startDate"
          value={values?.startDate || ""}
          onChange={(e) => setFieldValue("startDate", e.target.value)}
          disabled={outboundData?.isEdit}
        />
          <ErrorMessage name="startDate" component="div" className="text-red-500 mt-1 text-sm" />
      </div>
      <div className="basis-1/2">
        <label className="block mt-3 text-sm font-medium text-gray-700">
          End
        </label>
        <Input
          className="mt-2 w-full"
          type="date"
          name="endDate"
          value={values?.endDate || ""}
          onChange={(e) => setFieldValue("endDate", e.target.value)}
          min={values?.startDate || undefined}
          disabled={!values?.startDate || outboundData?.isEdit} 
        />
         <ErrorMessage name="endDate" component="div" className="text-red-500 mt-1 text-sm" />
      </div>
    </div>
  );
};

export default StartEndTimeSelector;

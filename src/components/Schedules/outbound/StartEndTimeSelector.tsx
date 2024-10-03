import { Input } from "@/lib/ui/input";
import { ErrorMessage } from "formik";

const StartEndTimeSelector = ({
  values,
  setFieldValue,
  isEdit,
  index,
}: any) => {
  return (
    <div className="grid grid-cols-2 gap-4 mx-4">
      <div className="flex flex-col">
        <label className="block mt-3 text-sm font-medium text-gray-700">
          Start
        </label>
        <Input
          className="mt-1 w-full"
          type="date"
          name={`formValues.${index}.startDate`}
          value={values?.startDate || ""}
          onChange={(e) => setFieldValue("startDate", e.target.value)}
          disabled={isEdit}
        />
        <ErrorMessage
          name={`formValues.${index}.startDate`}
          component="div"
          className="text-red-500 mt-1 text-sm"
        />
      </div>
      <div className="flex flex-col">
        <label className="block mt-3 text-sm font-medium text-gray-700">
          End
        </label>
        <Input
          className="mt-1 w-full placeholder:text-2xl placeholder:font-black"
          type="text"
          name={`formValues.${index}.endDate`}
          value={values?.endDate || ""}
          placeholder={values?.endDate ? "" :  "∞"}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => !values?.endDate && (e.target.type = "text")}
          onChange={(e) => setFieldValue("endDate", e.target.value)}
          min={values?.startDate || undefined}
          disabled={!values?.startDate || isEdit}
        />
        <ErrorMessage
          name={`formValues.${index}.endDate`}
          component="div"
          className="text-red-500 mt-1 text-sm"
        />
      </div>
    </div>
  );
};

export default StartEndTimeSelector;

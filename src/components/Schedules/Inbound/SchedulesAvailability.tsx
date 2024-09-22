import { weekdaysMap } from "./helper";
import { Input } from "@/lib/ui/input";
import { Button } from "@/lib/ui/button";
import { ErrorMessage, Form } from "formik";
import DailySchedule from "./DailySchedule";

const ScheduleAvailability = ({
  values,
  setFieldValue,
  isEdit,
  setIsEdit,
  formValues,
}: any) => {
  return (
    <Form>
      <div className="flex items-center gap-2.5">
        <div className="basis-1/2">
          <label className="block mt-3 text-sm font-medium text-gray-700">
            Start
          </label>
          <Input
            className="mt-2 w-full"
            type="date"
            name="startDate"
            value={values?.startDate}
            onChange={(e) => setFieldValue("startDate", e.target.value)}
            disabled={isEdit}
          />
          <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
        </div>
        <div className="basis-1/2">
          <label className="block mt-3 text-sm font-medium text-gray-700">
            End
          </label>
          <Input
            className="mt-2 w-full"
            type="date"
            name="endDate"
            value={values?.endDate}
            onChange={(e) => setFieldValue("endDate", e.target.value)}
            min={values?.startDate || undefined}
            disabled={!values?.startDate || isEdit} 
          />
         <ErrorMessage name="endDate" component="div" className="text-red-500 mt-1 text-sm" />
        </div>
      </div>

      <p className="text-[20px] mt-[20px] font-semibold text-black">
        Schedule Availability
      </p>

      <div className="border-[1px] mt-4 border-[#E4E4E7] rounded">
        {weekdaysMap.map((day) => (
          <DailySchedule
            key={day}
            day={day}
            values={values}
            setFieldValue={setFieldValue}
            isEdit={isEdit}
            formValues={formValues}
          />
        ))}

        {isEdit && (
          <p
            className="text-sm font-medium mt-[20px] text-gray-700 my-5 ml-3 cursor-pointer underline"
            onClick={() => setIsEdit(false)}
          >
            Edit
          </p>
        )}
      </div>
      {!isEdit && (
        <div className="flex justify-end mt-3">
          <Button variant="outline" type="submit">
            Save
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ScheduleAvailability;

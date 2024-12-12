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
      <p className="text-[20px] mt-[20px] font-semibold text-black">
        Schedule Availability
      </p>

      <div className="border-[1px] mt-4 border-[#E4E4E7] rounded">
        <div className="flex items-center gap-2.5 my-5 mx-3">
          <div className="basis-1/2">
            <label className="block text-sm font-medium text-gray-700">
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
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="basis-1/2">
            <label className="block text-sm font-medium text-gray-700">
              End
            </label>
            <Input
              className="mt-2 w-full placeholder:text-2xl placeholder:font-black"
              type={values?.endDate === "" ? "text" : "date"}
              name="endDate"
              value={values?.endDate === "" ? "" : values?.endDate}
              placeholder={values?.endDate === "" ? "∞" : values?.endDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !values?.endDate && (e.target.type = "text")}
              onChange={(e) => setFieldValue("endDate", e.target.value)}
              min={values?.startDate || undefined}
              disabled={!values?.startDate || isEdit}
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500 mt-1 text-sm"
            />
          </div>
        </div>
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
      </div>
      <div className="flex mt-3">
        {isEdit ? (
          <Button
            variant="outline"
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              setIsEdit(false);
            }}
          >
            Edit
          </Button>
        ) : (
          <Button variant="outline" type="submit">
            Save
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ScheduleAvailability;

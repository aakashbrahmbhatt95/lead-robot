import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Switch } from "@/lib/ui/switch";
import ScheduleOptions from "./ScheduleOption";
import ScheduleAvailability from "./SchedulesAvailability";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import { calculateDuration, dayMap } from "./helper";
import { useAppDispatch } from "@/redux/store";
import {
  addScheduleAction,
  scheduleListAction,
} from "@/redux/action/schedules-action";

const Inbound = () => {
  const dispatch = useAppDispatch();
  const [isAlwaysOn, setIsAlwaysOn] = useState("isalwayson");
  const [excludePublicHolidays, setExcludePublicHolidays] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    schedule: {
      monday: { active: true, startTime: "", endTime: "" },
      tuesday: { active: true, startTime: "", endTime: "" },
      wednesday: { active: true, startTime: "", endTime: "" },
      thursday: { active: true, startTime: "", endTime: "" },
      friday: { active: false, startTime: "", endTime: "" },
      saturday: { active: false, startTime: "", endTime: "" },
      sunday: { active: false, startTime: "", endTime: "" },
    },
    startDate: "",
    endDate: "",
  };

  useEffect(() => {
    dispatch(scheduleListAction());
  }, []);

  const handleSubmit = (values: any) => {
    console.log("values", values);
    const output = [];

    for (const [day, data] of Object.entries(values.schedule)) {
      const dayData = data as any;
      const dayType = day as any;
      if (dayData?.active && dayData?.startTime && dayData?.endTime) {
        output.push({
          interval: 1,
          start_date: values.startDate,
          end_date: values.endDate,
          times: [dayData?.startTime],
          exclude: false,
          duration: calculateDuration(dayData?.startTime, dayData?.endTime),
          byweekday: [dayMap[dayType]],
          bymonthday: [],
          byyeardata: [],
        });
      }
    }
    dispatch(
      addScheduleAction({
        daily: output,
        weekly: [],
        monthly: [],
        yearly: [],
        exdates: [],
        name: "testing",
        description: "testing description",
        rdates: [],
        is_active: true,
      })
    );
    // setFormValues(body)
    setIsEdit(true);
  };

  return (
    <div className="flex">
      <div className="basis-3/4">
        <div className="flex items-center mt-5">
          <Switch checked={true} />
          <label className="block pl-2 text-sm font-medium text-gray-700">
            On
          </label>
        </div>

        <ScheduleOptions
          isAlwaysOn={isAlwaysOn}
          setIsAlwaysOn={setIsAlwaysOn}
        />

        {isAlwaysOn === "scheduled" && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }: any) => (
              <ScheduleAvailability
                values={values}
                setFieldValue={setFieldValue}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                formValues={formValues}
              />
            )}
          </Formik>
        )}
      </div>

      {isAlwaysOn === "scheduled" && (
        <TimeZoneAndHolidays
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          excludePublicHolidays={excludePublicHolidays}
          setExcludePublicHolidays={setExcludePublicHolidays}
        />
      )}
    </div>
  );
};

export default Inbound;

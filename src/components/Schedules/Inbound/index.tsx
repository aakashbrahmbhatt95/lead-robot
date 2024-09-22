import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Switch } from "@/lib/ui/switch";
import ScheduleOptions from "./ScheduleOption";
import ScheduleAvailability from "./SchedulesAvailability";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import {
  calculateDuration,
  dayMap,
  addScheduleHandler,
  getScheduleHandler,
  editScheduleHandler,
} from "./helper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { inboundValidationSchema } from "@/components/validation";

const Inbound = () => {
  const dispatch = useAppDispatch();
  const [scheduleSettings, setScheduleSettings] = useState({
    isAlwaysOn: "isalwayson",
    excludePublicHolidays: "",
    timeZone: "",
    isEdit: false,
    scheduleId: null,
    formValues: null,
  });

  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (campaignDataById?.inbound_schedule === null) {
      setScheduleSettings((prev: any) => ({
        ...prev,
        isEdit: false,
        formValues: {
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
        },
      }));
    } else {
      //Todo Hardcoded Id
      getScheduleHandler(
        campaignDataById?.inbound_schedule,
        setScheduleSettings
      );
      // getScheduleHandler(4, setScheduleSettings);
    }
  }, [campaignDataById]);

  const handleSubmit = (values: any) => {
    const output = Object.entries(values.schedule)
      .filter(
        ([, data]: any) => data?.active && data?.startTime && data?.endTime
      )
      .map(([day, data]: any) => ({
        interval: 1,
        start_date: values.startDate,
        end_date: values.endDate,
        times: [data?.startTime],
        exclude: false,
        duration: calculateDuration(data?.startTime, data?.endTime),
        byweekday: [dayMap[day]],
        bymonthday: [],
        byyeardata: [],
      }));
    if (scheduleSettings?.scheduleId === null) {
      addScheduleHandler(campaignDataById, dispatch, output);
    } else {
      editScheduleHandler(setScheduleSettings, scheduleSettings, output);
    }
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
          isAlwaysOn={scheduleSettings.isAlwaysOn}
          setIsAlwaysOn={(value) =>
            setScheduleSettings((prev) => ({ ...prev, isAlwaysOn: value }))
          }
        />

        {scheduleSettings.isAlwaysOn === "scheduled" && (
          <Formik
            initialValues={scheduleSettings?.formValues}
            validationSchema={inboundValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <ScheduleAvailability
                values={values}
                setFieldValue={setFieldValue}
                isEdit={scheduleSettings.isEdit}
                setIsEdit={(value: any) =>
                  setScheduleSettings((prev) => ({ ...prev, isEdit: value }))
                }
                formValues={scheduleSettings.formValues}
              />
            )}
          </Formik>
        )}
      </div>

      {scheduleSettings.isAlwaysOn === "scheduled" && (
        <TimeZoneAndHolidays
          timeZone={scheduleSettings.timeZone}
          setTimeZone={(value) =>
            setScheduleSettings((prev) => ({ ...prev, timeZone: value }))
          }
          excludePublicHolidays={scheduleSettings.excludePublicHolidays}
          setExcludePublicHolidays={(value) =>
            setScheduleSettings((prev) => ({
              ...prev,
              excludePublicHolidays: value,
            }))
          }
        />
      )}
    </div>
  );
};

export default Inbound;

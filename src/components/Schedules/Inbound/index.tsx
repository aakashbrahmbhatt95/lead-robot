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
import { editCampaignsAction } from "@/redux/action/campaigns-action";

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
    if (campaignDataById?.inbound_schedule_id === null) {
      setScheduleSettings((prev: any) => ({
        ...prev,
        isEdit: false,
        isAlwaysOn: "isalwayson",
        excludePublicHolidays: campaignDataById?.exclude_holidays_country,
        timeZone: campaignDataById?.timezone,
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
      getScheduleHandler(
        campaignDataById?.inbound_schedule_id,
        setScheduleSettings,
        campaignDataById?.exclude_holidays_country,
        campaignDataById?.timezone
      );
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
        end_date: values.endDate || undefined,
        times: [data?.startTime],
        exclude: false,
        duration: calculateDuration(data?.startTime, data?.endTime),
        byweekday: [dayMap[day]],
        bymonthday: [],
        byyeardata: [],
      }));
    if (scheduleSettings?.scheduleId === null) {
      addScheduleHandler(campaignDataById, dispatch, output, scheduleSettings);
    } else {
      editScheduleHandler(
        setScheduleSettings,
        scheduleSettings,
        output,
        dispatch,
        campaignDataById
      );
    }
  };

  return (
    <div className="flex">
      <div className="basis-3/4">
        <div className="flex items-center mt-5">
          <Switch
            checked={campaignDataById.inbound_active}
            onCheckedChange={(checked) => {
              dispatch(
                editCampaignsAction(
                  {
                    ...campaignDataById,
                    inbound_active: checked,
                  },
                  campaignDataById?.id
                )
              );
            }}
          />
          <label className="block pl-2 text-sm font-medium text-gray-700">
            On
          </label>
        </div>
        {campaignDataById.inbound_active && (
          <ScheduleOptions
            isAlwaysOn={scheduleSettings.isAlwaysOn}
            setIsAlwaysOn={(value) =>
              setScheduleSettings((prev) => ({ ...prev, isAlwaysOn: value }))
            }
          />
        )}

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
          isEdit={scheduleSettings.isEdit}
        />
      )}
    </div>
  );
};

export default Inbound;

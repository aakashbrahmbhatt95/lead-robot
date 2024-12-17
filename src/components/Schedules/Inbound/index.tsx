import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Switch } from "@/lib/ui/switch";
import ScheduleOptions from "./ScheduleOption";
import ScheduleAvailability from "./SchedulesAvailability";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import {
  calculateDuration,
  dayMap,
} from "./helper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { inboundValidationSchema } from "@/components/validation";
import { editCampaignsAction } from "@/redux/action/campaigns-action";
import { addInboundScheduleAction, editInboundScheduleAction, getInboundScheduleAction } from "@/redux/action/schedules-action";

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
const [isInboundActive,setIsInboundActive] = useState(false)

  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(()=>{
  dispatch(getInboundScheduleAction(setScheduleSettings))
},[])

useEffect(()=>{
  setIsInboundActive(campaignDataById?.inbound_active)
},[campaignDataById])

  const handleSubmit = (values: any) => {
    const body =  {
      daily: Object.entries(values.schedule)
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
      })),
      weekly: [],
      monthly: [],
      yearly: [],
      exdates: [],
      name: campaignDataById?.name,
      description: campaignDataById?.description,
      rdates: [],
      is_active: true,
  }
    if (scheduleSettings?.scheduleId === null) {
      dispatch(addInboundScheduleAction(setScheduleSettings,body))
    } else {
      dispatch(editInboundScheduleAction(setScheduleSettings,body))
    }
  };

  return (
    <div className="flex">
      <div className="basis-3/4">
        <div className="flex items-center mt-5">
          <Switch
            checked={isInboundActive}
            onCheckedChange={(checked: any) => {
              dispatch(
                editCampaignsAction(
                  {
                    ...campaignDataById,
                    inbound_active: checked,
                    timezone:
                      scheduleSettings?.timeZone === "None"
                        ? ""
                        : scheduleSettings?.timeZone,
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

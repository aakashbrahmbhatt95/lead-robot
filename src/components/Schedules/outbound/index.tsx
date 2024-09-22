import { Formik } from "formik";
import { Switch } from "@/lib/ui/switch";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import {
  addOutboundScheduleHandler,
  editOutboundScheduleHandler,
  getOutboundScheduleHandler,
  weekDaysMap,
  weekMap,
} from "./helper";
import { Button } from "@/lib/ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import WeekSelector from "./WeekSelector";
import CallTimeSpread from "./CallTimeSpread";
import StartEndTimeSelector from "./StartEndTimeSelector";
import { calculateDuration } from "../Inbound/helper";
import { outboundValidationSchema } from "@/components/validation";

const Outbound = () => {
  const dispatch = useAppDispatch();
  const [weekData, setWeekData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [outboundData, setOutboundData] = useState({
    excludePublicHolidays: "",
    timeZone: "",
    isEdit: false,
    outboundId: null,
    formValues: {
      startDate: "",
      endDate: "",
      callTimeStart: "",
      callTimeEnd: "",
    },
  });

  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (campaignDataById?.outbound_schedule === null) {
      setOutboundData((prev: any) => ({
        ...prev,
        isEdit: false,
        formValues: {
          startDate: "",
          endDate: "",
          callTimeStart: "",
          callTimeEnd: "",
        },
      }));
    } else {
      getOutboundScheduleHandler(
        campaignDataById?.outbound_schedule,
        setOutboundData,
        setWeekData
      );
    }
  }, [campaignDataById]);

  const handleSubmit = (values: any) => {
    if (weekData.length === 0) {
      setError("Please select at least one weekday.");
      return;
    }
    setError(null);
    const output: any = weekData?.map((ele: any) => ({
      interval: 1,
      start_date: values.startDate,
      end_date: values.endDate,
      times: [values?.callTimeStart],
      exclude: false,
      duration: calculateDuration(values?.callTimeStart, values?.callTimeEnd),
      byweekno: [weekDaysMap[ele]],
    }));
    if (outboundData?.outboundId === null) {
      addOutboundScheduleHandler(campaignDataById, dispatch, output);
    } else {
      editOutboundScheduleHandler(
        setOutboundData,
        outboundData,
        output,
        setWeekData
      );
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
        <p className="text-[20px] mt-[20px] font-semibold text-black">
          Schedule Call Times
        </p>
        {outboundData?.formValues && (
          <Formik
            initialValues={outboundData.formValues}
            enableReinitialize={true}
            validationSchema={outboundValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="border-[1px] mt-4 pb-3 border-[#E4E4E7] rounded">
                  <StartEndTimeSelector
                    values={values}
                    setFieldValue={setFieldValue}
                    outboundData={outboundData}
                  />
                  <WeekSelector
                    weekMap={weekMap}
                    weekData={weekData}
                    setWeekData={setWeekData}
                    isEdit={outboundData?.isEdit}
                  />
                  {error && <p className="text-red-500 ml-4">{error}</p>}{" "}
                  <CallTimeSpread
                    values={values}
                    setFieldValue={setFieldValue}
                    isEdit={outboundData?.isEdit}
                  />
                  {outboundData?.isEdit && (
                    <p
                      className="text-sm font-medium mt-[20px] text-gray-700 my-5 ml-3 cursor-pointer underline"
                      onClick={() =>
                        setOutboundData((prev) => ({ ...prev, isEdit: false }))
                      }
                    >
                      Edit
                    </p>
                  )}
                </div>
                {!outboundData?.isEdit && (
                  <div className="flex mt-3">
                    <Button variant="outline" type="submit">
                      Save
                    </Button>
                  </div>
                )}
              </form>
            )}
          </Formik>
        )}
      </div>
      <TimeZoneAndHolidays
        timeZone={outboundData.timeZone}
        setTimeZone={(value) =>
          setOutboundData((prev) => ({ ...prev, timeZone: value }))
        }
        excludePublicHolidays={outboundData.excludePublicHolidays}
        setExcludePublicHolidays={(value) =>
          setOutboundData((prev) => ({
            ...prev,
            excludePublicHolidays: value,
          }))
        }
      />
    </div>
  );
};

export default Outbound;

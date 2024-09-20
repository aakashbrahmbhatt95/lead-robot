import { Formik } from "formik";
import { Switch } from "@/lib/ui/switch";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import { weekMap } from "./helper";
import { Button } from "@/lib/ui/button";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import WeekSelector from "./WeekSelector";
import CallTimeSpread from "./CallTimeSpread";
import StartEndTimeSelector from "./StartEndTimeSelector";

const Outbound = () => {
  const [weekData, setWeekData] = useState<string[]>([]);
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
      // Set form values based on schedule data
      // getScheduleHandler logic can be added here if needed
    }
  }, [campaignDataById]);

  const handleSubmit = (values: any) => {
    console.log("Form Submitted with values:", {
      ...values,
      timeZone: outboundData?.timeZone,
      excludePublicHolidays: outboundData?.excludePublicHolidays,
      weekData: weekData,
    });
    setOutboundData((prev: any) => ({
      ...prev,
      isEdit: true,
    }));
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

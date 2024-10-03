import { Formik, FieldArray, ErrorMessage } from "formik";
import { Switch } from "@/lib/ui/switch";
import TimeZoneAndHolidays from "./TimeZoneAndHoliday";
import {
  addOutboundScheduleHandler,
  editOutboundScheduleHandler,
  getOutboundScheduleHandler,
  initialFormValues,
} from "./helper";
import { Button } from "@/lib/ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import WeekSelector from "./WeekSelector";
import CallTimeSpread from "./CallTimeSpread";
import StartEndTimeSelector from "./StartEndTimeSelector";
import { calculateDuration } from "../Inbound/helper";
import { outboundValidationSchema } from "@/components/validation";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { TrashSimple } from "@phosphor-icons/react";
import { editCampaignsAction } from "@/redux/action/campaigns-action";

const Outbound = () => {
  const dispatch = useAppDispatch();
  const [excludePublicHolidays, setExcludePublicHolidays] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [outboundData, setOutboundData] = useState({
    isEdit: false,
    outboundId: null,
    formValues: [initialFormValues],
  });
  const [accordionOpen, setAccordionOpen] = useState([true]);

  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (campaignDataById?.outbound_schedule_id === null) {
      setOutboundData((prev: any) => ({
        ...prev,
        isEdit: false,
        formValues: [initialFormValues],
      }));
      setAccordionOpen([true]);
    } else {
      setExcludePublicHolidays(campaignDataById?.exclude_holidays_country);
      setTimeZone(campaignDataById?.timezone);
      getOutboundScheduleHandler(
        campaignDataById?.outbound_schedule_id,
        setOutboundData
      );
    }
  }, [campaignDataById]);

  const handleSubmit = (values: any) => {
    const output = values.formValues.map((formValue: any) => ({
      interval: 1,
      start_date: formValue.startDate,
      end_date: formValue.endDate,
      byweekday: formValue.weeks,
      times: [formValue.callTimeStart],
      exclude: false,
      duration: calculateDuration(
        formValue.callTimeStart,
        formValue.callTimeEnd
      ),
    }));

    if (outboundData?.outboundId === null) {
      addOutboundScheduleHandler(
        campaignDataById,
        dispatch,
        output,
        excludePublicHolidays,
        timeZone
      );
    } else {
      editOutboundScheduleHandler(
        setOutboundData,
        outboundData,
        output,
        dispatch,
        campaignDataById,
        excludePublicHolidays,
        timeZone
      );
    }
  };

  const toggleAccordion = (index: number) => {
    setAccordionOpen((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="flex">
      <div className="basis-3/4">
        <div className="flex items-center mt-5">
          <Switch
            checked={campaignDataById.outbound_active}
            onCheckedChange={(checked) => {
              dispatch(
                editCampaignsAction(
                  {
                    ...campaignDataById,
                    outbound_active: checked,
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
        {campaignDataById.outbound_active && (
          <>
            <p className="text-[20px] mt-[20px] font-semibold text-black">
              Schedule Call Times
            </p>
            {outboundData?.formValues && (
              <Formik
                initialValues={outboundData}
                enableReinitialize={true}
                validationSchema={outboundValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <FieldArray name="formValues">
                      {({ push, remove }) => (
                        <>
                          {values.formValues.map((formValue, index) => (
                            <>
                              <div className="flex justify-end items-center mt-3 mb-2">
                                {values.formValues?.length > 1 && (
                                  <TrashSimple
                                    className={`mr-2 ${outboundData?.isEdit ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                    size={20}
                                    onClick={() => {
                                      if (!outboundData?.isEdit) {
                                        remove(index);
                                        setAccordionOpen((prev) => {
                                          const newAccordionOpen = [...prev];
                                          newAccordionOpen.splice(index, 1);
                                          return newAccordionOpen;
                                        });
                                      }
                                    }}
                                  />
                                )}
                                <div
                                  className="mr-2"
                                  onClick={() => toggleAccordion(index)}
                                >
                                  {accordionOpen[index] ? (
                                    <ChevronDown />
                                  ) : (
                                    <ChevronUp />
                                  )}
                                </div>
                              </div>
                              {accordionOpen[index] && (
                                <div className="border-[1px] pb-3 border-[#E4E4E7] rounded">
                                  <StartEndTimeSelector
                                    values={formValue}
                                    setFieldValue={(field: any, value: any) =>
                                      setFieldValue(
                                        `formValues.${index}.${field}`,
                                        value
                                      )
                                    }
                                    index={index}
                                    isEdit={outboundData?.isEdit}
                                  />
                                  <WeekSelector
                                    values={formValue}
                                    setFieldValue={(field: any, value: any) =>
                                      setFieldValue(
                                        `formValues.${index}.${field}`,
                                        value
                                      )
                                    }
                                    isEdit={outboundData?.isEdit}
                                  />
                                  <ErrorMessage
                                    name={`formValues.${index}.weeks`}
                                    component="div"
                                    className="text-red-500 ml-4"
                                  />
                                  <CallTimeSpread
                                    values={formValue}
                                    setFieldValue={(field: any, value: any) =>
                                      setFieldValue(
                                        `formValues.${index}.${field}`,
                                        value
                                      )
                                    }
                                    index={index}
                                    isEdit={outboundData?.isEdit}
                                  />
                                </div>
                              )}
                            </>
                          ))}
                          {!outboundData?.isEdit && (
                            <div className="flex mt-3">
                              <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                  push(initialFormValues);
                                  setAccordionOpen((prev) => [...prev, true]);
                                }}
                              >
                                <Plus className="mr-3" /> Add call time
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </FieldArray>
                    <div className="flex mt-3">
                      {outboundData?.isEdit ? (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={(e: any) => {
                            e.preventDefault();
                            setOutboundData((prev) => ({
                              ...prev,
                              isEdit: false,
                            }));
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
                  </form>
                )}
              </Formik>
            )}
          </>
        )}
      </div>
      {campaignDataById.outbound_active && (
        <TimeZoneAndHolidays
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          excludePublicHolidays={excludePublicHolidays}
          setExcludePublicHolidays={setExcludePublicHolidays}
          isEdit={outboundData.isEdit}
        />
      )}
    </div>
  );
};

export default Outbound;

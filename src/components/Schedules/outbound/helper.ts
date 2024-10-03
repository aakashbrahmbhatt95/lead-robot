import { editCampaignsAction } from "@/redux/action/campaigns-action";
import { BASE_URL1, GET_SCHEDULE_URL } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";
import { addDuration } from "../Inbound/helper";

export const weekMap = [
  { label: "Mon", value: 0 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 5 },
  { label: "Sun", value: 6 },
];

export const initialFormValues = {
  startDate: "",
  endDate: "",
  weeks: [],
  callTimeStart: "",
  callTimeEnd: "",
};

export const getOutboundScheduleHandler = async (
  id: any,
  setOutboundData: any
) => {
  try {
    const res = await HttpUtil.makeGET(
      `${BASE_URL1}${GET_SCHEDULE_URL}${id}`,
      "",
      { Authorization: getToken() }
    );
    if (res?.success) {
      setOutboundData((prev: any) => ({
        ...prev,
        isEdit: true,
        outboundId: {
          id: res?.data?.id,
          description: res?.data?.description,
          name: res?.data?.name,
          is_active: res?.data?.is_active,
          user: res?.data?.user,
        },
        formValues: res?.data?.daily?.map((ele: any) => ({
          startDate: ele.start_date,
          endDate: ele.end_date,
          callTimeStart: ele?.times[0],
          callTimeEnd: addDuration(ele?.times[0], ele?.duration),
          weeks: ele?.byweekday,
        })),
      }));
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const addOutboundScheduleHandler = async (
  campaignDataById: any,
  dispatch: any,
  output: any,
  excludePublicHolidays: any,
  timeZone: any
) => {
  try {
    const res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_SCHEDULE_URL}`,
      {
        daily: output,
        weekly: [],
        monthly: [],
        yearly: [],
        exdates: [],
        name: campaignDataById?.name,
        description: campaignDataById?.description,
        rdates: [],
        is_active: true,
      },
      { Authorization: getToken() }
    );
    if (res?.success) {
      dispatch(
        editCampaignsAction(
          {
            ...campaignDataById,
            outbound_schedule_id: res?.data?.id,
            exclude_holidays_country: excludePublicHolidays,
            timezone: timeZone,
          },
          campaignDataById?.id
        )
      );
      toast.success("Schedule Added Successfully!");
    } else {
      throw new Error("Failed to save schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const editOutboundScheduleHandler = async (
  setOutboundData: any,
  outboundData: any,
  output: any,
  dispatch: any,
  campaignDataById: any,
  excludePublicHolidays: any,
  timeZone: any
) => {
  try {
    const res = await HttpUtil.makePUT(
      `${BASE_URL1}${GET_SCHEDULE_URL}${outboundData?.outboundId?.id}`,
      {
        daily: output,
        weekly: [],
        monthly: [],
        yearly: [],
        exdates: [],
        name: outboundData?.outboundId?.name,
        description: outboundData?.outboundId?.description,
        rdates: [],
        is_active: outboundData?.outboundId?.is_active,
      },
      { Authorization: getToken() }
    );

    if (res?.success) {
      dispatch(
        editCampaignsAction(
          {
            ...campaignDataById,
            exclude_holidays_country: excludePublicHolidays,
            timezone: timeZone,
          },
          campaignDataById?.id
        )
      );
      getOutboundScheduleHandler(res?.data?.id, setOutboundData);
      toast.success("Schedule Edited Successfully!");
    } else {
      throw new Error("Failed to edit schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

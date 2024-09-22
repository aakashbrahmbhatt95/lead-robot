import { editCampaignsAction } from "@/redux/action/campaigns-action";
import { BASE_URL1, GET_SCHEDULE_URL } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";
import { addDuration } from "../Inbound/helper";
import { campaignDataByIdReducer } from "@/redux/reducer/campaigns-reducer";

export const weekMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const getOutboundScheduleHandler = async (
  id: any,
  setOutboundData: any,
  setWeekData: any
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
        formValues: convertInput(res?.data?.weekly),
      }));
      setWeekData(convertWeekInput(res?.data?.weekly));
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
  output: any
) => {
  try {
    const res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_SCHEDULE_URL}`,
      {
        daily: [],
        weekly: output,
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
            name: campaignDataById?.name,
            description: campaignDataById?.description,
            is_active: campaignDataById?.is_active,
            dynamic: campaignDataById?.dynamic,
            inbound_schedule_id: campaignDataById?.inbound_schedule,
            outbound_schedule_id: res?.data?.id,
          },
          campaignDataById?.id
        )
      );
      dispatch(
        campaignDataByIdReducer({
          campaignDataById,
          outbound_schedule: res?.data?.id,
        })
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
  setWeekData: any
) => {
  try {
    const res = await HttpUtil.makePUT(
      `${BASE_URL1}${GET_SCHEDULE_URL}${outboundData?.outboundId?.id}`,
      {
        daily: [],
        weekly: output,
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
      getOutboundScheduleHandler(res?.data?.id, setOutboundData, setWeekData);
      toast.success("Schedule Edited Successfully!");
    } else {
      throw new Error("Failed to edit schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const weekDaysMap: any = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

function convertInput(input: any) {
  const output: any = {
    startDate: input[0].start_date,
    endDate: input[0].end_date,
    callTimeStart: input[0]?.times[0],
    callTimeEnd: addDuration(input[0]?.times[0], input[0]?.duration),
    timeZone: "",
    excludePublicHolidays: "",
  };
  return output;
}

function convertWeekInput(input: any) {
  const reverseWeekDaysMap = Object.fromEntries(
    Object.entries(weekDaysMap).map(([day, num]) => [num, day])
  );

  // Extract the day names based on byweekno
  const output = input
    .map((item: any) => item.byweekno) // Get the byweekno arrays
    .flat() // Flatten to a single array of numbers
    .map((weekNumber: any) => reverseWeekDaysMap[weekNumber]) // Map numbers to day names
    .filter(Boolean);
  return output;
}

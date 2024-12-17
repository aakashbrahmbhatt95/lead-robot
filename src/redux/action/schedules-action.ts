import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { BASE_URL1, GET_INBOUND_URL, GET_OUTBOUND_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { addDuration, convertInput } from "@/components/Schedules/Inbound/helper";
import { toast } from "react-toastify";
import { initialFormValues } from "@/components/Schedules/outbound/helper";

export const getInboundScheduleAction =
    (setScheduleSettings: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makeGET(
                `${BASE_URL1}${GET_INBOUND_URL}${campaignDataById?.id}`,
                "",
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        setScheduleSettings((prev: any) => ({
                            ...prev,
                            isEdit: true,
                            excludePublicHolidays: campaignDataById?.excludePublicHolidays,
                            timeZone: campaignDataById?.timeZone,
                            isAlwaysOn: "scheduled",
                            scheduleId: {
                                id: res?.data?.id,
                                description: res?.data?.description,
                                name: res?.data?.name,
                                is_active: res?.data?.is_active,
                                user: res?.data?.user,
                                daily: res?.data?.daily,
                            },
                            formValues: convertInput(res?.data?.daily),
                        }));
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
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
                })
                .finally(() => { });
        };

export const addInboundScheduleAction =
    (setScheduleSettings: any, body: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makePOST(
                `${BASE_URL1}${GET_INBOUND_URL}${campaignDataById?.id}`,
                body,
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        dispatch(getInboundScheduleAction(setScheduleSettings));
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
                    toast.error("Oops! Something went wrong");
                })
                .finally(() => { });
        };

export const editInboundScheduleAction =
    (setScheduleSettings: any, body: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makePUT(
                `${BASE_URL1}${GET_INBOUND_URL}${campaignDataById?.id}`,
                body,
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        dispatch(getInboundScheduleAction(setScheduleSettings));
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
                    toast.error("Oops! Something went wrong");
                })
                .finally(() => { });
        };


export const getOutboundScheduleAction =
    (setOutboundData: any, setAccordionOpen: any, setExcludePublicHolidays: any, setTimeZone: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makeGET(
                `${BASE_URL1}${GET_OUTBOUND_URL}${campaignDataById?.id}`,
                "",
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        setExcludePublicHolidays(campaignDataById?.exclude_holidays_country);
                        setTimeZone(campaignDataById?.timezone);
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
                                endDate: ele.end_date === null ? "" : ele?.end_date,
                                callTimeStart: ele?.times[0],
                                callTimeEnd: addDuration(ele?.times[0], ele?.duration),
                                weeks: ele?.byweekday,
                            })),
                        }));
                        setAccordionOpen(res?.data?.daily?.map(() => true));
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
                    setOutboundData((prev: any) => ({
                        ...prev,
                        isEdit: false,
                        formValues: [initialFormValues],
                    }));
                    setAccordionOpen([true]);
                })
                .finally(() => { });
        };


export const addOutboundScheduleAction =
    (body: any, setOutboundData: any, setAccordionOpen: any, setExcludePublicHolidays: any, setTimeZone: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makePOST(
                `${BASE_URL1}${GET_OUTBOUND_URL}${campaignDataById?.id}`,
                body,
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        dispatch(getOutboundScheduleAction(setOutboundData, setAccordionOpen, setExcludePublicHolidays, setTimeZone))
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
                    toast.error("Oops! Something went wrong");
                })
                .finally(() => { });
        };

export const editOutboundScheduleAction =
    (body: any, setOutboundData: any, setAccordionOpen: any, setExcludePublicHolidays: any, setTimeZone: any) =>
        async (dispatch: AppDispatch, getState: () => RootState) => {
            const { campaignDataById } = getState()?.campaignReducer;
            HttpUtil.makePUT(
                `${BASE_URL1}${GET_OUTBOUND_URL}${campaignDataById?.id}`,
                body,
                {
                    Authorization: getToken(),
                }
            )
                .then((res) => {
                    if (res?.success) {
                        dispatch(getOutboundScheduleAction(setOutboundData, setAccordionOpen, setExcludePublicHolidays, setTimeZone))
                    } else {
                        throw Error;
                    }
                })
                .catch((err: any) => {
                    toast.error("Oops! Something went wrong");
                })
                .finally(() => { });
        };
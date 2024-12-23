import { BASE_URL1 } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const intialCallSettingsState = {
    end_call_after_silence_ms: 2500,
    max_call_duration_ms: 2500,
    reminder_trigger_ms: 2500,
    reminder_max_count: 0,
    enable_voicemail_detection: false,
    voicemail_message: "",
    voicemail_detection_timeout_ms: 2500,
    opt_out_sensitive_data_storage: false,
    enable_transcription_formatting: true,
}

export const getCallSettings = async (setCallSettings: any, campaign_id: any) => {
    try {
        const res: any = await HttpUtil.makeGET(`${BASE_URL1}/campaigns/call-settings/campaign/${campaign_id}`, "", {
            Authorization: getToken(),
        });
        if (res?.success) {
            setCallSettings(res?.data);
        } else {
            throw new Error();
        }
    } catch (error) {
        setCallSettings(intialCallSettingsState);
    }
};

export const updateCallSettings = async (body: any, setCallSettings: any, campaign_id: any) => {
    try {
        const res: any = await HttpUtil.makePUT(`${BASE_URL1}/campaigns/call-settings/campaign/${campaign_id}`, body, {
            Authorization: getToken(),
        });
        if (res?.success) {
            getCallSettings(setCallSettings, campaign_id);
            toast.success("Call settings updated successfully!");
        } else {
            throw new Error();
        }
    } catch (error) {
        toast.error("Oops! Something went wrong");
    }
};
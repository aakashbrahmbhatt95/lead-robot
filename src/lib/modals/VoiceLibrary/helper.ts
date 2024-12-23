import { BASE_URL1, GET_VOICES_URL } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const getVoiceList = async (setVoicesList: any, isRealTime: any) => {
  const url = isRealTime ? `${BASE_URL1}/agents/openai/voices` : `${BASE_URL1}${GET_VOICES_URL}`
  try {
    const res = await HttpUtil.makeGET(url, "", {
      Authorization: getToken(),
    });
    if (res?.success) {
      setVoicesList(res?.data);
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

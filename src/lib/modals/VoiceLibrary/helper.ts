import { BASE_URL1, GET_VOICES_URL } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const getVoiceList = async (setVoicesList: any) => {
  try {
    const res = await HttpUtil.makeGET(`${BASE_URL1}${GET_VOICES_URL}`, "", {
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

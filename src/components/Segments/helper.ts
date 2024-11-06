import {
  BASE_URL1,
  GET_CONFIG_FILTER,
  GET_FILTERS,
} from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const getConfigFilterHandler = async (setConfigFilters: any) => {
  try {
    const res = await HttpUtil.makeGET(`${BASE_URL1}${GET_CONFIG_FILTER}`, "", {
      Authorization: getToken(),
    });
    if (res?.success) {
      setConfigFilters(res?.data);
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const getFiltersHandler = async (setFilters: any) => {
  try {
    const res = await HttpUtil.makeGET(`${BASE_URL1}${GET_FILTERS}`, "", {
      Authorization: getToken(),
    });
    if (res?.success) {
      setFilters(res?.data);
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

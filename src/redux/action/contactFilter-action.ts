import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_CONFIG_FILTER,
  GET_FILTERS,
} from "../../utils/apiConstants";
import { getToken } from "@/utils/constants";
import { toast } from "react-toastify";
import {
  configFilterReducer,
  filterReducer,
} from "../reducer/contactFilter-reducer";

export const getFiltersAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_FILTERS}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      dispatch(filterReducer(res?.data));
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    });
};

export const getConfigFiltersAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_CONFIG_FILTER}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      dispatch(configFilterReducer(res?.data));
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    });
};

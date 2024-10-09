import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_AGENT,
  GET_AMBIENT_SOUNDS_URL,
} from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import {
  agentListReducer,
  ambientSoundsListReducer,
} from "../reducer/agents-reducer";
import { toast } from "react-toastify";

export const ambientSoundsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_AMBIENT_SOUNDS_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(ambientSoundsListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(ambientSoundsListReducer([]));
    })
    .finally(() => {});
};

export const getAgentAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    HttpUtil.makeGET(`${BASE_URL1}${GET_AGENT}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(agentListReducer(res?.data?.[0]));
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

export const addAgentAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_AGENT}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(agentListReducer(res?.data));
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

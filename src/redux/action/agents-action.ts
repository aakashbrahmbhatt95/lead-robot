import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_AGENT,
  GET_AMBIENT_SOUNDS_URL,
} from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import {
  agentListByIdReducer,
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
    .finally(() => { });
};

export const getAgentAction =
  (campaign_id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeGET(`${BASE_URL1}${GET_AGENT}/${campaign_id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(agentListByIdReducer(res?.data));
        } else {
          throw Error;

        }
      })
      .catch((err: any) => {
        dispatch(agentListByIdReducer([]));
      })
      .finally(() => { });
  };

export const addAgentAction = (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { campaignDataById } = getState()?.campaignReducer;
  HttpUtil.makePOST(`${BASE_URL1}/agents/tts/agent/${campaignDataById?.id}`, body, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.error) {
        throw Error;
      } else {
        dispatch(agentListByIdReducer(res?.data));
        toast.success("Agent Added Successfully");
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => { });
};

export const editAgentAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_AGENT}/${campaignDataById?.id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(agentListByIdReducer(res?.data));
          toast.success("Agent Updated Successfully");
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

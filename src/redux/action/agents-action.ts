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
    .finally(() => {});
};

export const getAgentAction =
  (campaign_id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeGET(`${BASE_URL1}${GET_AGENT}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          const filteredAgentUsingCampaignID = res?.data?.filter(
            (ele: any) => ele?.campaign == campaign_id
          )?.[0];
          if (filteredAgentUsingCampaignID) {
            dispatch(agentListByIdReducer(filteredAgentUsingCampaignID));
          } else {
            dispatch(agentListByIdReducer([]));
          }
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

export const addAgentAction = (body: any) => async (dispatch: AppDispatch) => {
  HttpUtil.makePOST(`${BASE_URL1}${GET_AGENT}`, body, {
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
    .finally(() => {});
};

export const editAgentAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { agentDataByID } = getState()?.agentsReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_AGENT}${agentDataByID?.id}`, body, {
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
      .finally(() => {});
  };

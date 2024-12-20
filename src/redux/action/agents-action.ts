import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_AGENT,
  GET_AGENT_BY_ID,
  GET_AMBIENT_SOUNDS_URL,
  GET_REAL_TIME_AGENT_BY_ID,
} from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import {
  agentDataReducer,
  ambientSoundsListReducer,
  realTimeModelsListReducer,
  realTimeResponseModalitiesListReducer,
  realTimeTranscriptionsListReducer,
  realTimeTurnDetectionListReducer,
  realTimeVoicesListReducer,
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
    HttpUtil.makeGET(`${BASE_URL1}${GET_AGENT}${campaign_id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(agentDataReducer(res?.data));
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        dispatch(agentDataReducer(null));
      })
      .finally(() => { });
  };

export const addAgentAction = (body: any, isRealTime: any) => async (dispatch: AppDispatch) => {
  HttpUtil.makePOST(`${BASE_URL1}${GET_AGENT}${body?.campaign_id}`, {
    "name": body?.name,
    "language": body?.language,
    "identity": body?.identity,
    "style": body?.style,
    "response": body?.response,
    "active_settings": isRealTime ? "openai_realtime" : "tts"
  }, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.error) {
        throw Error;
      } else {
        if (isRealTime) {
          dispatch(addRealTimeAgentByIDAction(body, res?.data?.id));
        } else {
          dispatch(addAgentByIDAction(body, res?.data?.id));
        }
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => { });
};

export const addRealTimeAgentByIDAction = (body: any, agent_id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { campaignDataById } = getState()?.campaignReducer;
  HttpUtil.makePOST(`${BASE_URL1}${GET_REAL_TIME_AGENT_BY_ID}${agent_id}`, body, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.error) {
        throw Error;
      } else {
        dispatch(getAgentAction(campaignDataById?.id));
        toast.success("Agent Added Successfully");
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => { });
};
export const addAgentByIDAction = (body: any, agent_id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { campaignDataById } = getState()?.campaignReducer;
  HttpUtil.makePOST(`${BASE_URL1}${GET_AGENT_BY_ID}${agent_id}`, body, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.error) {
        throw Error;
      } else {
        dispatch(getAgentAction(campaignDataById?.id));
        toast.success("Agent Added Successfully");
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => { });
};


export const editAgentAction = (body: any, isRealTime: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { agentDataByID } = getState()?.agentsReducer;
  HttpUtil.makePUT(`${BASE_URL1}${GET_AGENT}${body?.campaign_id}`, {
    "name": body?.name,
    "language": body?.language,
    "identity": body?.identity,
    "style": body?.style,
    "response": body?.response,
    "active_settings": isRealTime ? "openai_realtime" : "tts"
  }, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.error) {
        throw Error;
      } else {
        if (isRealTime) {
          if (agentDataByID?.openai_settings?.id) {
            dispatch(editRealTimeAgentByIDAction(body, res?.data?.id));
          } else {
            dispatch(addRealTimeAgentByIDAction(body, res?.data?.id));
          }
        } else {
          if (agentDataByID?.tts_settings?.id) {
            dispatch(editAgentByIDAction(body, res?.data?.id));
          } else {
            dispatch(addAgentByIDAction(body, res?.data?.id));
          }
        }
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => { });
};

export const editRealTimeAgentByIDAction =
  (body: any, agent_id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_REAL_TIME_AGENT_BY_ID}${agent_id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(getAgentAction(campaignDataById?.id));
          toast.success("Agent Updated Successfully");
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const editAgentByIDAction =
  (body: any, agent_id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_AGENT_BY_ID}${agent_id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(getAgentAction(campaignDataById?.id));
          toast.success("Agent Updated Successfully");
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const getRealTimeVoicesListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}/agents/openai/voices`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(realTimeVoicesListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(realTimeVoicesListReducer([]));
    })
    .finally(() => { });
};

export const getRealTimeModelsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}/agents/openai/models`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(realTimeModelsListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(realTimeModelsListReducer([]));
    })
    .finally(() => { });
};

export const getRealTimeTranscriptionsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}/agents/openai/transcriptions`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(realTimeTranscriptionsListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(realTimeTranscriptionsListReducer([]));
    })
    .finally(() => { });
};

export const getRealTimeResponseModalitiesListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}/agents/openai/response-modalities`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(realTimeResponseModalitiesListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(realTimeResponseModalitiesListReducer([]));
    })
    .finally(() => { });
};

export const getRealTimeTurnDetectionListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}/agents/openai/turn-detection`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(realTimeTurnDetectionListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(realTimeTurnDetectionListReducer([]));
    })
    .finally(() => { });
};
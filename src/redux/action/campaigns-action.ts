import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_CAMPAIGN_URL,
  GET_TASKSET_URL,
} from "../../utils/apiConstants";
import { getToken } from "@/utils/constants";
import {
  campaignDataByIdReducer,
  campaignsListReducer,
  taskSetListReducer,
} from "../reducer/campaigns-reducer";

export const campaignsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_CAMPAIGN_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(campaignsListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(campaignsListReducer([]));
    })
    .finally(() => {});
};

export const addCampaignsAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignsList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_CAMPAIGN_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(campaignsListReducer([...campaignsList, res?.data]));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const editCampaignsAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignsList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedCampaignsList = campaignsList.map((campaign: any) =>
          campaign.id === res?.data.id ? res.data : campaign
        );
        dispatch(campaignsListReducer(updatedCampaignsList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deleteCampaignsAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignsList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedCampaignsList = campaignsList.filter(
          (campaign: any) => campaign.id !== id
        );
        dispatch(campaignsListReducer(updatedCampaignsList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const getcampaignsDatByIdAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeGET(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res) => {
        dispatch(campaignDataByIdReducer(res?.data));
      })
      .catch((err: any) => {
        dispatch(campaignDataByIdReducer({}));
      })
      .finally(() => {});
  };

export const taskSetListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_TASKSET_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(taskSetListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(taskSetListReducer([]));
    })
    .finally(() => {});
};

export const addtaskSetAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_TASKSET_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(taskSetListReducer([...taskSetList, res?.data]));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deletetaskSetAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_TASKSET_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedtaskSetList = taskSetList.filter(
          (ele: any) => ele.id !== id
        );
        dispatch(taskSetListReducer(updatedtaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const editTaskSetAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_TASKSET_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedtaskSetList = taskSetList.map((ele: any) =>
          ele.id === res?.data.id ? res.data : ele
        );
        dispatch(taskSetListReducer(updatedtaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

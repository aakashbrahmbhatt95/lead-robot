import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { toast } from "react-toastify";
import {
  BASE_URL1,
  GET_ASK_URL,
  GET_CAMPAIGN_URL,
  GET_DO_URL,
  GET_PATHCONDITION_URL,
  GET_SAY_URL,
  GET_TASKSET_URL,
} from "../../utils/apiConstants";
import { getToken } from "@/utils/constants";
import {
  campaignDataByIdReducer,
  campaignsListReducer,
  pathConditionListReducer,
  taskSetListReducer,
} from "../reducer/campaigns-reducer";
import Error from "next/error";

export const campaignsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_CAMPAIGN_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.success) {
        dispatch(campaignsListReducer(res?.data));
      } else {
        throw Error;
      }
    })
    .catch((err: any) => {
      dispatch(campaignsListReducer([]));
    })
    .finally(() => { });
};

export const addCampaignsAction =
  (body: any, router: any, setIsLoading: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_CAMPAIGN_URL}`, body, {
      Authorization: getToken(),
    })
      .then(async (res: any) => {
        if (res?.success) {
          await dispatch(campaignsListAction());
          toast.success("Campaign Added Succesfully!");
          router.push(`/campaigns/${res?.data?.id}`);
          setIsLoading(false)
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
        setIsLoading(false)
      })
      .finally(() => { });
  };

export const editCampaignsAction =
  (body: any, id: any, router?: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignsList } = getState()?.campaignReducer;
      HttpUtil.makePUT(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, body, {
        Authorization: getToken(),
      })
        .then(async (res: any) => {
          const updatedCampaignsId = campaignsList.filter((campaign: any) =>
            campaign.id === res?.data.id
          )?.[0]?.id;
          await dispatch(campaignsListAction());
          await dispatch(
            getcampaignsDatByIdAction(updatedCampaignsId)
          );
          toast.success("Campaign Updated Succesfully!");
          if (router) {
            router.push(`/campaigns/${res?.data?.id}`);
          }
        })
        .catch(() => {
        })
        .finally(() => { });
    };

export const deleteCampaignsAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(campaignsListAction());
          toast.success("Campaign Deleted Succesfully!");
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const getcampaignsDatByIdAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeGET(`${BASE_URL1}${GET_CAMPAIGN_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res) => {
        if (res?.success) {
          dispatch(
            campaignDataByIdReducer({
              ...res?.data,
              inbound_schedule_id: res?.data?.inbound_schedule,
              outbound_schedule_id: res?.data?.outbound_schedule,
              outbound_active: res?.data?.outbound_active,
              inbound_active: res?.data?.inbound_active,
            })
          );
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        dispatch(campaignDataByIdReducer({}));
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const taskSetListAction =
  (campaign_id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeGET(
      `${BASE_URL1}${GET_TASKSET_URL}?campaign_id=${campaign_id}`,
      "",
      {
        Authorization: getToken(),
      }
    )
      .then((res) => {
        dispatch(taskSetListReducer(res?.data?.items));
      })
      .catch((err: any) => {
        dispatch(taskSetListReducer([]));
      })
      .finally(() => { });
  };

export const addtaskSetAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_TASKSET_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          throw Error;
        } else {
          dispatch(taskSetListAction(campaignDataById?.id));
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const copytaskSetAction =
  (tasksetId: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { taskSetList } = getState()?.campaignReducer;
      HttpUtil.makePOST(
        `${BASE_URL1}${GET_TASKSET_URL}copy/${tasksetId}`,
        {},
        {
          Authorization: getToken(),
        }
      )
        .then((res: any) => {
          dispatch(
            taskSetListReducer([
              ...taskSetList,
              {
                ...res?.data,
                x_position: res?.data?.x_position + 50,
                y_position: res?.data?.y_position + 50,
              },
            ])
          );
          const body = {
            campaign_id: res?.data?.campaign,
            name: res?.data?.name,
            description: res?.data?.description,
            speak_first: res?.data?.speak_first,
            x_position: Math.ceil(res?.data?.x_position + 50),
            y_position: Math.ceil(res?.data?.y_position + 50),
            is_parent: res?.data?.is_parent,
          };
          dispatch(editTaskSetAction(body, res?.data?.id));
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const deletetaskSetAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_TASKSET_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(taskSetListAction(campaignDataById?.id));
        toast.success("Task Set Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const editTaskSetAction =
  (body: any, id: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignDataById } = getState()?.campaignReducer;
      HttpUtil.makePUT(`${BASE_URL1}${GET_TASKSET_URL}${id}`, body, {
        Authorization: getToken(),
      })
        .then((res: any) => {
          dispatch(taskSetListAction(campaignDataById?.id));
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const pathConditionListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_PATHCONDITION_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(pathConditionListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(pathConditionListReducer([]));
    })
    .finally(() => { });
};

export const addPathConditionAction =
  (body: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_PATHCONDITION_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(pathConditionListAction());
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };
export const editPathConditionAction =
  (body: any, id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePUT(`${BASE_URL1}${GET_PATHCONDITION_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(pathConditionListAction());
        toast.success("Path condition Updated Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const deletePathConditionAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_PATHCONDITION_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(pathConditionListAction());
        toast.success("Path condition Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const addAskAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_ASK_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(taskSetListAction(campaignDataById?.id));
        }
      })
      .catch((err: any) => toast.error("Oops! Something went wrong"))
      .finally(() => { });
  };

export const editAskAction =
  (body: any, id: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignDataById } = getState()?.campaignReducer;
      HttpUtil.makePUT(`${BASE_URL1}${GET_ASK_URL}${id}`, body, {
        Authorization: getToken(),
      })
        .then((res: any) => {
          dispatch(taskSetListAction(campaignDataById?.id));
          toast.success("Ask Card Updated Succesfully!");
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const deleteAskAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_ASK_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(taskSetListAction(campaignDataById?.id));
        toast.success("Ask Card Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const addSayAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_SAY_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(taskSetListAction(campaignDataById?.id));
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const editSayAction =
  (body: any, id: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignDataById } = getState()?.campaignReducer;
      HttpUtil.makePUT(`${BASE_URL1}${GET_SAY_URL}${id}`, body, {
        Authorization: getToken(),
      })
        .then((res: any) => {
          dispatch(taskSetListAction(campaignDataById?.id));
          toast.success("Say Card Updated Succesfully!");
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const deleteSaysAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_SAY_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(taskSetListAction(campaignDataById?.id));
        toast.success("Say Card Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

export const addDoAction =
  (body: any, setIsDoSetPopup: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignDataById } = getState()?.campaignReducer;
      HttpUtil.makePOST(`${BASE_URL1}${GET_DO_URL}`, body, {
        Authorization: getToken(),
      })
        .then((res: any) => {
          if (res?.success) {
            dispatch(taskSetListAction(campaignDataById?.id));
            setIsDoSetPopup(null);
          }
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const editDoAction =
  (body: any, id: any, setIsDoSetPopup: any) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const { campaignDataById } = getState()?.campaignReducer;
      HttpUtil.makePUT(`${BASE_URL1}${GET_DO_URL}${id}`, body, {
        Authorization: getToken(),
      })
        .then((res: any) => {
          if (res?.success) {
            dispatch(taskSetListAction(campaignDataById?.id));
            toast.success("Do Card Updated Succesfully!");
            setIsDoSetPopup(null);
          } else {
            throw Error;
          }
        })
        .catch((err: any) => {
          toast.error("Oops! Something went wrong");
        })
        .finally(() => { });
    };

export const deleteDoAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_DO_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(taskSetListAction(campaignDataById?.id));
          toast.success("Do Card Deleted Succesfully!");
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => { });
  };

import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
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
    .finally(() => {});
};

export const addPathConditionAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { pathConditionList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_PATHCONDITION_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(pathConditionListReducer([...pathConditionList, res?.data]));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
export const editPathConditionAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { pathConditionList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_PATHCONDITION_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedPathConditionList = pathConditionList.map((ele: any) =>
          ele.id === res?.data.id ? res.data : ele
        );
        dispatch(pathConditionListReducer(updatedPathConditionList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deletePathConditionAction =
  (id: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { pathConditionList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_PATHCONDITION_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedPathConditionList = pathConditionList.filter(
          (ele: any) => ele.id.toString() !== id.toString()
        );
        dispatch(pathConditionListReducer(updatedPathConditionList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const addAskAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_ASK_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
            if (taskSet.id === body.taskset_id) {
              return {
                ...taskSet,
                asks: [...taskSet.asks, res.data],
              };
            }
            return taskSet;
          });
          dispatch(taskSetListReducer(updatedTaskSetList));
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const editAskAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_ASK_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === body.taskset_id) {
            return {
              ...taskSet,
              asks: taskSet?.asks?.map((ele: any) =>
                ele.id === res?.data.id ? res.data : ele
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deleteAskAction =
  (id: any, taskset_id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_ASK_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === taskset_id) {
            return {
              ...taskSet,
              asks: taskSet?.asks.filter(
                (ele: any) => ele.id.toString() !== id.toString()
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const addSayAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_SAY_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
            if (taskSet.id === body.taskset_id) {
              return {
                ...taskSet,
                says: [...taskSet.says, res.data],
              };
            }
            return taskSet;
          });
          dispatch(taskSetListReducer(updatedTaskSetList));
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const editSayAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_SAY_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === body.taskset_id) {
            return {
              ...taskSet,
              says: taskSet?.says?.map((ele: any) =>
                ele.id === res?.data.id ? res.data : ele
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deleteSaysAction =
  (id: any, taskset_id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_SAY_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === taskset_id) {
            return {
              ...taskSet,
              says: taskSet?.says.filter(
                (ele: any) => ele.id.toString() !== id.toString()
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const addDoAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePOST(`${BASE_URL1}${GET_DO_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
            if (taskSet.id === body.taskset_id) {
              return {
                ...taskSet,
                dos: [...taskSet.dos, res.data],
              };
            }
            return taskSet;
          });
          dispatch(taskSetListReducer(updatedTaskSetList));
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const editDoAction =
  (body: any, id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makePUT(`${BASE_URL1}${GET_DO_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === body.taskset_id) {
            return {
              ...taskSet,
              dos: taskSet?.dos?.map((ele: any) =>
                ele.id === res?.data.id ? res.data : ele
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

export const deleteDoAction =
  (id: any, taskset_id: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { taskSetList } = getState()?.campaignReducer;
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_DO_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        const updatedTaskSetList = taskSetList?.map((taskSet: any) => {
          if (taskSet.id === taskset_id) {
            return {
              ...taskSet,
              dos: taskSet?.dos.filter(
                (ele: any) => ele.id.toString() !== id.toString()
              ),
            };
          }
          return taskSet;
        });
        dispatch(taskSetListReducer(updatedTaskSetList));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

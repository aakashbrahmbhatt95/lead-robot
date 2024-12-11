import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_LANGUAGE_URL,
  GET_TASK_ACTION_URL,
} from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import {
  languageListReducer,
  taskActionReducer,
} from "../reducer/global-reducer";

export const languagesListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_LANGUAGE_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(languageListReducer(res?.data));
    })
    .catch((err: any) => {
      dispatch(languageListReducer([]));
    });
};

export const getTasksAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_TASK_ACTION_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(taskActionReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(taskActionReducer([]));
    });
};

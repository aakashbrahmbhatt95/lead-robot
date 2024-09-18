import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { toast } from "react-toastify";
import { BASE_URL1, GET_SCHEDULE_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { schedulesListReducer } from "../reducer/schedules-reducer";

export const scheduleListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_SCHEDULE_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
        console.log('res',res)
      dispatch(schedulesListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(schedulesListReducer([]));
    })
    .finally(() => {});
};

export const addScheduleAction =
  (body: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_SCHEDULE_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(scheduleListAction());
          toast.success("Schedule Added Succesfully!");
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

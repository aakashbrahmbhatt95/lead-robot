import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { BASE_URL1, GET_ATTRIBUTES_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { ambientSoundsListReducer } from "../reducer/agents-reducer";

export const ambientSoundsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_ATTRIBUTES_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(ambientSoundsListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(ambientSoundsListReducer([]));
    })
    .finally(() => {});
};

import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { BASE_URL1, GET_LANGUAGE_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { languageListReducer } from "../reducer/global-reducer";

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

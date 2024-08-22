import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { toast } from "react-toastify";
import { BASE_URL1, GET_ATTRIBUTES_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { attributesListReducer } from "../reducer/attributes-reducer";

export const attributesListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_ATTRIBUTES_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(attributesListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(attributesListReducer([]));
    })
    .finally(() => {});
};

export const addAttributeAction =
  (body: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_ATTRIBUTES_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.success) {
          dispatch(attributesListAction());
          toast.success("Attribute Added Succesfully!");
        } else {
          throw Error;
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

export const editAttributeAction =
  (body: any, id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePUT(`${BASE_URL1}${GET_ATTRIBUTES_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(attributesListAction());
        toast.success("Attribute Updated Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

export const deleteAttributeAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_ATTRIBUTES_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(attributesListAction());
        toast.success("Attribute Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { toast } from "react-toastify";
import { BASE_URL1, GET_TAG_URL } from "../../utils/apiConstants";
import { getToken } from "../../utils/constants";
import { tagsListReducer } from "../reducer/tags-reducer";

export const tagsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_TAG_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(tagsListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(tagsListReducer([]));
    })
    .finally(() => {});
};

export const addTagAction = (body: any) => async (dispatch: AppDispatch) => {
  HttpUtil.makePOST(`${BASE_URL1}${GET_TAG_URL}`, body, {
    Authorization: getToken(),
  })
    .then((res: any) => {
      if (res?.success) {
        dispatch(tagsListAction());
        toast.success("Tag Added Succesfully!");
      } else {
        throw Error;
      }
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => {});
};

export const editTagAction =
  (body: any, id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePUT(`${BASE_URL1}${GET_TAG_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(tagsListAction());
        toast.success("Tag Updated Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

export const deleteTagAction = (id: any) => async (dispatch: AppDispatch) => {
  HttpUtil.makeDELETE(`${BASE_URL1}${GET_TAG_URL}${id}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      dispatch(tagsListAction());
      toast.success("Tag Deleted Succesfully!");
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    })
    .finally(() => {});
};

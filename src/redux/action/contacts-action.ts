import { AppDispatch } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { toast } from "react-toastify";
import {
  BASE_URL1,
  GET_CONTACT_IMPORT_JOB_URL,
  GET_CONTACT_URL,
} from "../../utils/apiConstants";
import { contactsListReducer } from "../reducer/contacts-reducer";
import { getToken } from "../../utils/constants";

export const contactsListAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_CONTACT_URL}`, "", {
    Authorization: getToken(),
  })
    .then((res) => {
      dispatch(contactsListReducer(res?.data?.items));
    })
    .catch((err: any) => {
      dispatch(contactsListReducer([]));
    });
};

export const addContactsAction =
  (body: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL1}${GET_CONTACT_URL}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        if (res?.error) {
          res?.data?.errors?.map((ele: any) => {
            return toast.error(ele);
          });
        } else {
          dispatch(contactsListAction());
          toast.success("Contact Added Succesfully!");
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      });
  };

export const editContactsAction =
  (body: any, id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makePUT(`${BASE_URL1}${GET_CONTACT_URL}${id}`, body, {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(contactsListAction());
        toast.success("Contact Updated Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      });
  };

export const deleteContactsAction =
  (id: any) => async (dispatch: AppDispatch) => {
    HttpUtil.makeDELETE(`${BASE_URL1}${GET_CONTACT_URL}${id}`, "", {
      Authorization: getToken(),
    })
      .then((res: any) => {
        dispatch(contactsListAction());
        toast.success("Contact Deleted Succesfully!");
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      });
  };

export const uploadContacts =
  (body: any, importJobId: any, setSelectedTab: any) =>
  async (dispatch: AppDispatch) => {
    HttpUtil.makePOST(
      `${BASE_URL1}${GET_CONTACT_IMPORT_JOB_URL}${importJobId}/import`,
      body,
      {
        Authorization: getToken(),
      }
    )
      .then((res: any) => {
        if (res?.success) {
          dispatch(contactsListAction());
          setSelectedTab(5);
        }
      })
      .catch((err: any) => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {});
  };

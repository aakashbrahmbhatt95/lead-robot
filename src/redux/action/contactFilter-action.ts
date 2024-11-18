import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import { BASE_URL1, GET_CONTACT_FILTER } from "../../utils/apiConstants";
import { getToken } from "@/utils/constants";
import { contactsFilterReducer } from "../reducer/contactFilter-reducer";

export const getContactFilterAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState().campaignReducer;
    try {
      const res = await HttpUtil.makeGET(
        `${BASE_URL1}${GET_CONTACT_FILTER}?campaign_id=${campaignDataById.id}`,
        "",
        {
          Authorization: getToken(),
        }
      );
      if (res?.data?.length) {
        dispatch(contactsFilterReducer(res.data));
      } else {
        await dispatch(
          addContactFilterAction({
            exclude: false,
            any: false,
            campaign_id: campaignDataById.id,
          })
        );
        await dispatch(
          addContactFilterAction({
            exclude: true,
            any: false,
            campaign_id: campaignDataById.id,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching contact filters:", error);
      dispatch(contactsFilterReducer([]));
    }
  };

export const addContactFilterAction =
  (body: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { contactFilterList } = getState().contactFilterReducer;

    try {
      const res = await HttpUtil.makePOST(
        `${BASE_URL1}${GET_CONTACT_FILTER}`,
        body,
        {
          Authorization: getToken(),
        }
      );

      if (res?.data) {
        const temp = [...contactFilterList, res.data];
        dispatch(contactsFilterReducer([...contactFilterList, res.data]));
      }
    } catch (error) {
      console.error("Error adding contact filter:", error);
    }
  };

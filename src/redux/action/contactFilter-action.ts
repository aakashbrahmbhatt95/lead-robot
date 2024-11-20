import { AppDispatch, RootState } from "../store";
import { HttpUtil } from "../../utils/http-util";
import {
  BASE_URL1,
  GET_CONFIG_FILTER,
  GET_CONTACT_FILTER,
  GET_FILTERS,
} from "../../utils/apiConstants";
import { getToken } from "@/utils/constants";
import { toast } from "react-toastify";
import {
  configFilterReducer,
  contactFilterDataReducer,
  contactFilterListReducer,
  filterReducer,
} from "../reducer/contactFilter-reducer";
import {
  filterConditionDatByFilterId,
  initialContactFilterData,
} from "@/components/Segments/helper";

export const getFiltersAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_FILTERS}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      dispatch(filterReducer(res?.data));
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    });
};

export const getConfigFiltersAction = () => async (dispatch: AppDispatch) => {
  HttpUtil.makeGET(`${BASE_URL1}${GET_CONFIG_FILTER}`, "", {
    Authorization: getToken(),
  })
    .then((res: any) => {
      dispatch(configFilterReducer(res?.data));
    })
    .catch((err: any) => {
      toast.error("Oops! Something went wrong");
    });
};

export const getContactFilterAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { campaignDataById } = getState()?.campaignReducer;
    const { filterList, configFilterList, contactFilterData } =
      getState()?.contactFilterReducer;

    try {
      const res = await HttpUtil.makeGET(
        `${BASE_URL1}${GET_CONTACT_FILTER}?campaign_id=${campaignDataById?.id}`,
        "",
        {
          Authorization: getToken(),
        }
      );

      if (res?.data?.length) {
        dispatch(contactFilterListReducer(res?.data));
        const includeConditionsData =
          res?.data?.filter((ele: any) => ele?.exclude === false)?.[0]?.data ||
          [];
        const excludeConditionsData =
          res?.data?.filter((ele: any) => ele?.exclude === true)?.[0]?.data ||
          [];
        const filterIncludeConditionData = filterConditionDatByFilterId(
          includeConditionsData,
          filterList,
          configFilterList
        );
        const filterExcludeConditionData = filterConditionDatByFilterId(
          excludeConditionsData,
          filterList,
          configFilterList
        );

        dispatch(
          contactFilterDataReducer({
            ...contactFilterData,
            includeConditions: filterIncludeConditionData,
            excludeConditions: filterExcludeConditionData,
          })
        );
      } else {
        const firstAction: any = await dispatch(
          addContactFilterAction({
            exclude: false,
            any: false,
            campaign_id: campaignDataById?.id,
          })
        );
        const secondAction: any = await dispatch(
          addContactFilterAction({
            exclude: true,
            any: false,
            campaign_id: campaignDataById?.id,
          })
        );
        const updatedData = [firstAction?.data, secondAction?.data];
        dispatch(contactFilterListReducer(updatedData));
        dispatch(contactFilterDataReducer(initialContactFilterData));
      }
    } catch (error) {
      console.error("Error fetching contact filters:", error);
    }
  };

export const addContactFilterAction = (body: any) => async () => {
  try {
    const res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_CONTACT_FILTER}`,
      body,
      {
        Authorization: getToken(),
      }
    );

    if (res?.success) {
      return res;
    }
  } catch (err) {
    toast.error("Oops! Something went wrong");
    throw err;
  }
};

export const addFilterByFilterSetId =
  (body: any, filterSetId: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await HttpUtil.makePOST(
        `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter`,
        body,
        {
          Authorization: getToken(),
        }
      );
      if (res?.success) {
        dispatch(getContactFilterAction());
        toast.success("Contact Filter Added Succesfully!");
      } else {
        throw new Error("Failed to fetch schedule");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

export const editFilterByFilterSetId =
  (body: any, filterSetId: any, filterId: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await HttpUtil.makePUT(
        `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter/${filterId}`,
        body,
        {
          Authorization: getToken(),
        }
      );
      if (res?.success) {
        dispatch(getContactFilterAction());
        toast.success("Contact Filter Updated Succesfully!");
      } else {
        throw new Error("Failed to fetch schedule");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

export const deleteFilterByFilterSetId =
  (filterSetId: any, filterId: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await HttpUtil.makeDELETE(
        `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter/${filterId}`,
        "",
        {
          Authorization: getToken(),
        }
      );
      if (res?.success) {
        dispatch(getContactFilterAction());
        toast.success("Contact Filter Deleted Succesfully!");
      } else {
        throw new Error("Failed to fetch schedule");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

import { BASE_URL1, GET_CONTACT_FILTER } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const initialContactFilterData = {
  includeCondition: "all",
  includeConditions: [],
  excludeCondition: "all",
  excludeConditions: [],
  overrideOptOut: "",
};

export const filterConditionDatByFilterId = (
  conditionsData: any,
  filters: any,
  configFilters: any
) => {
  const filterConditionData = conditionsData.map((ele: any) => {
    const selectedFilter = Object.entries(filters).find(
      ([, option]: any) => option.field === ele.field
    );

    const selectedConfigFilter = Object.entries(configFilters).find(
      ([key]) => key === ele?.type
    );

    return {
      id: ele?.id,
      field: ele.field,
      filter_type: ele?.type,
      filterTypeOptions: selectedFilter ? selectedFilter[1] : [],
      lookup: ele?.lookup,
      lookupOptions: selectedConfigFilter ? selectedConfigFilter[1] : [],
      cast: ele?.cast,
      castInputType: "",
      lastInputValue: ele?.value,
    };
  });
  return filterConditionData;
};

export const getContactFilterAction = async (
  contactFilterData: any,
  setContactFilterData: any,
  contactFilterList: any,
  setContactFilterList: any,
  campaignDataById: any,
  filters: any,
  configFilters: any
) => {
  try {
    const res = await HttpUtil.makeGET(
      `${BASE_URL1}${GET_CONTACT_FILTER}?campaign_id=${campaignDataById}`,
      "",
      {
        Authorization: getToken(),
      }
    );

    if (res?.data?.length) {
      setContactFilterList(res?.data);
      const includeConditionsData =
        res?.data?.filter((ele: any) => ele?.exclude === false)?.[0]?.data ||
        [];
      const excludeConditionsData =
        res?.data?.filter((ele: any) => ele?.exclude === true)?.[0]?.data || [];

      setContactFilterData({
        ...contactFilterData,
        includeConditions: filterConditionDatByFilterId(
          includeConditionsData,
          filters,
          configFilters
        ),
        excludeConditions: filterConditionDatByFilterId(
          excludeConditionsData,
          filters,
          configFilters
        ),
      });
    } else {
      const newFilters = await Promise.all([
        addContactFilterAction({
          exclude: false,
          any: false,
          campaign_id: campaignDataById,
        }),
        addContactFilterAction({
          exclude: true,
          any: false,
          campaign_id: campaignDataById,
        }),
      ]);

      setContactFilterList([...contactFilterList, ...newFilters]);
    }
  } catch (error) {
    console.error("Error fetching contact filters:", error);
  }
};

export const addContactFilterAction = async (body: any) => {
  try {
    const res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_CONTACT_FILTER}`,
      body,
      {
        Authorization: getToken(),
      }
    );
    return res.data; // Return the added filter data
  } catch (error) {
    console.error("Error adding contact filter:", error);
    throw error; // Rethrow error for better error handling
  }
};

export const addFilterByFilterSetId = async (
  body: any,
  filterSetId: any,
  contactFilterData: any,
  setContactFilterData: any,
  contactFilterList: any,
  setContactFilterList: any,
  campaignDataById: any,
  filters: any,
  configFilters: any
) => {
  try {
    const res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter`,
      body,
      {
        Authorization: getToken(),
      }
    );
    if (res?.success) {
      await getContactFilterAction(
        contactFilterData,
        setContactFilterData,
        contactFilterList,
        setContactFilterList,
        campaignDataById,
        filters,
        configFilters
      );
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const editFilterByFilterSetId = async (
  body: any,
  filterSetId: any,
  filterId: any,
  contactFilterData: any,
  setContactFilterData: any,
  contactFilterList: any,
  setContactFilterList: any,
  campaignDataById: any,
  filters: any,
  configFilters: any
) => {
  try {
    const res = await HttpUtil.makePUT(
      `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter/${filterId}`,
      body,
      {
        Authorization: getToken(),
      }
    );
    if (res?.success) {
      await getContactFilterAction(
        contactFilterData,
        setContactFilterData,
        contactFilterList,
        setContactFilterList,
        campaignDataById,
        filters,
        configFilters
      );
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const deleteFilterByFilterSetId = async (
  filterSetId: any,
  filterId: any,
  contactFilterData: any,
  setContactFilterData: any,
  contactFilterList: any,
  setContactFilterList: any,
  campaignDataById: any,
  filters: any,
  configFilters: any
) => {
  try {
    const res = await HttpUtil.makeDELETE(
      `${BASE_URL1}${GET_CONTACT_FILTER}${filterSetId}/filter/${filterId}`,
      "",
      {
        Authorization: getToken(),
      }
    );
    if (res?.success) {
      await getContactFilterAction(
        contactFilterData,
        setContactFilterData,
        contactFilterList,
        setContactFilterList,
        campaignDataById,
        filters,
        configFilters
      );
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

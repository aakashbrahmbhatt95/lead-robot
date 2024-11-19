import { getContactFilterAction } from "@/redux/action/contactFilter-action";
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
  filterList: any,
  configFilterList: any
) => {
  const filterConditionData = conditionsData.map((ele: any) => {
    const selectedFilter = Object.entries(filterList).find(
      ([, option]: any) => option.field === ele.field
    );
    const selectedConfigFilter = Object.entries(configFilterList).find(
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

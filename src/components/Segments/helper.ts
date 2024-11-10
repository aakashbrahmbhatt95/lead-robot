import {
  BASE_URL1,
  GET_CONFIG_FILTER,
  GET_FILTERS,
} from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const getConfigFilterHandler = async (setConfigFilters: any) => {
  try {
    const res = await HttpUtil.makeGET(`${BASE_URL1}${GET_CONFIG_FILTER}`, "", {
      Authorization: getToken(),
    });
    if (res?.success) {
      setConfigFilters(res?.data);
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const getFiltersHandler = async (setFilters: any) => {
  try {
    const res = await HttpUtil.makeGET(`${BASE_URL1}${GET_FILTERS}`, "", {
      Authorization: getToken(),
    });
    if (res?.success) {
      setFilters(res?.data);
    } else {
      throw new Error("Failed to fetch schedule");
    }
  } catch (error) {
    toast.error("Oops! Something went wrong");
  }
};

export const initialConditionRowState = {
  field: "",
  operator: "",
  operatorArrays: [],
  value: "",
  valueArrays: [],
  inputValue: "",
};

export const handleValueChange = (
  field: any,
  index: any,
  value: any,
  setFieldValue: any,
  arrayFields: any
) => {
  field.onChange({ target: { name: field.name, value } });
  setFieldValue(`${arrayFields}[${index}].inputValue`, "");
};

export const handleOperatorChange = (
  field: any,
  index: any,
  value: any,
  configFilters: any,
  setFieldValue: any,
  arrayFields: any
) => {
  field.onChange({ target: { name: field.name, value } });
  const selectedConfigFilter = Object.entries(configFilters).find(
    ([key]) => key === value
  );

  if (selectedConfigFilter) {
    setFieldValue(
      `${arrayFields}[${index}].valueArrays`,
      selectedConfigFilter[1]
    );
  }

  setFieldValue(`${arrayFields}[${index}].value`, "");
  setFieldValue(`${arrayFields}[${index}].inputValue`, "");
};

export const handleFieldChange = (
  field: any,
  index: any,
  value: any,
  filters: any,
  setFieldValue: any,
  arrayFields: any
) => {
  field.onChange({ target: { name: field.name, value } });
  const selectedFilter = Object.entries(filters).find(
    ([, option]: any) => option.field === value
  );

  if (selectedFilter) {
    setFieldValue(`${arrayFields}[${index}].operatorArrays`, selectedFilter[1]);
  }

  setFieldValue(`${arrayFields}[${index}].valueArrays`, []);
  setFieldValue(`${arrayFields}[${index}].operator`, "");
  setFieldValue(`${arrayFields}[${index}].value`, "");
  setFieldValue(`${arrayFields}[${index}].inputValue`, "");
};

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
      filter: ele?.type,
      filterTypeOptions: selectedFilter ? selectedFilter[1] : [],
      lookup: ele?.lookup,
      lookupOptions: selectedConfigFilter ? selectedConfigFilter[1] : [],
      cast: ele?.cast,
      castInputType: "",
      value: ele?.value,
    };
  });
  return filterConditionData;
};

export function validateData(data: any) {
  for (const item of data) {
    if (!item.field || !item.filter) return false;
    if (!Array.isArray(item.lookupOptions.form_display)) continue;

    for (const key of item.lookupOptions.form_display) {
      if (!item[key] || (Array.isArray(item[key]) && item[key].length === 0)) {
        return false;
      }
    }
  }

  return true;
}

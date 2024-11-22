import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray } from "formik";
import LastInputValue from "./LastValueInput";
import ConditionRow from "./ConditionRow";
import { initialConditionRowState } from "./helper";
import CastField from "./CastField";
import OperatorField from "./OperatorField";
import SelectFilterValue from "./SelectFilterValue";
import SelectLookupValue from "./SelectLookupValue";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteFilterByFilterSetId } from "@/redux/action/contactFilter-action";

const GroupSegmentRow = ({
  values,
  valueName,
  arrayFields,
  heading,
  setFieldValue,
}: any) => {
  const dispatch = useAppDispatch();
  const { filterList, configFilterList, contactFilterList }: any =
    useAppSelector((state: any) => state.contactFilterReducer);
  if (!filterList || !configFilterList) return null;

  return (
    <div className="py-5 px-3 mt-8 border-[1px] border-gray-300">
      <ConditionRow
        heading={heading}
        valueName={valueName}
        arrayFields={arrayFields}
      />
      <FieldArray name={arrayFields}>
        {({ remove, push }) => (
          <>
            {values[arrayFields].map((ele: any, index: any) => (
              <div key={index}>
                {index > 0 && (
                  <p className="pt-3 font-bold">
                    {values[valueName] === "all" ? "AND" : "OR"}
                  </p>
                )}
                <div className="flex items-center py-3 gap-2 border-b-[1px] border-gray-300 pb-3">
                  <CircleMinus
                    onClick={() => {
                      const getContactFilterId = (isExcluded: boolean) => {
                        return contactFilterList?.find(
                          (ele: any) => ele?.exclude === isExcluded
                        )?.id;
                      };

                      const isExcluded =
                        arrayFields === "includeConditions" ? false : true;
                      const filterId = getContactFilterId(isExcluded);

                      if (ele?.id) {
                        dispatch(deleteFilterByFilterSetId(filterId, ele?.id));
                      } else {
                        remove(index);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <SelectFilterValue
                    arrayFields={arrayFields}
                    index={index}
                    setFieldValue={setFieldValue}
                  />
                  {values[arrayFields][index]?.filterTypeOptions?.filters
                    ?.length && (
                    <>
                      <OperatorField
                        values={values}
                        arrayFields={arrayFields}
                        index={index}
                        setFieldValue={setFieldValue}
                        configFilterList={configFilterList}
                      />
                      {values[arrayFields][
                        index
                      ].lookupOptions?.form_display?.map((ele: any) => {
                        if (ele === "lookup") {
                          return (
                            <SelectLookupValue
                              arrayFields={arrayFields}
                              index={index}
                              setFieldValue={setFieldValue}
                              values={values}
                            />
                          );
                        }
                        if (ele === "cast") {
                          return (
                            <CastField
                              values={values}
                              arrayFields={arrayFields}
                              index={index}
                              setFieldValue={setFieldValue}
                            />
                          );
                        }
                        if (ele === "value") {
                          return (
                            <LastInputValue
                              values={values}
                              arrayFields={arrayFields}
                              index={index}
                              setFieldValue={setFieldValue}
                            />
                          );
                        }
                        return null;
                      })}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div
              className="flex items-center mt-5 text-[#6f99a8] gap-2 cursor-pointer"
              onClick={() => push(initialConditionRowState)}
            >
              <CirclePlus color="#6f99a8" />
              Add
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default GroupSegmentRow;
